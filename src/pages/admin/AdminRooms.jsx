import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import RoomCard from '../../components/ui/RoomCard';
import { BuildingIcon, PlusIcon, PencilIcon, TrashIcon, XIcon } from '../../components/icons';
import { getAll, add, update, remove } from '../../services/roomService';
import { useAuth } from '../../context/AuthContext';

const AdminRooms = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    building: '',
    location: '',
    facilities: '',
    accessHours: '08:00 - 17:00',
    capacity: '',
    organization: '',
    status: 'available',
  });
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await getAll();
      setRooms(data);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

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

  const openCreateForm = () => {
    setFormMode('create');
    setCurrentRoom(null);
    setFormData({
      name: '',
      building: '',
      location: '',
      facilities: '',
      accessHours: '08:00 - 17:00',
      capacity: '',
      organization: '',
      status: 'available',
    });
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (room) => {
    setFormMode('edit');
    setCurrentRoom(room);
    setFormData({
      name: room.name || '',
      building: room.building || '',
      location: room.location || '',
      facilities: Array.isArray(room.facilities) ? room.facilities.join(', ') : '',
      accessHours: room.accessHours || '08:00 - 17:00',
      capacity: room.capacity || '',
      organization: room.organization || '',
      status: room.status || 'available',
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormMode('create');
    setCurrentRoom(null);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setFormError(null);

    if (!formData.name || !formData.building) {
      setFormError('Name dan Building wajib diisi.');
      setProcessing(false);
      return;
    }

    const payload = {
      name: formData.name,
      building: formData.building,
      location: formData.location,
      facilities: formData.facilities ? formData.facilities.split(',').map(f => f.trim()).filter(Boolean) : [],
      accessHours: formData.accessHours,
      capacity: parseInt(formData.capacity) || 0,
      organization: formData.organization,
      status: formData.status,
    };

    try {
      if (formMode === 'create') {
        const created = await add(payload, user?.role);
        setRooms(prev => [...prev, created]);
      } else if (formMode === 'edit' && currentRoom) {
        const updated = await update(currentRoom.id, payload, user?.role);
        setRooms(prev => prev.map(r => r.id === currentRoom.id ? updated : r));
      }
      closeForm();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan ruangan');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Hapus ruangan ini?')) return;
    try {
      await remove(roomId, user?.role);
      setRooms(prev => prev.filter(r => r.id !== roomId));
    } catch (err) {
      alert(err.message || 'Gagal menghapus ruangan');
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-8">Loading rooms...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Manajemen Ruangan
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Kelola data ruangan untuk organisasi kemahasiswaan
            </p>
          </div>
          <Button variant="primary" size="md" className="hidden md:flex" onClick={openCreateForm}>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-24">
        <Card className="border-l-4 border-l-blue-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Ruangan</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{rooms.length}</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-green-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Tersedia</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {rooms.filter(r => r.status === 'available').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Terpakai</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {rooms.filter(r => r.status === 'occupied').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-red-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Maintenance</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {rooms.filter(r => r.status === 'maintenance').length}
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Results Count */}
      <div className="mb-16">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredRooms.length}</span> dari {rooms.length} ruangan
        </p>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredRooms.map((room) => (
            <Card key={room.id} hover className="hover-lift">
              <Card.Body className="p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {room.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {room.building} • {room.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditForm(room)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(room.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Kapasitas:</span> {room.capacity} orang
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Jam Akses:</span> {room.accessHours}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Organisasi:</span> {room.organization}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    room.status === 'available' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : room.status === 'occupied'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {room.status === 'available' ? 'Tersedia' : room.status === 'occupied' ? 'Terpakai' : 'Maintenance'}
                  </span>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              </Card.Body>
            </Card>
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {formMode === 'create' ? 'Tambah Ruangan' : 'Edit Ruangan'}
              </h2>
              <button
                onClick={closeForm}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            {formError && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {formError}
              </div>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Ruangan*</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Gedung*</label>
                  <input
                    name="building"
                    value={formData.building}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Kapasitas</label>
                  <input
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Jam Akses</label>
                  <input
                    name="accessHours"
                    value={formData.accessHours}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Tersedia</option>
                    <option value="occupied">Terpakai</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Organisasi</label>
                  <input
                    name="organization"
                    value={formData.organization}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Fasilitas (pisahkan dengan koma)</label>
                  <input
                    name="facilities"
                    value={formData.facilities}
                    onChange={handleFormChange}
                    placeholder="AC, Proyektor, WiFi"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={processing}
                  className="flex-1"
                >
                  {processing ? 'Menyimpan...' : formMode === 'create' ? 'Tambah' : 'Simpan'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  disabled={processing}
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;