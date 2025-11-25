import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import {
  OrganizationIcon,
  BuildingIcon,
  AnnouncementIcon,
  ActivityIcon,
  MailIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '../../components/icons';
import useDashboardStats from '../../hooks/useDashboardStats';

const DosenDashboard = () => {
  const { stats, loading } = useDashboardStats();

  const metricCards = [
    {
      label: 'Organisasi Aktif',
      value: stats.organizations,
      icon: <OrganizationIcon className="w-6 h-6 text-blue-600" />,
      accent: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Ruangan Tersedia',
      value: stats.rooms,
      icon: <BuildingIcon className="w-6 h-6 text-indigo-600" />,
      accent: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Kegiatan Berjalan',
      value: stats.activities,
      icon: <ActivityIcon className="w-6 h-6 text-emerald-600" />,
      accent: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Pengumuman Baru',
      value: stats.announcements,
      icon: <AnnouncementIcon className="w-6 h-6 text-orange-600" />,
      accent: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn space-y-16">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-10 md:p-14">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-indigo-500 font-semibold mb-2">Dosen Pembina</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Pantau Organisasi Binaan Anda
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Semua data ruangan, kegiatan, dan pengumuman tersinkron otomatis dari panel admin sehingga Anda selalu
            mendapatkan informasi terbaru.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card) => (
          <Card key={card.label} className="shadow-sm border border-gray-100 dark:border-gray-800">
            <Card.Body className="p-6 flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl ${card.accent} flex items-center justify-center`}>{card.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{loading ? '...' : card.value}</p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Menu Utama
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Akses cepat ke informasi organisasi yang Anda bina
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Link to="/dosen/organizations">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift bg-white dark:bg-gray-900 h-full">
              <Card.Body className="p-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <OrganizationIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Organisasi yang Dibina
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Lihat dan kelola organisasi kemahasiswaan yang Anda bina
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span>Lihat</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/dosen/rooms">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift bg-white dark:bg-gray-900 h-full">
              <Card.Body className="p-8">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                  <BuildingIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Daftar Ruangan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Lihat informasi lengkap tentang ruangan yang tersedia
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                  <span>Lihat</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/dosen/activities">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift bg-white dark:bg-gray-900 h-full">
              <Card.Body className="p-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Kegiatan Organisasi
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Pantau kegiatan dan acara organisasi yang Anda bina
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  <span>Lihat Kegiatan</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/dosen/announcements">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift bg-white dark:bg-gray-900 h-full">
              <Card.Body className="p-8">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                  <AnnouncementIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Pengumuman
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Informasi penting dari WR3 dan Kemahasiswaan
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium">
                  <span>Lihat Pengumuman</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/dosen/contacts">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift bg-white dark:bg-gray-900 h-full">
              <Card.Body className="p-8">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                  <MailIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Kontak
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Hubungi WR3 dan Kemahasiswaan untuk informasi lebih lanjut
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Lihat Kontak</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DosenDashboard;
