import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import { AnnouncementIcon, PlusIcon, PencilIcon, TrashIcon } from '../../components/icons';

const AdminAnnouncements = () => {
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
              Manajemen Pengumuman
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Kelola pengumuman dari WR3 dan Kemahasiswaan
            </p>
          </div>
          <Button variant="primary" size="md" className="hidden md:flex">
            <PlusIcon className="w-5 h-5 mr-2" />
            Buat Pengumuman
          </Button>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-24">
        <Card className="border-l-4 border-l-blue-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <AnnouncementIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Pengumuman</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{announcements.length}</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-red-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AnnouncementIcon className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Urgent</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {announcements.filter(a => a.isUrgent).length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-purple-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <AnnouncementIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Event</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {announcements.filter(a => a.category === 'Event').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-green-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <AnnouncementIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Penting</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {announcements.filter(a => a.category === 'Penting').length}
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Results Count */}
      <div className="mb-16">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredAnnouncements.length}</span> dari {announcements.length} pengumuman
        </p>
      </div>

      {/* Announcements Grid */}
      {filteredAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} hover className="hover-lift border-l-4 border-l-blue-500">
              <Card.Body className="p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      {announcement.isUrgent && (
                        <span className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold">
                          URGENT
                        </span>
                      )}
                      <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                        {announcement.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-8 leading-relaxed">
                      {announcement.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{announcement.author}</span>
                    <span>•</span>
                    <span>{new Date(announcement.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
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

export default AdminAnnouncements;

