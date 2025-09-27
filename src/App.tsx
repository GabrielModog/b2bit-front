import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from './components/ui/sonner'
import ProtectedRoute from '@/components/routes/protected-route';

import { AuthProvider, LoginPage } from '@/features/auth'
import { ProfilePage } from '@/features/profile'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            <Route
              path="/login"
              element={
               <ProtectedRoute privated={false}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute privated>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
