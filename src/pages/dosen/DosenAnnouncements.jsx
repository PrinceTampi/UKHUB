import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import { AnnouncementIcon } from '../../components/icons';
import useRealtimeCollection from '../../hooks/useRealtimeCollection';
import { getAll, subscribeToAnnouncementChanges } from '../../services/announcementService';

const DosenAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    data: announcements,
    loading,
    error,
  } = useRealtimeCollection(getAll, subscribeToAnnouncementChanges);

  const filters = useMemo(
    () =>
      ANNOUNCEMENT_CATEGORIES.map((cat) => ({
        value: cat,
        label: cat,
      })),
    []
  );

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            onSearch={setSearchTerm}
            onFilterChange={setSelectedCategory}
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
      {loading ? (
        <Card>
          <Card.Body className="text-center py-20 text-gray-500">Memuat pengumuman...</Card.Body>
        </Card>
      ) : error ? (
        <Card>
          <Card.Body className="text-center py-20 text-red-500">{error}</Card.Body>
        </Card>
      ) : filteredAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} className="hover-lift" />
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

export default DosenAnnouncements;

