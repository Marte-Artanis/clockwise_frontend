import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PrivateRoute } from './components/PrivateRoute'

const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })))
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard').then(m => ({ default: m.Dashboard })))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex justify-center items-center h-screen text-text/70">Carregando...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
