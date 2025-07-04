import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Logo } from '../../components/ui/Logo'
import { InlineError } from '../../components/ui/ErrorState'
import { styles } from './Login.styles'
import { authService } from '../../services/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

type FormData = {
  email: string
  password: string
}

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { setAuth } = useAuth()

  useEffect(()=>{document.title='Clockwise | Login'},[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await authService.login(formData.email, formData.password)
      setAuth(result.user, result.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Email ou senha inválidos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div className={styles.container} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Logo size="lg" />
        </div>

        <Card>
          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                Bem-vindo de volta!
              </h2>
              <p className={styles.formSubtitle}>
                Faça login para continuar
              </p>
            </div>

            {error && <InlineError message={error} />}

            <div className={styles.inputGroup}>
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
                placeholder="Sua senha"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <Button
              type="submit"
              className={styles.submitButton}
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>
        </Card>

        <Link to="/register" className={styles.link}>
          Não tem conta? Criar conta
        </Link>
      </div>
    </motion.div>
  )
} 