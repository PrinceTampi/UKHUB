import { useState } from 'react'
import { authService } from '../services/authService'
import Header from '../components/Header'
import Footer from '../components/Footer'

const departments = [
  'Teknik Informatika',
  'Teknik Mesin',
  'Teknik Sipil',
  'Manajemen Bisnis',
  'Sistem Informasi',
  'Lainnya'
]

export default function RegisterPage({ onRegisterSuccess, onGoToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    department: '',
    agreeTerms: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi'
    }

    if (!formData.email) {
      newErrors.email = 'Email harus diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Password tidak cocok'
    }

    if (!formData.department) {
      newErrors.department = 'Departemen harus dipilih'
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus setuju dengan syarat dan ketentuan'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        department: formData.department
      })
      if (result.success) {
        onRegisterSuccess(result.user)
      } else {
        setErrorMessage(result.message)
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan saat registrasi')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header showLogout={false} />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Welcome Section */}
          <div className="mb-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-linear-to-br from-green-600 to-green-400 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative w-20 h-20 bg-linear-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-3 tracking-tight">Daftar Akun</h1>
            <p className="text-center text-gray-400 text-lg">Bergabung dengan komunitas UKHUB</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl flex items-start gap-3 backdrop-blur-sm">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-200 text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-3">
                    Nama Lengkap
                  </label>
                  <div className="relative group">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Nama lengkap Anda"
                      className={`w-full px-4 py-3.5 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-gray-500 pr-12 ${
                        focusedField === 'name' 
                          ? 'border-green-500/50 focus:ring-green-500/30 bg-slate-700/80 shadow-lg shadow-green-500/20' 
                          : 'border-slate-600/50 focus:ring-green-500/20'
                      } ${errors.name ? 'border-red-500/50 bg-red-900/10 focus:ring-red-500/20' : ''}`}
                      disabled={isLoading}
                    />
                    <svg className={`absolute right-4 top-4 w-5 h-5 transition-all duration-300 ${focusedField === 'name' ? 'text-green-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.name}</p>}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3">
                    Alamat Email
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="nama@unklab.ac.id"
                      className={`w-full px-4 py-3.5 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-gray-500 pr-12 ${
                        focusedField === 'email' 
                          ? 'border-green-500/50 focus:ring-green-500/30 bg-slate-700/80 shadow-lg shadow-green-500/20' 
                          : 'border-slate-600/50 focus:ring-green-500/20'
                      } ${errors.email ? 'border-red-500/50 bg-red-900/10 focus:ring-red-500/20' : ''}`}
                      disabled={isLoading}
                    />
                    <svg className={`absolute right-4 top-4 w-5 h-5 transition-all duration-300 ${focusedField === 'email' ? 'text-green-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-2 font-medium">{errors.email}</p>}
                </div>
              </div>

              {/* Department Select */}
              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-gray-200 mb-3">
                  Departemen / Jurusan
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('department')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3.5 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white ${
                    focusedField === 'department' 
                      ? 'border-green-500/50 focus:ring-green-500/30 bg-slate-700/80 shadow-lg shadow-green-500/20' 
                      : 'border-slate-600/50 focus:ring-green-500/20'
                  } ${errors.department ? 'border-red-500/50 bg-red-900/10 focus:ring-red-500/20' : ''}`}
                  disabled={isLoading}
                >
                  <option value="" className="bg-slate-700 text-white">Pilih Departemen</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept} className="bg-slate-700 text-white">{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-400 text-xs mt-2 font-medium">{errors.department}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-3">
                    Kata Sandi
                  </label>
                  <div className="relative group">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Minimal 6 karakter"
                      className={`w-full px-4 py-3.5 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-gray-500 pr-12 ${
                        focusedField === 'password' 
                          ? 'border-green-500/50 focus:ring-green-500/30 bg-slate-700/80 shadow-lg shadow-green-500/20' 
                          : 'border-slate-600/50 focus:ring-green-500/20'
                      } ${errors.password ? 'border-red-500/50 bg-red-900/10 focus:ring-red-500/20' : ''}`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-green-400 transition-colors"
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
                  {errors.password && <p className="text-red-400 text-xs mt-2 font-medium">{errors.password}</p>}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-gray-200 mb-3">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    id="passwordConfirm"
                    type={showPassword ? 'text' : 'password'}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('passwordConfirm')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Ulangi kata sandi"
                    className={`w-full px-4 py-3.5 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-gray-500 ${
                      focusedField === 'passwordConfirm' 
                        ? 'border-green-500/50 focus:ring-green-500/30 bg-slate-700/80 shadow-lg shadow-green-500/20' 
                        : 'border-slate-600/50 focus:ring-green-500/20'
                    } ${errors.passwordConfirm ? 'border-red-500/50 bg-red-900/10 focus:ring-red-500/20' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.passwordConfirm && <p className="text-red-400 text-xs mt-2 font-medium">{errors.passwordConfirm}</p>}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-4">
                <input
                  id="terms"
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500/30 cursor-pointer accent-green-500 transition-all"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  Saya setuju dengan{' '}
                  <a href="#" className="text-green-400 hover:text-green-300 transition-colors font-medium">
                    syarat dan ketentuan
                  </a>
                  {' '}dan{' '}
                  <a href="#" className="text-green-400 hover:text-green-300 transition-colors font-medium">
                    kebijakan privasi
                  </a>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-400 text-xs font-medium">{errors.agreeTerms}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 shadow-lg hover:shadow-green-500/50 hover:shadow-2xl"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mendaftar...
                  </>
                ) : (
                  <>
                    <span>Daftar Sekarang</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Sudah punya akun?{' '}
              <button
                onClick={onGoToLogin}
                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}