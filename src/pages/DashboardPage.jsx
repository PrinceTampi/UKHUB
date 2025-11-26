import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DashboardPage({ user, onLogout }) {

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header user={user} onLogout={onLogout} showLogout={true} />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">
          {/* Empty State */}
          <div className="mb-8">
            <div className="inline-block p-6 bg-slate-800/50 rounded-full mb-6">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang, {user?.name}</h1>
            <p className="text-gray-400 text-lg">Dashboard akan segera diperbarui dengan fitur pengumuman organisasi</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
          >
            Keluar
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
