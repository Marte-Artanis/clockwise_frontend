import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/auth/Login'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Outras rotas serão adicionadas aqui */}
      </Routes>
    </BrowserRouter>
  )
}
