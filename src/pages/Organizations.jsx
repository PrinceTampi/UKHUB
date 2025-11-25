import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import OrganizationCard from '../components/ui/OrganizationCard';
import { OrganizationIcon, PlusIcon } from '../components/icons';
import { USER_ROLES } from '../utils/constants';
import {
  fetchOrganizations,
  fetchOrganizationCategories,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  resetOrganizations,
  subscribeToOrganizationChanges,
} from '../services/organizationService';
import { useAuth } from '../context/AuthContext';

const defaultFormState = {
  name: '',
  abbreviation: '',
  category: '',
  description: '',
  status: 'active',
  pembina: '',
  contactEmail: '',
  contactPhone: '',
};

const Organizations = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  const [organizations, setOrganizations] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentOrg, setCurrentOrg] = useState(null);
  const [formData, setFormData] = useState(defaultFormState);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(null);

  const canManage = user?.role === USER_ROLES.ADMIN;

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      try {
        const [orgs, categories] = await Promise.all([
          fetchOrganizations(),
          fetchOrganizationCategories(),
        ]);
        if (!isMounted) return;
        setOrganizations(orgs);
        setCategoryFilters(categories.map((cat) => ({ value: cat, label: cat })));
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Gagal memuat organisasi');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    const unsubscribe = subscribeToOrganizationChanges((snapshot) => {
      if (isMounted) setOrganizations(snapshot);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || org.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [organizations, searchTerm, selectedCategory]);

  const openCreateForm = () => {
    setFormMode('create');
    setCurrentOrg(null);
    setFormData(defaultFormState);
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (org) => {
    setFormMode('edit');
    setCurrentOrg(org);
    setFormData({
      name: org.name || '',
      abbreviation: org.abbreviation || '',
      category: org.category || '',
      description: org.description || '',
      status: org.status || 'active',
      pembina: org.pembina || '',
      contactEmail: org.contact?.email || '',
      contactPhone: org.contact?.phone || '',
    });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCurrentOrg(null);
    setFormError(null);
    setProcessing(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!canManage) return;

    setProcessing(true);
    setFormError(null);

    if (!formData.name || !formData.category) {
      setFormError('Name dan Category wajib diisi.');
      setProcessing(false);
      return;
    }

    const payload = {
      name: formData.name,
      abbreviation: formData.abbreviation,
      category: formData.category,
      description: formData.description,
      status: formData.status,
      pembina: formData.pembina,
      contact: {
        email: formData.contactEmail,
        phone: formData.contactPhone,
      },
    };

    try {
      if (formMode === 'create') {
        const created = await createOrganization(payload, user.role);
        setOrganizations((prev) => [...prev, created]);
      } else if (formMode === 'edit' && currentOrg) {
        const updated = await updateOrganization(currentOrg.id, payload, user.role);
        setOrganizations((prev) =>
          prev.map((org) => (org.id === currentOrg.id ? updated : org))
        );
      }
      closeForm();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan organisasi');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (orgId) => {
    if (!canManage) return;
    if (!window.confirm('Hapus organisasi ini?')) return;
    try {
      await deleteOrganization(orgId, user.role);
      setOrganizations((prev) => prev.filter((org) => org.id !== orgId));
    } catch (err) {
      alert(err.message || 'Gagal menghapus organisasi');
    }
  };

  const handleResetData = async () => {
    if (!canManage) return;
    if (!window.confirm('Reset seluruh data organisasi ke default?')) return;
    try {
      const seeded = await resetOrganizations(user.role);
      setOrganizations(seeded);
      setSearchTerm('');
      setSelectedCategory('');
    } catch (err) {
      alert(err.message || 'Gagal mereset data');
    }
  };

  if (loading || authLoading) {
    return <p>Loading organizations...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Daftar Organisasi
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Jelajahi semua organisasi kemahasiswaan di universitas
            </p>
          </div>
          {canManage && (
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="danger" size="md" className="hidden md:inline-flex" onClick={handleResetData}>
                Reset Data
              </Button>
              <Button variant="primary" size="md" className="hidden md:inline-flex" onClick={openCreateForm}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Tambah Organisasi
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari organisasi (nama, singkatan, deskripsi)..."
            onSearch={setSearchTerm}
            onFilterChange={setSelectedCategory}
            filters={categoryFilters}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{filteredOrganizations.length}</span> dari{' '}
          {organizations.length} organisasi
        </p>
      </div>

      {/* Organizations Grid */}
      {filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredOrganizations.map((org) => (
            <div key={org.id}>
              <OrganizationCard
                organization={org}
                onClick={() => navigate(`/organizations/${org.id}`)}
                className="hover-lift"
              />
              {canManage && (
                <div className="flex justify-end space-x-4 mt-2">
                  <Button size="sm" variant="outline" onClick={() => openEditForm(org)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(org.id)}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body className="text-center py-20">
            <OrganizationIcon className="w-24 h-24 mx-auto text-gray-400 mb-8" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Tidak ada organisasi ditemukan
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{formMode === 'create' ? 'Tambah Organisasi' : 'Edit Organisasi'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name*</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Abbreviation</label>
                <input
                  name="abbreviation"
                  value={formData.abbreviation}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                  required
                >
                  <option value="">Select category</option>
                  {filters.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Pembina</label>
                <input
                  name="pembina"
                  value={formData.pembina}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Contact Email</label>
                <input
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Contact Phone</label>
                <input
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                />
              </div>
              {formError && <p className="text-red-500">{formError}</p>}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizations;

