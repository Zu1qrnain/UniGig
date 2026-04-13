import { createContext, useState } from 'react'
import { loginAPI, registerAPI } from '../api/auth.api'
import { saveToken, saveUser, clearAuth, getToken, getUser } from '../utils/token.utils'
import { getDashboardPath } from '../utils/role.utils'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUser())
  const [token, setToken] = useState(() => getToken())
  const [loading, setLoading] = useState(false)

  const login = async (data, navigate) => {
    setLoading(true)
    try {
      const res = await loginAPI(data)
      if (res.success) {
        saveToken(res.data.token)
        saveUser(res.data.user)
        setToken(res.data.token)
        setUser(res.data.user)
        navigate(getDashboardPath(res.data.user.role))
      }
      return res
    } finally {
      setLoading(false)
    }
  }

  const register = async (data, navigate) => {
    setLoading(true)
    try {
      const res = await registerAPI(data)
      if (res.success) {
        navigate('/login')
      }
      return res
    } finally {
      setLoading(false)
    }
  }

  const logout = (navigate) => {
    clearAuth()
    setUser(null)
    setToken(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}