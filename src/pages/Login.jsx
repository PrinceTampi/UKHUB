import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { UsersIcon, OrganizationIcon, CalendarIcon } from '../components/icons';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('mahasiswa');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock users untuk demo
  const mockUsers = {
    admin: {
      email: 'admin@universitas.ac.id',
      password: 'admin123',
      name: 'Admin Kemahasiswaan',
      role: 'admin',
    },
    mahasiswa: {
      email: 'mahasiswa@universitas.ac.id',
      password: 'mahasiswa123',
      name: 'John Doe',
      role: 'mahasiswa',
      nim: '1234567890',
    },
    dosen: {
      email: 'dosen@universitas.ac.id',
      password: 'dosen123',
      name: 'Dr. Ahmad Hidayat, M.Pd.',
      role: 'dosen',
      nidn: '0123456789',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[selectedRole];
      
      if (formData.email === user.email && formData.password === user.password) {
        login({
          ...user,
          email: formData.email,
        });
        
        // Redirect to intended page or home
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError('Email atau password salah');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData({
      email: mockUsers[role].email,
      password: mockUsers[role].password,
    });
    setError('');
  };

  const roles = [
    {
      value: 'admin',
      label: 'Admin',
      description: 'Admin Kemahasiswaan',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      Icon: UsersIcon,
    },
    {
      value: 'mahasiswa',
      label: 'Mahasiswa',
      description: 'Mahasiswa Aktif',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      Icon: OrganizationIcon,
    },
    {
      value: 'dosen',
      label: 'Dosen',
      description: 'Dosen Pembina',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      Icon: UsersIcon,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl w-full mx-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden md:block text-white space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                UKHUB
              </h1>
              <p className="text-xl text-blue-100 font-light">
                Portal Informasi Organisasi Kemahasiswaan
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <OrganizationIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Organisasi Terpusat</p>
                  <p className="text-sm text-blue-200">Akses semua informasi organisasi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Kalender Kegiatan</p>
                  <p className="text-sm text-blue-200">Lihat jadwal kegiatan organisasi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Akses Terkontrol</p>
                  <p className="text-sm text-blue-200">Keamanan data terjamin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <Card className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl">
              <Card.Header className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg">
                  <OrganizationIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Selamat Datang
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Masuk untuk mengakses portal organisasi
                </p>
              </Card.Header>

              <Card.Body className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Pilih Role
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((role) => {
                      const Icon = role.Icon;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => handleRoleChange(role.value)}
                          className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            selectedRole === role.value
                              ? `border-${role.color}-500 bg-gradient-to-br ${role.gradient} text-white shadow-lg shadow-${role.color}-500/50`
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className={`mb-3 transition-transform ${selectedRole === role.value ? 'scale-110' : ''}`}>
                            <Icon className={`w-8 h-8 mx-auto ${selectedRole === role.value ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                          </div>
                          <div className={`text-sm font-bold ${selectedRole === role.value ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {role.label}
                          </div>
                          <div className={`text-xs mt-1 ${selectedRole === role.value ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                            {role.description}
                          </div>
                          {selectedRole === role.value && (
                            <div className="absolute top-2 right-2">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all"
                        placeholder="Masukkan email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all"
                        placeholder="Masukkan password"
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl animate-shake">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Demo Credentials Info */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                    <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Demo Credentials:
                    </p>
                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-400">
                      <p><span className="font-semibold">Email:</span> {mockUsers[selectedRole].email}</p>
                      <p><span className="font-semibold">Password:</span> {mockUsers[selectedRole].password}</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Masuk
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </Button>
                </form>

                {/* Footer Info */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 UKHUB - Universitas Hub. All rights reserved.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
