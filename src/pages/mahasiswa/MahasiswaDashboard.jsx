import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { OrganizationIcon, BuildingIcon, AnnouncementIcon, ActivityIcon, MailIcon, CalendarIcon, ArrowRightIcon } from '../../components/icons';

const MahasiswaDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Welcome Section */}
      <div className="mb-20">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Dashboard Mahasiswa
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Selamat datang di portal informasi organisasi kemahasiswaan
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
        <Card className="border-l-4 border-l-blue-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <OrganizationIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Organisasi</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">25+</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-purple-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Ruangan Tersedia</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">50+</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-green-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Kegiatan Aktif</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">100+</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-orange-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <AnnouncementIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Pengumuman</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">15+</p>
          </Card.Body>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Menu Utama
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Akses cepat ke informasi organisasi kemahasiswaan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Link to="/mahasiswa/organizations">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg">
                  <OrganizationIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Daftar Organisasi
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Jelajahi semua organisasi kemahasiswaan yang tersedia di universitas
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span>Jelajahi</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/mahasiswa/rooms">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mb-6 shadow-lg">
                  <BuildingIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Daftar Ruangan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Lihat informasi lengkap tentang ruangan yang tersedia untuk organisasi
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                  <span>Lihat</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/mahasiswa/activities">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <CalendarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Kalender Kegiatan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Lihat jadwal dan kalender kegiatan organisasi kemahasiswaan
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  <span>Lihat Kalender</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>

          <Link to="/mahasiswa/announcements">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center mb-6 shadow-lg">
                  <AnnouncementIcon className="w-8 h-8 text-white" />
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

          <Link to="/mahasiswa/contacts">
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                  <MailIcon className="w-8 h-8 text-white" />
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

export default MahasiswaDashboard;
