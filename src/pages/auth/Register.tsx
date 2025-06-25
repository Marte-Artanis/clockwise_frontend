import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Logo } from '../../components/ui/Logo'
import { InlineError } from '../../components/ui/ErrorState'
import { styles } from './Register.styles'
import { authService } from '../../services/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface FormData {
  name: string
  email: string
  password: string
}

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { setAuth } = useAuth()

  useEffect(()=>{document.title='Clockwise | Criar conta'},[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await authService.register(
        formData.name,
        formData.email,
        formData.password
      )
      setAuth(result.user, result.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao registrar usuário')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Logo size="lg" />
        </div>

        <Card>
          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Criar conta</h2>
              <p className={styles.formSubtitle}>Preencha seus dados para começar</p>
            </div>

            {error && <InlineError message={error} />}

            <div className={styles.inputGroup}>
              <Input
                label="Nome"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />

              <Input
                label="Senha"
                type="password"
                placeholder="Crie uma senha"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <Button type="submit" className={styles.submitButton} isLoading={isLoading}>
              Registrar
            </Button>
          </form>
        </Card>

        <Link to="/" className={styles.link}>
          Já tem conta? Fazer login
        </Link>
      </div>
    </div>
  )
} 