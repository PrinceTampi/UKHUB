import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { OrganizationIcon, BuildingIcon, AnnouncementIcon, ActivityIcon, MailIcon, DashboardIcon } from '../components/icons';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin, isMahasiswa, isDosen } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
  }, [location, isOpen, onClose]);

  // Don't show sidebar if user is not admin, mahasiswa, or dosen
  if (!isAdmin && !isMahasiswa && !isDosen) return null;

  // Menu items based on role
  let menuItems = [];
  let panelTitle = '';

  if (isAdmin) {
    panelTitle = 'Admin Panel';
    menuItems = [
      { name: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
      { name: 'Organizations', path: '/admin/organizations', icon: <OrganizationIcon /> },
      { name: 'Rooms', path: '/admin/rooms', icon: <BuildingIcon /> },
      { name: 'Announcements', path: '/admin/announcements', icon: <AnnouncementIcon /> },
      { name: 'Activities', path: '/admin/activities', icon: <ActivityIcon /> },
      { name: 'Contacts', path: '/admin/contacts', icon: <MailIcon /> },
    ];
  } else if (isDosen) {
    panelTitle = 'Dosen Panel';
    menuItems = [
      { name: 'Dashboard', path: '/dosen/dashboard', icon: <DashboardIcon /> },
      { name: 'Organizations', path: '/dosen/organizations', icon: <OrganizationIcon /> },
      { name: 'Rooms', path: '/dosen/rooms', icon: <BuildingIcon /> },
      { name: 'Announcements', path: '/dosen/announcements', icon: <AnnouncementIcon /> },
      { name: 'Activities', path: '/dosen/activities', icon: <ActivityIcon /> },
      { name: 'Contacts', path: '/dosen/contacts', icon: <MailIcon /> },
    ];
  } else if (isMahasiswa) {
    panelTitle = 'Mahasiswa Panel';
    menuItems = [
      { name: 'Dashboard', path: '/mahasiswa/dashboard', icon: <DashboardIcon /> },
      { name: 'Organizations', path: '/mahasiswa/organizations', icon: <OrganizationIcon /> },
      { name: 'Rooms', path: '/mahasiswa/rooms', icon: <BuildingIcon /> },
      { name: 'Announcements', path: '/mahasiswa/announcements', icon: <AnnouncementIcon /> },
      { name: 'Activities', path: '/mahasiswa/activities', icon: <ActivityIcon /> },
      { name: 'Contacts', path: '/mahasiswa/contacts', icon: <MailIcon /> },
    ];
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {panelTitle}
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== '/admin/dashboard' && 
                               item.path !== '/dosen/dashboard' && 
                               item.path !== '/mahasiswa/dashboard' &&
                               location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
