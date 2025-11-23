import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import { AnnouncementIcon } from '../../components/icons';

const MahasiswaAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - in real app, this would come from API
  const announcements = [
    {
      id: 1,
      title: 'Pengumuman Penting: Open Recruitment BEM 2024',
      category: 'Penting',
      date: '2024-03-10',
      author: 'WR3',
      isUrgent: true,
      excerpt: 'Dibuka pendaftaran untuk anggota baru Badan Eksekutif Mahasiswa periode 2024. Pendaftaran dibuka mulai tanggal 15 Maret 2024.',
    },
    {
      id: 2,
      title: 'Seminar Kewirausahaan Mahasiswa',
      category: 'Event',
      date: '2024-03-12',
      author: 'Kemahasiswaan',
      isUrgent: false,
      excerpt: 'Seminar tentang kewirausahaan untuk mahasiswa dengan pembicara dari industri. Acara akan dilaksanakan pada tanggal 25 Maret 2024.',
    },
    {
      id: 3,
      title: 'Workshop Leadership & Management',
      category: 'Event',
      date: '2024-03-15',
      author: 'Kemahasiswaan',
      isUrgent: false,
      excerpt: 'Workshop untuk meningkatkan kemampuan kepemimpinan dan manajemen organisasi. Terbuka untuk semua organisasi kemahasiswaan.',
    },
    {
      id: 4,
      title: 'Informasi Perpanjangan Masa Aktif Organisasi',
      category: 'Informasi',
      date: '2024-03-18',
      author: 'WR3',
      isUrgent: false,
      excerpt: 'Informasi penting mengenai perpanjangan masa aktif organisasi kemahasiswaan untuk periode 2024-2025.',
    },
    {
      id: 5,
      title: 'Pendaftaran Program Beasiswa Kemahasiswaan',
      category: 'Penting',
      date: '2024-03-20',
      author: 'WR3',
      isUrgent: true,
      excerpt: 'Dibuka pendaftaran program beasiswa untuk mahasiswa aktif yang terlibat dalam organisasi kemahasiswaan.',
    },
    {
      id: 6,
      title: 'Pelatihan Manajemen Keuangan Organisasi',
      category: 'Event',
      date: '2024-03-22',
      author: 'Kemahasiswaan',
      isUrgent: false,
      excerpt: 'Pelatihan manajemen keuangan untuk pengurus organisasi kemahasiswaan. Wajib diikuti oleh bendahara organisasi.',
    },
  ];

  const filters = ANNOUNCEMENT_CATEGORIES.map(cat => ({
    value: cat,
    label: cat,
  }));

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Pengumuman
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Informasi penting dari WR3 dan Kemahasiswaan
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari pengumuman (judul, isi, penulis)..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredAnnouncements.length}</span> dari {announcements.length} pengumuman
        </p>
      </div>

      {/* Announcements Grid */}
      {filteredAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              className="hover-lift"
            />
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body className="text-center py-20">
            <AnnouncementIcon className="w-24 h-24 mx-auto text-gray-400 mb-8" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tidak ada pengumuman ditemukan
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Coba ubah kata kunci atau filter pencarian Anda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
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

export default MahasiswaAnnouncements;

