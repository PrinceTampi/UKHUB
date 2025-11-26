import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import OrganizationCard from '../../components/ui/OrganizationCard';
import { OrganizationIcon } from '../../components/icons';
import {
  fetchOrganizations,
  fetchOrganizationCategories,
  subscribeToOrganizationChanges,
} from '../../services/organizationService';

const DosenOrganizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        if (isMounted) setError(err.message || 'Gagal memuat organisasi');
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

  if (loading) {
    return <p>Memuat organisasi...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      <div className="mb-20">
        <div className="flex flex-col gap-8 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Organisasi Binaan
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Pantau organisasi yang Anda bina tanpa mengubah data mereka.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <SearchBar
            placeholder="Cari organisasi..."
            onSearch={setSearchTerm}
            onFilterChange={setSelectedCategory}
            filters={categoryFilters}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Menampilkan{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredOrganizations.length}
          </span>{' '}
          dari {organizations.length} organisasi
        </p>
      </div>

  {filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredOrganizations.map((org) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              onClick={() => navigate(`/organizations/${org.id}`)}
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

export default DosenOrganizations;

