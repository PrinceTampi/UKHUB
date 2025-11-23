import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import OrganizationCard from '../../components/ui/OrganizationCard';
import { ORGANIZATION_CATEGORIES } from '../../utils/constants';
import { OrganizationIcon, PlusIcon, PencilIcon, TrashIcon } from '../../components/icons';

const AdminOrganizations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - in real app, this would come from API
  const organizations = [
    {
      id: 1,
      name: 'Badan Eksekutif Mahasiswa',
      abbreviation: 'BEM',
      category: 'Ormawa',
      logo: null,
      description: 'Organisasi mahasiswa tingkat universitas yang bertugas melaksanakan program kerja kemahasiswaan',
      status: 'active',
      pembina: 'Dr. Ahmad Hidayat, M.Pd.',
      contact: { email: 'bem@universitas.ac.id' }
    },
    {
      id: 2,
      name: 'Dewan Perwakilan Mahasiswa',
      abbreviation: 'DPM',
      category: 'Ormawa',
      logo: null,
      description: 'Lembaga legislatif mahasiswa yang mengawasi dan mengevaluasi program kerja BEM',
      status: 'active',
      pembina: 'Prof. Dr. Siti Nurhaliza',
      contact: { email: 'dpm@universitas.ac.id' }
    },
    {
      id: 3,
      name: 'Himpunan Mahasiswa Teknik Informatika',
      abbreviation: 'HIMTI',
      category: 'Himpunan',
      logo: null,
      description: 'Organisasi mahasiswa jurusan Teknik Informatika yang mengembangkan potensi akademik dan non-akademik',
      status: 'active',
      pembina: 'Dr. Budi Santoso, M.Kom.',
      contact: { email: 'himti@universitas.ac.id' }
    },
    {
      id: 4,
      name: 'Himpunan Mahasiswa Sistem Informasi',
      abbreviation: 'HIMSI',
      category: 'Himpunan',
      logo: null,
      description: 'Organisasi mahasiswa jurusan Sistem Informasi',
      status: 'active',
      pembina: 'Dr. Siti Aisyah, M.Kom.',
      contact: { email: 'himsi@universitas.ac.id' }
    },
    {
      id: 5,
      name: 'UKM Olahraga',
      abbreviation: 'UKM OR',
      category: 'UKM',
      logo: null,
      description: 'Unit Kegiatan Mahasiswa bidang olahraga',
      status: 'active',
      pembina: 'Dr. Joko Widodo, M.Pd.',
      contact: { email: 'ukm.olahraga@universitas.ac.id' }
    },
    {
      id: 6,
      name: 'UKM Seni',
      abbreviation: 'UKM SENI',
      category: 'UKM',
      logo: null,
      description: 'Unit Kegiatan Mahasiswa bidang seni dan budaya',
      status: 'active',
      pembina: 'Dr. Ani Lestari, M.Sn.',
      contact: { email: 'ukm.seni@universitas.ac.id' }
    },
  ];

  const filters = ORGANIZATION_CATEGORIES.map(cat => ({
    value: cat,
    label: cat,
  }));

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setSelectedCategory(value);
  };

  const handleOrganizationClick = (orgId) => {
    navigate(`/organizations/${orgId}`);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Manajemen Organisasi
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Kelola data organisasi kemahasiswaan
            </p>
          </div>
          <Button variant="primary" size="md" className="hidden md:flex">
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Organisasi
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-16">
          <SearchBar
            placeholder="Cari organisasi (nama, singkatan, deskripsi)..."
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
                <OrganizationIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Organisasi</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{organizations.length}</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-green-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <OrganizationIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Aktif</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {organizations.filter(o => o.status === 'active').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-purple-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <OrganizationIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Ormawa</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {organizations.filter(o => o.category === 'Ormawa').length}
            </p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-l-orange-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <OrganizationIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Himpunan</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {organizations.filter(o => o.category === 'Himpunan').length}
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Results Count */}
      <div className="mb-16">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredOrganizations.length}</span> dari {organizations.length} organisasi
        </p>
      </div>

      {/* Organizations Grid */}
      {filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredOrganizations.map((org) => (
            <Card key={org.id} hover className="hover-lift">
              <Card.Body className="p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {org.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {org.abbreviation} • {org.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                  {org.description}
                </p>
                <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    org.status === 'active' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {org.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleOrganizationClick(org.id)}>
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
    </div>
  );
};

export default AdminOrganizations;

