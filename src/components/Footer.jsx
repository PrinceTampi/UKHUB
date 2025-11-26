export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tentang UKHUB</h3>
            <p className="text-sm text-gray-500">
              Platform informasi organisasi Universitas Klabat untuk mendukung kegiatan mahasiswa dan dosen pembina.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Kontak</h3>
            <p className="text-sm text-gray-500">info@ukhub.ac.id</p>
            <p className="text-sm text-gray-500">+62 274 515 660</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tautan</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-gray-900 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-900 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
          © {currentYear} UKHUB - Universitas Klabat. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
