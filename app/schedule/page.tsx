"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface Employee {
  id: string
  name: string
  role: string
}

interface Shift {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  employee: Employee
}

interface Schedule {
  id: string
  weekStart: string
  weekEnd: string
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
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")

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
    fetchSchedule()
  }, [currentWeekStart])

  const fetchSchedule = async () => {
    setLoading(true)
    setError("")
    try {
      const weekStartStr = formatDate(currentWeekStart)

      const res = await fetch(`${API_URL}/schedules/${weekStartStr}`, {
        headers: getAuthHeaders(),
      })

      if (res.status === 401) {
        router.push("/signup")
        return
      }

      if (res.status === 404) {
        setSchedule(null)
        setShifts([])
        return
      }

      if (!res.ok) throw new Error("Erro ao carregar escala")

      const data = await res.json()

      setSchedule(data.schedule)
      setShifts(data.shifts || [])
    } catch {
      setError("Erro ao carregar escala")
    } finally {
      setLoading(false)
    }
  }

  const handleAutoGenerate = async () => {
    if (!schedule) return

    setGenerating(true)
    setError("")

    try {
      const res = await fetch(`${API_URL}/schedules/${schedule.id}/auto-generate`, {
        method: "POST",
        headers: getAuthHeaders(),
      })

      if (!res.ok) throw new Error("Erro ao gerar escala")

      await fetchSchedule()
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

  const weekEndDate = addDays(currentWeekStart, 6)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">
            EscalaPronta
          </a>
          <nav className="flex items-center gap-4">
            <a href="/employees" className="text-gray-600 hover:text-gray-900">
              Funcionários
            </a>
            <a href="/schedule" className="text-blue-600 font-medium">
              Escala
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button onClick={goToPreviousWeek} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Escala Semanal</h1>
              <p className="text-gray-500">
                {formatDisplayDate(currentWeekStart)} - {formatDisplayDate(weekEndDate)}
              </p>
            </div>

            <button onClick={goToNextWeek} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {schedule && (
            <Button
              onClick={handleAutoGenerate}
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
          )}
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

        {!schedule ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Nenhuma escala encontrada para esta semana.</p>
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
                  <div className="p-3 min-h-[200px]">
                    {dayShifts.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">Sem turnos</p>
                    ) : (
                      <div className="space-y-2">
                        {dayShifts.map((shift) => (
                          <div key={shift.id} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                            <p className="font-medium text-gray-900 text-sm">{shift.employee.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {shift.startTime} - {shift.endTime}
                            </p>
                          </div>
                        ))}
                      </div>
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
