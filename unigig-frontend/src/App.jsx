import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import AppRouter from './routes/AppRouter'
import './styles/globals.css'

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  )
}

export default App