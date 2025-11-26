import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import ActivityCard from '../../components/ui/ActivityCard';
import { ACTIVITY_STATUS } from '../../utils/constants';
import { ActivityIcon, PlusIcon, PencilIcon, TrashIcon, XIcon } from '../../components/icons';
import { getAll, add, update, remove } from '../../services/activityService';
import { useAuth } from '../../context/AuthContext';

const AdminActivities = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'upcoming',
    location: '',
    organization: '',
    type: 'event',
    description: '',
    registrationRequired: false,
  });
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await getAll();
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

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

  const openCreateForm = () => {
    setFormMode('create');
    setCurrentActivity(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      status: 'upcoming',
      location: '',
      organization: '',
      type: 'event',
      description: '',
      registrationRequired: false,
    });
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (activity) => {
    setFormMode('edit');
    setCurrentActivity(activity);
    setFormData({
      title: activity.title || '',
      date: activity.date || new Date().toISOString().split('T')[0],
      time: activity.time || '09:00',
      status: activity.status || 'upcoming',
      location: activity.location || '',
      organization: activity.organization || '',
      type: activity.type || 'event',
      description: activity.description || '',
      registrationRequired: activity.registrationRequired || false,
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormMode('create');
    setCurrentActivity(null);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setFormError(null);

    if (!formData.title) {
      setFormError('Title wajib diisi.');
      setProcessing(false);
      return;
    }

    const payload = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      status: formData.status,
      location: formData.location,
      organization: formData.organization,
      type: formData.type,
      description: formData.description,
      registrationRequired: formData.registrationRequired,
    };

    try {
      if (formMode === 'create') {
        const created = await add(payload, user?.role);
        setActivities(prev => [...prev, created]);
      } else if (formMode === 'edit' && currentActivity) {
        const updated = await update(currentActivity.id, payload, user?.role);
        setActivities(prev => prev.map(a => a.id === currentActivity.id ? updated : a));
      }
      closeForm();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan kegiatan');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (activityId) => {
    if (!window.confirm('Hapus kegiatan ini?')) return;
    try {
      await remove(activityId, user?.role);
      setActivities(prev => prev.filter(a => a.id !== activityId));
    } catch (err) {
      alert(err.message || 'Gagal menghapus kegiatan');
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-8">Loading activities...</div>;
  }

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
          <Button variant="primary" size="md" className="hidden md:flex" onClick={openCreateForm}>
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
                    <button 
                      onClick={() => openEditForm(activity)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(activity.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {formMode === 'create' ? 'Tambah Kegiatan' : 'Edit Kegiatan'}
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
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul Kegiatan*</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal</label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Waktu</label>
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
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
                    <option value="upcoming">Akan Datang</option>
                    <option value="ongoing">Berlangsung</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Tipe</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="event">Event</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="meeting">Meeting</option>
                    <option value="recruitment">Recruitment</option>
                  </select>
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
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Organisasi</label>
                  <input
                    name="organization"
                    value={formData.organization}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2 flex items-center">
                  <input
                    name="registrationRequired"
                    type="checkbox"
                    checked={formData.registrationRequired}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Perlu Pendaftaran</label>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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

export default AdminActivities;