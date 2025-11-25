import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';
import { AnnouncementIcon, PlusIcon, PencilIcon, TrashIcon, XIcon } from '../../components/icons';
import { getAll, add, update, remove } from '../../services/announcementService';
import { useAuth } from '../../context/AuthContext';

const AdminAnnouncements = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    author: 'WR3',
    isUrgent: false,
    excerpt: '',
    content: '',
  });
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await getAll();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error loading announcements:', error);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

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

  const openCreateForm = () => {
    setFormMode('create');
    setCurrentAnnouncement(null);
    setFormData({
      title: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      author: 'WR3',
      isUrgent: false,
      excerpt: '',
      content: '',
    });
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (announcement) => {
    setFormMode('edit');
    setCurrentAnnouncement(announcement);
    setFormData({
      title: announcement.title || '',
      category: announcement.category || '',
      date: announcement.date || new Date().toISOString().split('T')[0],
      author: announcement.author || 'WR3',
      isUrgent: announcement.isUrgent || false,
      excerpt: announcement.excerpt || '',
      content: announcement.content || announcement.excerpt || '',
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormMode('create');
    setCurrentAnnouncement(null);
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

    if (!formData.title || !formData.category) {
      setFormError('Title dan Category wajib diisi.');
      setProcessing(false);
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      date: formData.date,
      author: formData.author,
      isUrgent: formData.isUrgent,
      excerpt: formData.excerpt || formData.content,
      content: formData.content || formData.excerpt,
    };

    try {
      if (formMode === 'create') {
        const created = await add(payload, user?.role);
        setAnnouncements(prev => [...prev, created]);
      } else if (formMode === 'edit' && currentAnnouncement) {
        const updated = await update(currentAnnouncement.id, payload, user?.role);
        setAnnouncements(prev => prev.map(a => a.id === currentAnnouncement.id ? updated : a));
      }
      closeForm();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan pengumuman');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (announcementId) => {
    if (!window.confirm('Hapus pengumuman ini?')) return;
    try {
      await remove(announcementId, user?.role);
      setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    } catch (err) {
      alert(err.message || 'Gagal menghapus pengumuman');
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-8">Loading announcements...</div>;
  }

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
          <Button variant="primary" size="md" className="hidden md:flex" onClick={openCreateForm}>
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
                    <button 
                      onClick={() => openEditForm(announcement)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(announcement.id)}
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {formMode === 'create' ? 'Buat Pengumuman' : 'Edit Pengumuman'}
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
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Judul*</label>
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
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Kategori*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {ANNOUNCEMENT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
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
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Penulis</label>
                  <input
                    name="author"
                    value={formData.author}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <input
                    name="isUrgent"
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Urgent</label>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Ringkasan</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Konten Lengkap</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  rows={5}
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
                  {processing ? 'Menyimpan...' : formMode === 'create' ? 'Buat' : 'Simpan'}
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

export default AdminAnnouncements;