import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { Dashboard } from './pages/dashboard/Dashboard'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Outras rotas serão adicionadas aqui */}
      </Routes>
    </BrowserRouter>
  )
}
