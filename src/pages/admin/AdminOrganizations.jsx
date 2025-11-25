import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import { OrganizationIcon, PlusIcon } from '../../components/icons';
import {
  fetchOrganizations,
  fetchOrganizationCategories,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  subscribeToOrganizationChanges,
} from '../../services/organizationService';
import { useAuth } from '../../context/AuthContext';

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

const AdminOrganizations = () => {
  const { user } = useAuth();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [formData, setFormData] = useState(defaultFormState);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [formError, setFormError] = useState(null);
  const [processing, setProcessing] = useState(false);

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
        setFilters(categories.map((cat) => ({ value: cat, label: cat })));
        setError(null);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load organizations');
      } finally {
        if (isMounted) setLoading(false);
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
    return organizations.filter(org => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || org.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [organizations, searchTerm, selectedCategory]);


  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setSelectedCategory(value);
  };

  const openCreateForm = () => {
    setFormMode('create');
    setFormData(defaultFormState);
    setFormError(null);
    setShowForm(true);
    setCurrentOrg(null);
  };

  const openEditForm = (org) => {
    setFormMode('edit');
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
    setCurrentOrg(org);
  };

  const closeForm = () => {
    setShowForm(false);
    setCurrentOrg(null);
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

    if (!formData.name || !formData.category) {
      setFormError('Name and Category are required');
      setProcessing(false);
      return;
    }

    try {
      if (formMode === 'create') {
        const newOrg = {
          name: formData.name,
          abbreviation: formData.abbreviation,
          category: formData.category,
          description: formData.description,
          status: formData.status,
          pembina: formData.pembina,
          contact: { email: formData.contactEmail, phone: formData.contactPhone },
        };
        const created = await createOrganization(newOrg, user.role);
        setOrganizations(prev => [...prev, created]);
      } else if (formMode === 'edit' && currentOrg) {
        const updated = {
          name: formData.name,
          abbreviation: formData.abbreviation,
          category: formData.category,
          description: formData.description,
          status: formData.status,
          pembina: formData.pembina,
          contact: { email: formData.contactEmail, phone: formData.contactPhone },
        };
        const updatedOrg = await updateOrganization(currentOrg.id, updated, user.role);
        setOrganizations(prev =>
          prev.map(org => (org.id === currentOrg.id ? updatedOrg : org))
        );
      }
      closeForm();
    } catch (error) {
      setFormError(error.message || 'Failed to save organization');
    }
    setProcessing(false);
  };

  const handleDelete = async (orgId) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) return;
    try {
      await deleteOrganization(orgId, user.role);
      setOrganizations(prev => prev.filter(org => org.id !== orgId));
    } catch (error) {
      alert(error.message || 'Failed to delete organization');
    }
  };

  if (loading) {
    return <p>Loading organizations...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      <div className="mb-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Manajemen Organisasi</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Kelola data organisasi kemahasiswaan
          </p>
        </div>
        <Button variant="primary" size="md" className="hidden md:flex" onClick={openCreateForm}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Tambah Organisasi
        </Button>
      </div>

      <div className="mb-16">
        <SearchBar
          placeholder="Cari organisasi (nama, singkatan, deskripsi)..."
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filters}
          className="w-full"
        />
      </div>

      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{filteredOrganizations.length}</span> dari{' '}
          {organizations.length} organisasi
        </p>
      </div>

      {filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredOrganizations.map(org => (
            <Card key={org.id} className="hover-lift">
              <Card.Body className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{org.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {org.abbreviation} &bull; {org.category}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {org.description}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Pembina: {org.pembina}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        org.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {org.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditForm(org)}
                        aria-label={`Edit ${org.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" 
                              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l9.414-9.414a1 1 0 000-1.414L14.414 4.586a1 1 0 00-1.414 0L4 13.586V20z" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(org.id)}
                        aria-label={`Delete ${org.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" 
                              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
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

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {formMode === 'create' ? 'Tambah Organisasi' : 'Edit Organisasi'}
            </h2>
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
                  {filters.map(f => (
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

export default AdminOrganizations;
