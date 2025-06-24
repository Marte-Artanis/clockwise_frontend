import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { styles } from './Login.styles'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Login:', formData)
    } catch (err) {
      setError('Email ou senha inválidos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoIcon}>⏰</span>
            <h1>Clockwise</h1>
          </div>
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

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

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

            <Button
              type="submit"
              className={styles.submitButton}
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
} 