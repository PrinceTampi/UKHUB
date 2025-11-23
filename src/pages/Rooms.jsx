import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import RoomCard from '../components/ui/RoomCard';
import { BuildingIcon, PlusIcon } from '../components/icons';

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');

  // Mock data - in real app, this would come from API
  const rooms = [
    {
      id: 1,
      name: 'GK3-204',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 2',
      facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi', 'Sound System'],
      accessHours: '08:00 - 17:00',
      capacity: 30,
      organization: 'BEM',
      status: 'available',
    },
    {
      id: 2,
      name: 'GK3-205',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 2',
      facilities: ['AC', 'Proyektor', 'WiFi'],
      accessHours: '08:00 - 17:00',
      capacity: 20,
      organization: 'DPM',
      status: 'available',
    },
    {
      id: 3,
      name: 'GK3-301',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 3',
      facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi', 'Sound System', 'Panggung'],
      accessHours: '08:00 - 20:00',
      capacity: 100,
      organization: 'UKM Seni',
      status: 'occupied',
    },
    {
      id: 4,
      name: 'GK3-102',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 1',
      facilities: ['AC', 'WiFi'],
      accessHours: '08:00 - 17:00',
      capacity: 15,
      organization: 'HIMTI',
      status: 'available',
    },
    {
      id: 5,
      name: 'GK3-103',
      building: 'Gedung Kemahasiswaan',
      location: 'Lantai 1',
      facilities: ['AC', 'Proyektor', 'WiFi'],
      accessHours: '08:00 - 17:00',
      capacity: 25,
      organization: 'HIMSI',
      status: 'maintenance',
    },
    {
      id: 6,
      name: 'Aula Utama',
      building: 'Gedung A',
      location: 'Lantai 1',
      facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi', 'Sound System', 'Panggung', 'Layar Besar'],
      accessHours: '08:00 - 22:00',
      capacity: 200,
      organization: 'Semua Organisasi',
      status: 'available',
    },
  ];

  const buildings = [...new Set(rooms.map(room => room.building))];
  const buildingFilters = buildings.map(building => ({
    value: building,
    label: building,
  }));

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = !selectedBuilding || room.building === selectedBuilding;
    return matchesSearch && matchesBuilding;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setSelectedBuilding(value);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Daftar Ruangan
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Informasi lengkap tentang ruangan yang tersedia untuk organisasi kemahasiswaan
            </p>
          </div>
          <Button variant="primary" size="md" className="hidden md:flex">
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Ruangan
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari ruangan (nama, gedung, lokasi)..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={buildingFilters}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredRooms.length}</span> dari {rooms.length} ruangan
        </p>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              showOrganization={true}
              className="hover-lift"
            />
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body className="text-center py-20">
            <BuildingIcon className="w-24 h-24 mx-auto text-gray-400 mb-8" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tidak ada ruangan ditemukan
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Coba ubah kata kunci atau filter pencarian Anda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedBuilding('');
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

export default Rooms;

