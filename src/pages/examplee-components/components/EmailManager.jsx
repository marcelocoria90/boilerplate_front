// "use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { X, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function EmailManager() {
  const [email, setEmail] = useState("")
  const [emails, setEmails] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error("Error al verificar el email")
      const data = await response.json()
      return data.exists
    } catch (error) {
      console.error("Error checking email:", error)
      // demo fallback
      return Math.random() > 0.5
    }
  }

  const handleAddEmail = async () => {
    if (!email.trim()) {
      toast.error("Por favor ingresa un email")
      return
    }

    if (!validateEmail(email)) {
      toast.error("Email inválido", { description: "Ingresá un email con formato válido" })
      return
    }

    if (emails.length >= 10) {
      toast.warning("Límite alcanzado", { description: "Máximo 10 emails" })
      return
    }

    if (emails.some((e) => e.email === email)) {
      toast.warning("Email duplicado", { description: "Este email ya está en la lista" })
      return
    }

    setIsLoading(true)
    try {
      const exists = await checkEmailExists(email)
      const newEmail = { email, exists, id: Date.now().toString() }

      setEmails((prev) => [...prev, newEmail])
      setEmail("")

      if (exists) {
        toast.success("Email encontrado", { description: "Ya tiene registro en el sistema" })
      } else {
        toast("Email nuevo", { description: "No tiene registro previo" })
      }
    } catch (error) {
      toast.error("No se pudo verificar el email", { description: "Intenta nuevamente" })
    } finally {
      setIsLoading(false)
    }
  }

  const removeEmail = (id) => {
    setEmails((prev) => prev.filter((e) => e.id !== id))
    toast("Email eliminado", { description: "Se removió de la lista" })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddEmail()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Agregar Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleAddEmail}
              disabled={isLoading || emails.length >= 10}
              className={`min-w-[100px] 
                          bg-blue-600 text-white font-medium 
                          rounded-md 
                          transition-all duration-200 ease-in-out
                          hover:bg-blue-700 hover:shadow-md
                          active:scale-95 active:bg-blue-800
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Verificando..." : "Agregar"}
            </Button>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{emails.length}/10 emails agregados</div>
        </CardContent>
      </Card>

      {emails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Emails Agregados</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="divide-y divide-border rounded-lg ring-1 ring-border overflow-hidden">
              {emails.map((emailItem) => (
                <li
                  key={emailItem.id}
                  className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {emailItem.exists ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-sky-500 shrink-0" />
                    )}
                    <span className="font-medium truncate">
                      {emailItem.email}
                    </span>
                    <Badge
                      variant={emailItem.exists ? "default" : "secondary"}
                      className="ml-1 rounded-full px-2.5 py-0.5 text-xs"
                    >
                      {emailItem.exists ? "Registrado" : "Nuevo"}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEmail(emailItem.id)}
                    aria-label="Eliminar email"
                    className="h-4 w-4 p-0 text-muted-foreground
                              hover:text-foreground hover:bg-transparent 
                              focus-visible:ring-2 focus-visible:ring-ring
                              flex items-center justify-center"
                  >
                    <X className="h-2 w-2 text-white" />
                  </Button>

                </li>
              ))}
            </ul>
          </CardContent>

        </Card>
      )}
    </div>
  )
}
