import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import RoomCard from '../../components/ui/RoomCard';
import { BuildingIcon } from '../../components/icons';
import useRealtimeCollection from '../../hooks/useRealtimeCollection';
import { getAll, subscribeToRoomChanges } from '../../services/roomService';

const DosenRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const {
    data: rooms,
    loading,
    error,
  } = useRealtimeCollection(getAll, subscribeToRoomChanges);

  const buildingFilters = useMemo(() => {
    const buildings = [...new Set(rooms.map((room) => room.building).filter(Boolean))];
    return buildings.map((building) => ({
      value: building,
      label: building,
    }));
  }, [rooms]);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = !selectedBuilding || room.building === selectedBuilding;
    return matchesSearch && matchesBuilding;
  });

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
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari ruangan (nama, gedung, lokasi)..."
            onSearch={setSearchTerm}
            onFilterChange={setSelectedBuilding}
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
      {loading ? (
        <Card>
          <Card.Body className="py-16 text-center text-gray-500">Memuat daftar ruangan...</Card.Body>
        </Card>
      ) : error ? (
        <Card>
          <Card.Body className="py-16 text-center text-red-500">{error}</Card.Body>
        </Card>
      ) : filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} showOrganization className="hover-lift" />
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

export default DosenRooms;

