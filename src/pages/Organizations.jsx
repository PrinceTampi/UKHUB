import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import OrganizationCard from '../components/ui/OrganizationCard';
import { ORGANIZATION_CATEGORIES } from '../utils/constants';
import { OrganizationIcon, PlusIcon } from '../components/icons';

const Organizations = () => {
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
              Daftar Organisasi
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Jelajahi semua organisasi kemahasiswaan di universitas
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

      {/* Results Count */}
      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredOrganizations.length}</span> dari {organizations.length} organisasi
        </p>
      </div>

      {/* Organizations Grid */}
      {filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredOrganizations.map((org) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              onClick={() => handleOrganizationClick(org.id)}
              className="hover-lift"
            />
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

export default Organizations;

