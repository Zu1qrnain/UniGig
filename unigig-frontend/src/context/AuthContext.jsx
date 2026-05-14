import { createContext, useState, useRef, useEffect } from 'react'
import { loginAPI, registerAPI } from '../api/auth.api'
import { saveToken, saveUser, clearAuth, getToken, getUser } from '../utils/token.utils'
import { getDashboardPath } from '../utils/role.utils'

const getTokenExpiry = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]))
    return exp * 1000
  } catch {
    return null
  }
}

const isExpired = (token) => {
  const expiry = getTokenExpiry(token)
  return expiry !== null && expiry < Date.now()
}

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = getToken()
    if (stored && isExpired(stored)) { clearAuth(); return null }
    return getUser()
  })
  const [token, setToken] = useState(() => {
    const stored = getToken()
    if (stored && isExpired(stored)) return null
    return stored
  })
  const [loading, setLoading] = useState(false)
  const logoutTimer = useRef(null)

  useEffect(() => {
    clearTimeout(logoutTimer.current)
    if (!token) return
    const expiry = getTokenExpiry(token)
    if (!expiry) return
    const delay = expiry - Date.now()
    if (delay <= 0) {
      clearAuth(); setUser(null); setToken(null)
      return
    }
    logoutTimer.current = setTimeout(() => {
      clearAuth(); setUser(null); setToken(null)
    }, delay)
    return () => clearTimeout(logoutTimer.current)
  }, [token])

  const login = async (data, navigate, allowedRoles) => {
    setLoading(true)
    try {
      const res = await loginAPI(data)
      if (res.success) {
        const role = res.data.user.role
        if (allowedRoles && !allowedRoles.includes(role)) {
          return {
            success: false,
            message: role === 'admin'
              ? 'Admins must use the Admin Login portal.'
              : 'Access denied. This portal is for admins only.'
          }
        }
        saveToken(res.data.token)
        saveUser(res.data.user)
        setToken(res.data.token)
        setUser(res.data.user)
        navigate(getDashboardPath(role))
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
      if (res.success) navigate('/login')
      return res
    } finally {
      setLoading(false)
    }
  }

  const logout = (navigate) => {
    clearTimeout(logoutTimer.current)
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
