import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from './components/ui/sonner'
import PublicRoute from '@/components/routes/public-route';
import ProtectedRoute from '@/components/routes/protected-route';

import { LoginPage } from '@/features/auth'
import { ProfilePage } from '@/features/profile'

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
