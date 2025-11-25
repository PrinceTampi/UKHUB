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

const quickActions = [
  {
    to: '/mahasiswa/organizations',
    title: 'Daftar Organisasi',
    description: 'Jelajahi UKM, himpunan, dan komunitas yang aktif.',
    icon: <OrganizationIcon className="w-6 h-6" />,
    accent: 'bg-blue-50 text-blue-600',
  },
  {
    to: '/mahasiswa/rooms',
    title: 'Peminjaman Ruangan',
    description: 'Ketahui ketersediaan ruangan sebelum mengajukan permohonan.',
    icon: <BuildingIcon className="w-6 h-6" />,
    accent: 'bg-indigo-50 text-indigo-600',
  },
  {
    to: '/mahasiswa/activities',
    title: 'Kalender Kegiatan',
    description: 'Ikuti workshop, seminar, dan acara kampus terbaru.',
    icon: <CalendarIcon className="w-6 h-6" />,
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    to: '/mahasiswa/announcements',
    title: 'Pengumuman Resmi',
    description: 'Informasi penting langsung dari WR3 dan Kemahasiswaan.',
    icon: <AnnouncementIcon className="w-6 h-6" />,
    accent: 'bg-orange-50 text-orange-600',
  },
  {
    to: '/mahasiswa/contacts',
    title: 'Direktori Kontak',
    description: 'Hubungi pembina atau admin organisasi dengan mudah.',
    icon: <MailIcon className="w-6 h-6" />,
    accent: 'bg-sky-50 text-sky-600',
  },
];

const MahasiswaDashboard = () => {
  const { stats, loading } = useDashboardStats();

  const metricCards = [
    {
      label: 'Organisasi',
      value: stats.organizations,
      icon: <OrganizationIcon className="w-6 h-6 text-blue-600" />,
      accent: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Ruangan',
      value: stats.rooms,
      icon: <BuildingIcon className="w-6 h-6 text-indigo-600" />,
      accent: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Kegiatan',
      value: stats.activities,
      icon: <ActivityIcon className="w-6 h-6 text-emerald-600" />,
      accent: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Pengumuman',
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
            <p className="text-sm uppercase tracking-[0.4em] text-blue-500 font-semibold mb-2">Mahasiswa</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Portal informasi organisasi kampus
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Semua data organisasi, ruangan, pengumuman, dan kontak tersinkron otomatis dari panel admin sehingga kamu
            selalu mendapatkan informasi terbaru.
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Menu utama</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Akses cepat ke semua kebutuhan organisasi kemahasiswaan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {quickActions.map((action) => (
            <Link to={action.to} key={action.to}>
              <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift bg-white dark:bg-gray-900 h-full">
                <Card.Body className="p-8">
                  <div className={`w-12 h-12 rounded-xl ${action.accent} flex items-center justify-center mb-6`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{action.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{action.description}</p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Buka</span>
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MahasiswaDashboard;
