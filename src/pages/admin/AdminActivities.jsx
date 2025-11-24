import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import ActivityCard from '../../components/ui/ActivityCard';
import { ACTIVITY_STATUS } from '../../utils/constants';
import { ActivityIcon, PlusIcon, PencilIcon, TrashIcon } from '../../components/icons';

const AdminActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const activities = [];

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
              Manajemen Kegiatan
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Kelola kegiatan dan acara organisasi kemahasiswaan
            </p>
          </div>
          <Button variant="primary" size="md" className="hidden md:flex">
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Kegiatan
          </Button>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-24">
        <Card className="border-l-4 border-l-blue-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Kegiatan</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{activities.length}</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-green-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Akan Datang</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {activities.filter(a => a.status === 'upcoming').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Berlangsung</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {activities.filter(a => a.status === 'ongoing').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-gray-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Selesai</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {activities.filter(a => a.status === 'completed').length}
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Results Count */}
      <div className="mb-16">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredActivities.length}</span> dari {activities.length} kegiatan
        </p>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} hover className="hover-lift">
              <Card.Body className="p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-xs font-medium">
                        {activity.type}
                      </span>
                      {activity.registrationRequired && (
                        <span className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg text-xs font-medium">
                          Daftar
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-8 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
                    activity.status === 'upcoming' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : activity.status === 'ongoing'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {activity.status === 'upcoming' ? 'Akan Datang' : activity.status === 'ongoing' ? 'Berlangsung' : 'Selesai'}
                  </span>
                </div>
                <div className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Organisasi:</span> {activity.organization}
                  </div>
                  <div>
                    <span className="font-medium">Lokasi:</span> {activity.location}
                  </div>
                  <div>
                    <span className="font-medium">Waktu:</span> {new Date(`${activity.date} ${activity.time}`).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
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

export default AdminActivities;

