import { useState } from "react"
import { Button } from '../../../components/ui/button'
import {
  Card, CardAction, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
// Si usás NextAuth, descomentá esto:
// import { signIn } from "next-auth/react"

const EjemploCard = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // === Variante NextAuth (credenciales) ===
      // const res = await signIn("credentials", {
      //   redirect: false,
      //   email,
      //   password,
      // })
      // if (res?.error) throw new Error(res.error)

      // === Variante fetch a tu backend Express ===
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
      if (!resp.ok) throw new Error("Credenciales inválidas")
      // redirigir o actualizar estado
      // window.location.href = "/dashboard"

    } catch (err) {
      setError(err.message || "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    // === NextAuth ===
    // await signIn("google") // te redirige solo

    // === Backend propio ===
    window.location.href = "https://google.com" // endpoint que inicia OAuth
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <CardFooter className="flex-col gap-2 p-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ingresando..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogle}
                disabled={loading}
              >
                Login with Google
              </Button>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default EjemploCard
