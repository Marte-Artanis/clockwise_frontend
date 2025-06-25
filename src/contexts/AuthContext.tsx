import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextValue {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch {}
    }
  }, [])

  const setAuth = (u: User, t: string) => {
    setUser(u)
    setToken(t)
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
} 