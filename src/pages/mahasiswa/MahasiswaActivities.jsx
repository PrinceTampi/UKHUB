import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import ActivityCard from '../../components/ui/ActivityCard';
import { ACTIVITY_STATUS } from '../../utils/constants';
import { ActivityIcon } from '../../components/icons';

const MahasiswaActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Mock data - in real app, this would come from API
  const activities = [
    {
      id: 1,
      title: 'Workshop Leadership & Management',
      date: '2024-03-15',
      time: '09:00',
      status: 'upcoming',
      location: 'Aula Utama, Gedung A',
      organization: 'BEM',
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
      organization: 'Kemahasiswaan',
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
      organization: 'BEM',
      type: 'recruitment',
      description: 'Open recruitment untuk anggota baru periode 2024',
      registrationRequired: true,
    },
    {
      id: 4,
      title: 'Rapat Koordinasi Organisasi',
      date: '2024-03-12',
      time: '13:00',
      status: 'ongoing',
      location: 'GK3-204',
      organization: 'Semua Organisasi',
      type: 'meeting',
      description: 'Rapat koordinasi antar organisasi kemahasiswaan',
      registrationRequired: false,
    },
    {
      id: 5,
      title: 'Festival Seni Mahasiswa',
      date: '2024-03-05',
      time: '18:00',
      status: 'completed',
      location: 'Aula Utama',
      organization: 'UKM Seni',
      type: 'event',
      description: 'Festival seni mahasiswa dengan berbagai pertunjukan',
      registrationRequired: false,
    },
    {
      id: 6,
      title: 'Pelatihan Manajemen Keuangan',
      date: '2024-03-28',
      time: '09:00',
      status: 'upcoming',
      location: 'GK3-301',
      organization: 'Kemahasiswaan',
      type: 'workshop',
      description: 'Pelatihan manajemen keuangan untuk pengurus organisasi',
      registrationRequired: true,
    },
  ];

  const statusFilters = Object.values(ACTIVITY_STATUS).map(status => ({
    value: status,
    label: status === 'upcoming' ? 'Akan Datang' : 
           status === 'ongoing' ? 'Berlangsung' :
           status === 'completed' ? 'Selesai' : 'Dibatalkan',
  }));

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || activity.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Kegiatan Organisasi
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Daftar kegiatan dan acara yang dilaksanakan oleh organisasi kemahasiswaan
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari kegiatan (judul, deskripsi, organisasi, lokasi)..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={statusFilters}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredActivities.length}</span> dari {activities.length} kegiatan
        </p>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              showOrganization={true}
              className="hover-lift"
            />
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body className="text-center py-20">
            <ActivityIcon className="w-24 h-24 mx-auto text-gray-400 mb-8" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tidak ada kegiatan ditemukan
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Coba ubah kata kunci atau filter pencarian Anda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
              }}
            >
              Reset Pencarian
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MahasiswaActivities;

