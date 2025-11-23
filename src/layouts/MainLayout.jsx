import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout = ({ children, onGlobalSearch }) => {
  const { isAdmin, isMahasiswa, isDosen } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show sidebar for admin, mahasiswa, or dosen
  const showSidebar = isAdmin || isMahasiswa || isDosen;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onGlobalSearch={onGlobalSearch} />
      
      <div className="flex flex-1">
        {/* Sidebar - For Admin, Mahasiswa, and Dosen */}
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Sidebar Toggle */}
          {showSidebar && (
            <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-12">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
