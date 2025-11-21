import { useState } from 'react'
import { authService } from '../services/authService'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LoginPage({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = 'Email harus diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!password) {
      newErrors.password = 'Password harus diisi'
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await authService.login(email, password)
      if (result.success) {
        onLoginSuccess(result.user)
      } else {
        setErrorMessage(result.message)
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan saat login')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (email, password) => {
    setEmail(email)
    setPassword(password)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header showLogout={false} />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white text-center mb-2">UKHUB</h1>
            <p className="text-center text-gray-400">Platform Pengumuman Organisasi</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-200 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  placeholder="nama@unklab.ac.id"
                  className={`w-full px-4 py-2.5 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500 ${
                    errors.email ? 'border-red-500/50' : 'border-slate-600/50'
                  }`}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: '' })
                    }}
                    placeholder="••••••••"
                    className={`w-full px-4 py-2.5 bg-slate-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500 pr-12 ${
                      errors.password ? 'border-red-500/50' : 'border-slate-600/50'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-400"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM2 10a8 8 0 0111.955 6.913A1 1 0 1110.87 15.9A6 6 0 002 10z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>
          </div>

          {/* Demo Section */}
          <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
            <p className="text-xs text-gray-400 font-medium mb-3">AKUN DEMO:</p>
            <div className="space-y-2">
              {[
                { role: 'Mahasiswa', email: 'mahasiswa@unklab.ac.id', pass: 'mahasiswa123' },
                { role: 'Dosen', email: 'dosen@unklab.ac.id', pass: 'dosen123' },
                { role: 'Admin', email: 'admin@unklab.ac.id', pass: 'admin123' }
              ].map((account, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setEmail(account.email)
                    setPassword(account.pass)
                    setErrors({})
                  }}
                  disabled={isLoading}
                  className="w-full text-left p-2 bg-slate-700/50 hover:bg-slate-700/70 rounded text-xs text-gray-300 hover:text-white transition-colors disabled:opacity-50"
                >
                  <div className="font-medium">{account.role}</div>
                  <div className="text-gray-500">{account.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}