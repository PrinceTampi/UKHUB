import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import RoomCard from '../components/ui/RoomCard';
import { formatDate } from '../utils/helpers';
import { OrganizationIcon, CalendarIcon, BuildingIcon, UsersIcon, MailIcon, PhoneIcon, LocationIcon, ClockIcon } from '../components/icons';

const OrganizationPublic = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API based on id
  const organization = {
    id: id || 1,
    name: 'Badan Eksekutif Mahasiswa',
    abbreviation: 'BEM',
    category: 'Ormawa',
    logo: null,
    description: 'BEM adalah organisasi mahasiswa yang bertugas untuk melaksanakan program kerja dan kebijakan yang telah ditetapkan oleh DPM. Organisasi ini berperan sebagai eksekutor dari berbagai program kemahasiswaan di tingkat universitas.',
    vision: 'Menjadi organisasi mahasiswa yang profesional, inovatif, dan berintegritas dalam mewujudkan kemahasiswaan yang berkualitas dan berkarakter.',
    mission: [
      'Meningkatkan kualitas kepemimpinan mahasiswa melalui berbagai program pengembangan',
      'Mengembangkan potensi mahasiswa di berbagai bidang akademik dan non-akademik',
      'Membangun jaringan dan kolaborasi dengan organisasi lain di dalam dan luar kampus',
      'Mewujudkan program kerja yang bermanfaat bagi mahasiswa dan masyarakat',
    ],
    pembina: 'Dr. Ahmad Hidayat, M.Pd.',
    status: 'active',
    establishedYear: 2010,
    contact: {
      email: 'bem@universitas.ac.id',
      phone: '+62 123 456 7890',
      address: 'Gedung Kemahasiswaan, Lantai 2',
    },
    socialMedia: {
      instagram: '@bem_universitas',
      facebook: 'BEM Universitas',
      twitter: '@bem_univ',
      website: 'https://bem.universitas.ac.id',
      youtube: 'BEM Universitas Official',
    },
    structure: {
      ketua: 'John Doe',
      wakilKetua: 'Jane Smith',
      sekretaris: 'Bob Johnson',
      bendahara: 'Alice Williams',
    },
  };

  const activities = [
    {
      id: 1,
      title: 'Workshop Leadership & Management',
      date: '2024-03-15',
      time: '09:00',
      status: 'upcoming',
      location: 'Aula Utama, Gedung A',
      organization: organization.name,
      type: 'workshop',
      description: 'Workshop untuk meningkatkan kemampuan kepemimpinan dan manajemen organisasi',
      registrationRequired: true,
    },
    {
      id: 2,
      title: 'Seminar Kewirausahaan Mahasiswa',
      date: '2024-03-20',
      time: '14:00',
      status: 'upcoming',
      location: 'Ruang Seminar, Gedung B',
      organization: organization.name,
      type: 'seminar',
      description: 'Seminar tentang kewirausahaan untuk mahasiswa dengan pembicara dari industri',
      registrationRequired: true,
    },
    {
      id: 3,
      title: 'Open Recruitment Anggota Baru',
      date: '2024-03-25',
      time: '10:00',
      status: 'upcoming',
      location: 'Gedung Kemahasiswaan',
      organization: organization.name,
      type: 'recruitment',
      description: 'Open recruitment untuk anggota baru periode 2024',
      registrationRequired: true,
    },
  ];

  const roomSchedules = [
    {
      id: 1,
      name: 'GK3-204',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 2',
      date: '2024-03-15',
      time: '09:00 - 12:00',
      capacity: 30,
      facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi'],
      accessHours: '08:00 - 17:00',
      status: 'available',
      organization: organization.name,
    },
    {
      id: 2,
      name: 'GK3-205',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 2',
      date: '2024-03-20',
      time: '14:00 - 17:00',
      capacity: 20,
      facilities: ['AC', 'Proyektor', 'WiFi'],
      accessHours: '08:00 - 17:00',
      status: 'available',
      organization: organization.name,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', Icon: OrganizationIcon },
    { id: 'activities', label: 'Kegiatan', Icon: CalendarIcon },
    { id: 'rooms', label: 'Ruangan', Icon: BuildingIcon },
    { id: 'structure', label: 'Struktur', Icon: UsersIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Organization Header */}
      <div className="mb-20">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-12 md:p-20 lg:p-24">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-shrink-0">
                <div className="w-36 h-36 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-700">
                  {organization.logo ? (
                    <img
                      src={organization.logo}
                      alt={organization.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <OrganizationIcon className="w-20 h-20 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </div>
              <div className="flex-1 text-white">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {organization.name}
                    </h1>
                    {organization.abbreviation && (
                      <p className="text-xl md:text-2xl text-blue-100 mb-4">
                        ({organization.abbreviation})
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                        {organization.category}
                      </span>
                      <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
                        {organization.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </span>
                      {organization.establishedYear && (
                        <span className="text-blue-100 text-sm">
                          Didirikan: {organization.establishedYear}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-blue-50 text-lg md:text-xl leading-relaxed">
                  {organization.description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 border-b-2 border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.Icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-16">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <Card>
                <Card.Header className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    Visi
                  </h2>
                </Card.Header>
                <Card.Body className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {organization.vision}
                  </p>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Misi
                  </h2>
                </Card.Header>
                <Card.Body className="p-6">
                  <ul className="space-y-4">
                    {organization.mission.map((item, index) => (
                      <li key={index} className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-lg mt-0.5">{index + 1}.</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <Card.Header className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  Informasi Kontak
                </h2>
              </Card.Header>
              <Card.Body className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-5">Kontak Organisasi</h3>
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <MailIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${organization.contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
                          {organization.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <PhoneIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        <a href={`tel:${organization.contact.phone.replace(/\s/g, '')}`} className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
                          {organization.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <LocationIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400 text-lg">{organization.contact.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-5">Pembina</h3>
                    <div className="flex items-center gap-4">
                      <UsersIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-400 text-lg">{organization.pembina}</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Social Media */}
            <Card>
              <Card.Header className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  Media Sosial
                </h2>
              </Card.Header>
              <Card.Body className="p-6">
                <div className="flex flex-wrap gap-4">
                  {organization.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${organization.socialMedia.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                  )}
                  {organization.socialMedia.website && (
                    <a
                      href={organization.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'activities' && (
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Kegiatan Organisasi
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Daftar kegiatan yang akan dilaksanakan oleh {organization.name}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} showOrganization={false} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Ruangan Organisasi
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Informasi ruangan yang digunakan oleh {organization.name}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {roomSchedules.map((room) => (
                <RoomCard key={room.id} room={room} showOrganization={false} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Struktur Kepengurusan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Struktur kepengurusan {organization.name} periode 2024
              </p>
            </div>
            <Card>
              <Card.Body className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-l-4 border-blue-600 dark:border-blue-400">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">Ketua Umum</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{organization.structure.ketua}</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-4 border-gray-400 dark:border-gray-600">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">Wakil Ketua</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{organization.structure.wakilKetua}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-4 border-gray-400 dark:border-gray-600">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">Sekretaris</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{organization.structure.sekretaris}</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-4 border-gray-400 dark:border-gray-600">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">Bendahara</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{organization.structure.bendahara}</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationPublic;
