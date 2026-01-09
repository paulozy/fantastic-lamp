"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, UserX } from "lucide-react"
import Link from "next/link"

interface Employee {
  id: string
  name: string
  role: string
  phone: string
  active: boolean
  workStartTime: string
  workEndTime: string
  workDays: number[]
  companyId: string
  createdAt: string
}

interface EmployeeFormData {
  name: string
  role: string
  phone: string
  workStartTime: string
  workEndTime: string
  workDays: number[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

const DAYS_OF_WEEK = [
  { value: 0, label: "Dom" },
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
]

const initialFormData: EmployeeFormData = {
  name: "",
  role: "",
  phone: "",
  workStartTime: "08:00",
  workEndTime: "17:00",
  workDays: [1, 2, 3, 4, 5],
}

export default function EmployeesPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData)

  useEffect(() => {
    const token = localStorage.getItem("escalaProntaToken")

    if (!token) {
      router.replace("/signup")
      return
    }

    fetchEmployees()
  }, [])


  const getAuthHeaders = () => {
    const token = localStorage.getItem("escalaProntaToken")
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    }
  }

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/employees`, {
        headers: getAuthHeaders(),
      })
      if (response.status === 401) {
        localStorage.removeItem("escalaProntaToken")
        router.push("/signup")
        return
      }
      if (!response.ok) throw new Error("Falha ao carregar funcionários")
      const data = await response.json()
      setEmployees(data.employees || [])
    } catch (err) {
      setError("Erro ao carregar funcionários")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditingEmployee(null)
    setFormData(initialFormData)
    setError("")
    setDialogOpen(true)
  }

  const handleOpenEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      role: employee.role,
      phone: employee.phone,
      workStartTime: employee.workStartTime,
      workEndTime: employee.workEndTime,
      workDays: employee.workDays,
    })
    setError("")
    setDialogOpen(true)
  }

  const handleDayToggle = (day: number) => {
    setFormData((prev) => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day].sort((a, b) => a - b),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      if (editingEmployee) {
        // Update employee
        const response = await fetch(`${API_URL}/employees/${editingEmployee.id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Falha ao atualizar funcionário")
        }
      } else {
        // Create employee
        const response = await fetch(`${API_URL}/employees`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Falha ao criar funcionário")
        }
      }

      setDialogOpen(false)
      fetchEmployees()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar")
    } finally {
      setSaving(false)
    }
  }

  const handleDeactivate = async (employeeId: string) => {
    if (!confirm("Tem certeza que deseja desativar este funcionário?")) return

    try {
      const response = await fetch(`${API_URL}/employees/${employeeId}/deactivate`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      })
      if (!response.ok) throw new Error("Falha ao desativar funcionário")
      fetchEmployees()
    } catch (err) {
      setError("Erro ao desativar funcionário")
    }
  }

  const formatWorkDays = (days: number[]) => {
    return days
      .map((d) => DAYS_OF_WEEK.find((day) => day.value === d)?.label)
      .filter(Boolean)
      .join(", ")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            EscalaPronta
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/schedule" className="text-muted-foreground hover:text-foreground transition-colors">
              Escalas
            </Link>
            <Link href="/employees" className="text-foreground font-medium">
              Funcionários
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Funcionários</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo funcionário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingEmployee ? "Editar funcionário" : "Novo funcionário"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    placeholder="Ex: Garçom, Cozinheiro"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="11999999999"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workStartTime">Início</Label>
                    <Input
                      id="workStartTime"
                      type="time"
                      value={formData.workStartTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          workStartTime: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workEndTime">Fim</Label>
                    <Input
                      id="workEndTime"
                      type="time"
                      value={formData.workEndTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          workEndTime: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dias de trabalho</Label>
                  <div className="flex flex-wrap gap-3">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`day-${day.value}`}
                          checked={formData.workDays.includes(day.value)}
                          onCheckedChange={() => handleDayToggle(day.value)}
                        />
                        <Label htmlFor={`day-${day.value}`} className="text-sm cursor-pointer">
                          {day.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                    {saving ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && !dialogOpen && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {employees.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">Nenhum funcionário cadastrado</p>
            <Button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar primeiro funcionário
            </Button>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Dias</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatWorkDays(employee.workDays)}</TableCell>
                    <TableCell>
                      {employee.workStartTime} - {employee.workEndTime}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          employee.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {employee.active ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(employee)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        {employee.active && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeactivate(employee.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  )
}
