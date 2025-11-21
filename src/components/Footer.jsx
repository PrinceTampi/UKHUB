export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700/30 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-cyan-400 rounded-lg blur-md opacity-60"></div>
                <div className="relative w-9 h-9 bg-linear-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">UKHUB</h3>
                <p className="text-xs text-gray-500">Universitas Klabat</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform organisasi akademik untuk mendukung kegiatan pembelajaran dan pengembangan diri mahasiswa.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Menu Bantuan</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-xs transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-xs transition-colors duration-200">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-xs transition-colors duration-200">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-xs transition-colors duration-200">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-400">info@ukhub.ac.id</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs text-gray-400">+62 274 515 660</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-gray-400">Semarang, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-700/30 pt-6">
          <p className="text-center text-xs text-gray-500">
            © {currentYear} UKHUB - Universitas Klabat. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
