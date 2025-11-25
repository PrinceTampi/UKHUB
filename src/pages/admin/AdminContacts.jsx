import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import SearchBar from '../../components/ui/SearchBar';
import Button from '../../components/ui/Button';
import { LocationIcon, MailIcon, PhoneIcon, ClockIcon, UsersIcon, SearchIcon, PlusIcon, PencilIcon, TrashIcon, XIcon } from '../../components/icons';
import { getAll, add, update, remove } from '../../services/contactService';
import { useAuth } from '../../context/AuthContext';

const AdminContacts = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [officialContacts, setOfficialContacts] = useState([]);
  const [organizationLeaders, setOrganizationLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentContact, setCurrentContact] = useState(null);
  const [formData, setFormData] = useState({
    type: 'leader',
    name: '',
    abbreviation: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    organization: '',
    photo: null,
  });
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const contacts = await getAll();
      setOfficialContacts(contacts.filter(c => c.type === 'official'));
      setOrganizationLeaders(contacts.filter(c => c.type === 'leader'));
    } catch (error) {
      console.error('Error loading contacts:', error);
      setOfficialContacts([]);
      setOrganizationLeaders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeaders = organizationLeaders.filter(leader =>
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (leader.organization && leader.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
    leader.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const openCreateForm = () => {
    setFormMode('create');
    setCurrentContact(null);
    setFormData({
      type: 'leader',
      name: '',
      abbreviation: '',
      position: '',
      email: '',
      phone: '',
      address: '',
      organization: '',
      photo: null,
    });
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (contact) => {
    setFormMode('edit');
    setCurrentContact(contact);
    setFormData({
      type: contact.type || 'leader',
      name: contact.name || '',
      abbreviation: contact.abbreviation || '',
      position: contact.position || '',
      email: contact.email || '',
      phone: contact.phone || '',
      address: contact.address || '',
      organization: contact.organization || '',
      photo: contact.photo || null,
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormMode('create');
    setCurrentContact(null);
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

    if (!formData.name || !formData.email) {
      setFormError('Name dan Email wajib diisi.');
      setProcessing(false);
      return;
    }

    const payload = {
      type: formData.type,
      name: formData.name,
      abbreviation: formData.abbreviation || formData.name.substring(0, 2).toUpperCase(),
      position: formData.position,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      organization: formData.organization,
      photo: formData.photo,
    };

    try {
      if (formMode === 'create') {
        const created = await add(payload, user?.role);
        if (created.type === 'official') {
          setOfficialContacts(prev => [...prev, created]);
        } else {
          setOrganizationLeaders(prev => [...prev, created]);
        }
      } else if (formMode === 'edit' && currentContact) {
        const updated = await update(currentContact.id, payload, user?.role);
        if (updated.type === 'official') {
          setOfficialContacts(prev => prev.map(c => c.id === currentContact.id ? updated : c));
        } else {
          setOrganizationLeaders(prev => prev.map(c => c.id === currentContact.id ? updated : c));
        }
      }
      closeForm();
      loadContacts(); // Reload to ensure sync
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan kontak');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Hapus kontak ini?')) return;
    try {
      await remove(contactId, user?.role);
      setOfficialContacts(prev => prev.filter(c => c.id !== contactId));
      setOrganizationLeaders(prev => prev.filter(c => c.id !== contactId));
    } catch (err) {
      alert(err.message || 'Gagal menghapus kontak');
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto p-8">Loading contacts...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Manajemen Kontak
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Kelola kontak WR3, Kemahasiswaan, dan Ketua Organisasi
            </p>
          </div>
          <Button variant="primary" size="md" className="hidden md:flex" onClick={openCreateForm}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Kontak
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari kontak (nama, organisasi, email)..."
            onSearch={handleSearch}
            className="max-w-2xl"
          />
        </div>
      </div>

      {/* Official Contacts Section */}
      <div className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Kontak Resmi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {officialContacts.length > 0 ? officialContacts.map(contact => (
            <Card hover key={contact.id} className="border-l-4 border-l-blue-600 dark:border-l-blue-400 hover-lift">
              <Card.Body className="p-10">
                <div className="flex items-start justify-between mb-10">
                  <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
                      {contact.abbreviation || contact.name.substring(0,2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditForm(contact)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <LocationIcon className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Alamat</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MailIcon className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <PhoneIcon className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Telepon</p>
                      <a href={`tel:${contact.phone.replace(/\s/g,'')}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ClockIcon className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Jam Operasional</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Senin - Jumat: 08:00 - 16:00 WIB</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )) : <p className="text-gray-600 dark:text-gray-400">No official contacts found.</p>}
        </div>
      </div>

      {/* Organization Leaders Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ketua Organisasi
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Daftar ketua organisasi kemahasiswaan
            </p>
          </div>
          <span className="text-lg text-gray-500 dark:text-gray-400">
            {filteredLeaders.length} kontak
          </span>
        </div>
        {filteredLeaders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {filteredLeaders.map(leader => (
              <Card key={leader.id} hover className="border-l-4 border-l-purple-600 dark:border-l-purple-400 hover-lift">
                <Card.Body className="p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                        {leader.photo ? (
                          <img src={leader.photo} alt={leader.name} className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          <UsersIcon className="w-8 h-8" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">{leader.name}</h3>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">{leader.organization}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{leader.position}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openEditForm(leader)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(leader.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <a href={`mailto:${leader.email}`} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <MailIcon className="w-5 h-5 shrink-0" />
                      <span className="truncate group-hover:underline">{leader.email}</span>
                    </a>
                    <a href={`tel:${leader.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <PhoneIcon className="w-5 h-5 shrink-0" />
                      <span className="group-hover:underline">{leader.phone}</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Body className="text-center py-20">
              <SearchIcon className="w-24 h-24 mx-auto text-gray-400 mb-8" />
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Tidak ada kontak yang ditemukan untuk "{searchTerm}"
              </p>
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {formMode === 'create' ? 'Tambah Kontak' : 'Edit Kontak'}
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
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Tipe</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="official">Kontak Resmi</option>
                  <option value="leader">Ketua Organisasi</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Nama*</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Singkatan</label>
                  <input
                    name="abbreviation"
                    value={formData.abbreviation}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Posisi</label>
                  <input
                    name="position"
                    value={formData.position}
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
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email*</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Telepon</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Alamat</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    rows={3}
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

export default AdminContacts;