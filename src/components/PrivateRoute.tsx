import { Navigate } from 'react-router-dom'
import type { JSX } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: JSX.Element
}

export function PrivateRoute({ children }: Props) {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/" replace />
  }
  return children
} 