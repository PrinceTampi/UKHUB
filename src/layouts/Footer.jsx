import { CONTACT_INFO } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Wakil Rektor III</h3>
            <p className="text-sm text-gray-500 mb-1">{CONTACT_INFO.WR3.address}</p>
            <p className="text-sm text-gray-500 mb-1">{CONTACT_INFO.WR3.email}</p>
            <p className="text-sm text-gray-500">{CONTACT_INFO.WR3.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Kemahasiswaan</h3>
            <p className="text-sm text-gray-500 mb-1">{CONTACT_INFO.KEMAHASISWAAN.address}</p>
            <p className="text-sm text-gray-500 mb-1">{CONTACT_INFO.KEMAHASISWAAN.email}</p>
            <p className="text-sm text-gray-500">{CONTACT_INFO.KEMAHASISWAAN.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tautan Cepat</h3>
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
};

export default Footer;

