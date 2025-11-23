import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import OrganizationCard from '../components/ui/OrganizationCard';
import { BuildingIcon, CalendarIcon, PhoneIcon, OrganizationIcon, ActivityIcon, AnnouncementIcon, UsersIcon } from '../components/icons';

const Home = () => {
  // Mock data
  const featuredOrganizations = [
    { 
      id: 1, 
      name: 'Badan Eksekutif Mahasiswa', 
      abbreviation: 'BEM',
      category: 'Ormawa', 
      logo: null,
      description: 'Organisasi mahasiswa tingkat universitas yang bertugas melaksanakan program kerja kemahasiswaan',
      status: 'active',
      pembina: 'Dr. Ahmad Hidayat, M.Pd.',
      contact: { email: 'bem@universitas.ac.id' }
    },
    { 
      id: 2, 
      name: 'Dewan Perwakilan Mahasiswa', 
      abbreviation: 'DPM',
      category: 'Ormawa', 
      logo: null,
      description: 'Lembaga legislatif mahasiswa yang mengawasi dan mengevaluasi program kerja BEM',
      status: 'active',
      pembina: 'Prof. Dr. Siti Nurhaliza',
      contact: { email: 'dpm@universitas.ac.id' }
    },
    { 
      id: 3, 
      name: 'Himpunan Mahasiswa Teknik Informatika', 
      abbreviation: 'HIMTI',
      category: 'Himpunan', 
      logo: null,
      description: 'Organisasi mahasiswa jurusan Teknik Informatika yang mengembangkan potensi akademik dan non-akademik',
      status: 'active',
      pembina: 'Dr. Budi Santoso, M.Kom.',
      contact: { email: 'himti@universitas.ac.id' }
    },
  ];

  const recentAnnouncements = [
    { 
      id: 1, 
      title: 'Pengumuman Penting: Open Recruitment BEM 2024', 
      category: 'Penting', 
      date: '2024-03-10',
      author: 'WR3',
      isUrgent: true,
      excerpt: 'Dibuka pendaftaran untuk anggota baru Badan Eksekutif Mahasiswa periode 2024'
    },
    { 
      id: 2, 
      title: 'Seminar Kewirausahaan Mahasiswa', 
      category: 'Event', 
      date: '2024-03-12',
      author: 'Kemahasiswaan',
      isUrgent: false,
      excerpt: 'Seminar tentang kewirausahaan untuk mahasiswa dengan pembicara dari industri'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 p-12 md:p-16 lg:p-20 mb-16 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Portal Informasi Organisasi Kemahasiswaan
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              Akses informasi lengkap tentang organisasi, ruangan, pengumuman, dan kegiatan kemahasiswaan di satu tempat
            </p>
            <div className="max-w-2xl">
              <SearchBar
                placeholder="Cari organisasi, ruangan, pengumuman, kegiatan..."
                className="w-full"
              />
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        <Card className="border-l-4 border-l-blue-500 hover-lift">
          <Card.Body className="p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <OrganizationIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Organisasi</div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-purple-500 hover-lift">
          <Card.Body className="p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <BuildingIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ruangan</div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-green-500 hover-lift">
          <Card.Body className="p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <ActivityIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Kegiatan</div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-orange-500 hover-lift">
          <Card.Body className="p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Anggota</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Featured Organizations */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Organisasi Terpopuler
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Daftar organisasi kemahasiswaan yang aktif di universitas
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Lihat Semua
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredOrganizations.map((org) => (
            <OrganizationCard 
              key={org.id} 
              organization={org}
              className="hover-lift"
            />
          ))}
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Pengumuman Terbaru
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Informasi penting dari WR3 dan Kemahasiswaan
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Lihat Semua
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {recentAnnouncements.map((announcement) => (
            <Card 
              key={announcement.id} 
              hover 
              className="hover-lift border-l-4 border-l-blue-500"
            >
              <Card.Body className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <AnnouncementIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      {announcement.isUrgent && (
                        <span className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold">
                          URGENT
                        </span>
                      )}
                      <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                        {announcement.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-5">
                      {announcement.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{announcement.author}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(announcement.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10">
          <Card.Body className="p-10">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg">
              <OrganizationIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Daftar Organisasi
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Jelajahi semua organisasi kemahasiswaan yang tersedia di universitas
            </p>
            <Button variant="primary" size="sm" className="w-full">
              Jelajahi Organisasi
            </Button>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10">
          <Card.Body className="p-10">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mb-6 shadow-lg">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Kalender Kegiatan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Lihat jadwal dan kalender kegiatan organisasi kemahasiswaan
            </p>
            <Button variant="primary" size="sm" className="w-full">
              Lihat Kalender
            </Button>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10">
          <Card.Body className="p-10">
            <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6 shadow-lg">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Kontak
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Hubungi WR3 dan Kemahasiswaan untuk informasi lebih lanjut
            </p>
            <Link to="/contact">
              <Button variant="primary" size="sm" className="w-full">
                Lihat Kontak
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
