"use client"

import { PaywallModal } from "@/components/paywall-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { trackEvent } from "@/lib/ga-events"
import { ChevronLeft, ChevronRight, Loader2, Plus, Trash2, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface Employee {
  id: string
  name: string
  role: string
  workStartTime: string
  workEndTime: string
  workDays: number[]
  active: boolean
}

interface Shift {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  scheduleId: string
  employeeId: string
  employee?: Employee
}

interface Schedule {
  id: string
  weekStart: string
  companyId: string
  shifts?: Shift[]
}

const DAYS_OF_WEEK = [
  { key: 1, label: "Segunda" },
  { key: 2, label: "Terça" },
  { key: 3, label: "Quarta" },
  { key: 4, label: "Quinta" },
  { key: 5, label: "Sexta" },
  { key: 6, label: "Sábado" },
  { key: 0, label: "Domingo" },
]

function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export default function SchedulePage() {
  const router = useRouter()
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()))
  const [schedule, setSchedule] = useState<{ id: string; weekStart: string; companyId?: string } | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [paywallType, setPaywallType] = useState<"PLAN_LIMIT_REACHED" | "FEATURE_NOT_AVAILABLE">(
    "FEATURE_NOT_AVAILABLE",
  )

  const [addShiftOpen, setAddShiftOpen] = useState(false)
  const [addShiftDay, setAddShiftDay] = useState<number>(1)
  const [addShiftEmployeeId, setAddShiftEmployeeId] = useState("")
  const [addShiftStartTime, setAddShiftStartTime] = useState("")
  const [addShiftEndTime, setAddShiftEndTime] = useState("")
  const [addShiftLoading, setAddShiftLoading] = useState(false)
  const [addShiftError, setAddShiftError] = useState("")

  const [deleteShiftOpen, setDeleteShiftOpen] = useState(false)
  const [shiftToDelete, setShiftToDelete] = useState<Shift | null>(null)
  const [deleteShiftLoading, setDeleteShiftLoading] = useState(false)

  const [clearAllOpen, setClearAllOpen] = useState(false)
  const [clearAllLoading, setClearAllLoading] = useState(false)

  const startOfCurrentWeek = getMonday(new Date())
  const isPastWeek = currentWeekStart < startOfCurrentWeek

  const getAuthHeaders = () => {
    const token = localStorage.getItem("escalaProntaToken")
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("escalaProntaToken")
    if (!token) {
      router.push("/signup")
      return
    }
    fetchData()
  }, [currentWeekStart])

  const fetchData = async () => {
    setLoading(true)
    setError("")
    try {
      const empRes = await fetch(`${API_URL}/employees`, {
        headers: getAuthHeaders(),
      })
      if (empRes.status === 401) {
        router.push("/signup")
        return
      }
      const empData = await empRes.json()
      setEmployees(empData.employees || [])

      const weekStartStr = formatDate(currentWeekStart)
      const schedRes = await fetch(`${API_URL}/schedules/${weekStartStr}`, {
        headers: getAuthHeaders(),
      })

      if (schedRes.ok) {
        const schedData = await schedRes.json()
        setSchedule(schedData.schedule || schedData)
        setShifts(schedData.shifts || [])
      } else if (schedRes.status === 404) {
        setSchedule(null)
        setShifts([])
      } else if (schedRes.status === 401) {
        router.push("/signup")
        return
      }
    } catch {
      setError("Erro ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  const handleAutoGenerate = async () => {
    setGenerating(true)
    setError("")
    try {
      const companyId = localStorage.getItem("companyId")
      const weekStartStr = formatDate(currentWeekStart)

      let currentSchedule = schedule
      if (!currentSchedule) {
        const createRes = await fetch(`${API_URL}/schedules`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            weekStart: weekStartStr,
            companyId,
          }),
        })
        if (!createRes.ok) {
          throw new Error("Erro ao criar escala")
        }
        currentSchedule = await createRes.json()
        setSchedule(currentSchedule)
      }

      const activeEmployees = employees.filter((e) => e.active)
      const employeeIds = activeEmployees.map((e) => e.id)

      const genRes = await fetch(`${API_URL}/schedules/${currentSchedule!.id}/auto-generate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ employeeIds }),
      })

      if (!genRes.ok) {
        const data = await genRes.json()
        if (data.error === "FEATURE_NOT_AVAILABLE" || data.error === "PLAN_LIMIT_EXCEEDED") {
          trackEvent("pro_feature_blocked", {
            feature: "auto_generate",
            reason: data.error === "PLAN_LIMIT_EXCEEDED" ? "plan_limit_exceeded" : "feature_not_available",
          })
          setPaywallType(data.error)
          setPaywallOpen(true)
          setGenerating(false)
          return
        }
        throw new Error("Erro ao gerar escala")
      }

      trackEvent("first_schedule_generated")
      await fetchData()
    } catch {
      setError("Erro ao gerar escala automaticamente")
    } finally {
      setGenerating(false)
    }
  }

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7))
  }

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  const getShiftsForDay = (dayOfWeek: number): Shift[] => {
    return shifts.filter((s) => s.dayOfWeek === dayOfWeek)
  }

  const getEmployeeName = (employeeId: string): string => {
    const employee = employees.find((e) => e.id === employeeId)
    return employee?.name || "Funcionário"
  }

  const weekEndDate = addDays(currentWeekStart, 6)

  const openAddShiftModal = (dayOfWeek: number) => {
    setAddShiftDay(dayOfWeek)
    setAddShiftEmployeeId("")
    setAddShiftStartTime("")
    setAddShiftEndTime("")
    setAddShiftError("")
    setAddShiftOpen(true)
  }

  const openDeleteShiftDialog = (shift: Shift) => {
    setShiftToDelete(shift)
    setDeleteShiftOpen(true)
  }

  const handleDeleteShift = async () => {
    if (!shiftToDelete) return

    setDeleteShiftLoading(true)

    try {
      const res = await fetch(`${API_URL}/shifts/${shiftToDelete.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}))
        if (data.error === "FEATURE_NOT_AVAILABLE" || data.error === "PLAN_LIMIT_EXCEEDED") {
          setPaywallType(data.error)
          setPaywallOpen(true)
          setDeleteShiftOpen(false)
          setShiftToDelete(null)
          return
        }
        throw new Error(data.message || "Erro ao remover turno")
      }

      setShifts((prev) => prev.filter((s) => s.id !== shiftToDelete.id))
      trackEvent("shift_deleted")
      setDeleteShiftOpen(false)
      setShiftToDelete(null)
    } catch {
      setError("Erro ao remover turno. Tente novamente.")
    } finally {
      setDeleteShiftLoading(false)
    }
  }

  const handleAddShift = async () => {
    setAddShiftError("")

    if (!addShiftEmployeeId) {
      setAddShiftError("Selecione um funcionário")
      return
    }
    if (!addShiftStartTime || !addShiftEndTime) {
      setAddShiftError("Preencha os horários de início e fim")
      return
    }
    if (addShiftEndTime <= addShiftStartTime) {
      setAddShiftError("Horário de fim deve ser maior que o de início")
      return
    }

    setAddShiftLoading(true)

    try {
      const companyId = localStorage.getItem("companyId")
      const weekStartStr = formatDate(currentWeekStart)

      let currentSchedule = schedule
      if (!currentSchedule) {
        const createRes = await fetch(`${API_URL}/schedules`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            weekStart: weekStartStr,
            companyId,
          }),
        })
        if (!createRes.ok) {
          throw new Error("Erro ao criar escala")
        }
        currentSchedule = await createRes.json()
        setSchedule(currentSchedule)
      }

      const shiftPayload = {
        scheduleId: currentSchedule!.id,
        employeeId: addShiftEmployeeId,
        dayOfWeek: addShiftDay,
        startTime: addShiftStartTime,
        endTime: addShiftEndTime,
      }

      const shiftRes = await fetch(`${API_URL}/shifts`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(shiftPayload),
      })

      if (!shiftRes.ok) {
        const data = await shiftRes.json()
        if (data.error === "FEATURE_NOT_AVAILABLE" || data.error === "PLAN_LIMIT_EXCEEDED") {
          trackEvent("pro_feature_blocked", {
            feature: "add_shift",
            reason: data.error === "PLAN_LIMIT_EXCEEDED" ? "plan_limit_exceeded" : "feature_not_available",
          })
          setPaywallType(data.error)
          setPaywallOpen(true)
          setAddShiftOpen(false)
          return
        }
        throw new Error(data.message || "Erro ao criar turno")
      }

      const newShift = await shiftRes.json()

      trackEvent("shift_created")
      setShifts((prev) => [...prev, newShift])
      setAddShiftOpen(false)
    } catch (err) {
      setAddShiftError(err instanceof Error ? err.message : "Erro ao criar turno")
    } finally {
      setAddShiftLoading(false)
    }
  }

  const handleClearAllShifts = async () => {
    if (!schedule) return

    setClearAllLoading(true)

    try {
      const res = await fetch(`${API_URL}/shifts/schedule/${schedule.id}/all`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.error === "FEATURE_NOT_AVAILABLE" || data.error === "PLAN_LIMIT_EXCEEDED") {
          setPaywallType(data.error)
          setPaywallOpen(true)
          setClearAllOpen(false)
          return
        }
        throw new Error(data.message || "Erro ao limpar escala")
      }

      setShifts([])
      setClearAllOpen(false)
    } catch {
      setError("Erro ao limpar escala. Tente novamente.")
    } finally {
      setClearAllLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} type={paywallType} />

      <AlertDialog open={clearAllOpen} onOpenChange={setClearAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar escala da semana?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso vai remover todos os turnos desta semana. Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={clearAllLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAllShifts}
              disabled={clearAllLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {clearAllLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Limpando...
                </>
              ) : (
                "Limpar escala"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteShiftOpen} onOpenChange={setDeleteShiftOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover turno?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este turno? Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteShiftLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteShift}
              disabled={deleteShiftLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteShiftLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Removendo...
                </>
              ) : (
                "Remover"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={addShiftOpen} onOpenChange={setAddShiftOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar turno</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Funcionário</Label>
              <Select value={addShiftEmployeeId} onValueChange={setAddShiftEmployeeId}>
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Selecione um funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {employees
                    .filter((e) => e.active)
                    .map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Horário início</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={addShiftStartTime}
                  onChange={(e) => setAddShiftStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Horário fim</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={addShiftEndTime}
                  onChange={(e) => setAddShiftEndTime(e.target.value)}
                />
              </div>
            </div>

            {addShiftError && <p className="text-sm text-red-600">{addShiftError}</p>}

            <Button
              onClick={handleAddShift}
              disabled={addShiftLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {addShiftLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar turno"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            EscalaPronta
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/employees" className="text-gray-600 hover:text-gray-900">
              Funcionários
            </Link>
            <Link href="/schedule" className="text-blue-600 font-medium">
              Escala
            </Link>
            <Link href="/subscription" className="text-gray-600 hover:text-gray-900">
              Assinatura
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousWeek}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Escala Semanal</h1>
              <p className="text-gray-500">
                {formatDisplayDate(currentWeekStart)} - {formatDisplayDate(weekEndDate)}
              </p>
            </div>
            <button
              onClick={goToNextWeek}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setClearAllOpen(true)}
              disabled={isPastWeek || shifts.length === 0}
              variant="outline"
              className={`border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 ${isPastWeek ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar escala
            </Button>
            <Button
              onClick={handleAutoGenerate}
              disabled={generating || employees.length === 0 || isPastWeek}
              className={`bg-blue-600 hover:bg-blue-700 text-white ${isPastWeek ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Gerar escala automática
                </>
              )}
            </Button>
          </div>
        </div>

        {isPastWeek && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
            Escalas de semanas passadas não podem ser editadas.
          </div>
        )}

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

        {employees.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Nenhum funcionário cadastrado.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href="/employees">Cadastrar funcionários</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {DAYS_OF_WEEK.map((day, index) => {
              const dayDate = addDays(currentWeekStart, index)
              const dayShifts = getShiftsForDay(day.key)

              return (
                <div key={day.key} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{day.label}</p>
                    <p className="text-sm text-gray-500">{formatDisplayDate(dayDate)}</p>
                  </div>
                  <div className="p-3 min-h-[200px] flex flex-col">
                    {dayShifts.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">Sem turnos</p>
                    ) : (
                      <div className="space-y-2">
                        {dayShifts.map((shift) => (
                          <div
                            key={shift.id}
                            className="bg-blue-50 border border-blue-100 rounded-lg p-3 relative group"
                          >
                            {!isPastWeek && (
                              <button
                                onClick={() => openDeleteShiftDialog(shift)}
                                className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remover turno"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                            <p className={`font-medium text-gray-900 text-sm ${!isPastWeek ? "pr-6" : ""}`}>
                              {getEmployeeName(shift.employee!.id)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {shift.startTime} - {shift.endTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {!isPastWeek && (
                      <button
                        onClick={() => openAddShiftModal(day.key)}
                        className="mt-auto pt-3 flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar turno
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
