import { CONTACT_INFO } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WR3 Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Wakil Rektor III</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{CONTACT_INFO.WR3.address}</p>
              <p>Email: {CONTACT_INFO.WR3.email}</p>
              <p>Telp: {CONTACT_INFO.WR3.phone}</p>
            </div>
          </div>

          {/* Kemahasiswaan Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kemahasiswaan</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{CONTACT_INFO.KEMAHASISWAAN.address}</p>
              <p>Email: {CONTACT_INFO.KEMAHASISWAAN.email}</p>
              <p>Telp: {CONTACT_INFO.KEMAHASISWAAN.phone}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} UKHUB - Universitas Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

