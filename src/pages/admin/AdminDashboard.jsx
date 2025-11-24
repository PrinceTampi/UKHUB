import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { OrganizationIcon, BuildingIcon, AnnouncementIcon, ActivityIcon, MailIcon, ArrowRightIcon } from '../../components/icons';
import { fetchOrganizations } from '../../services/organizationService';

const AdminDashboard = () => {
  const [organizationsCount, setOrganizationsCount] = useState(0);
  const [loadingOrgs, setLoadingOrgs] = useState(true);

  useEffect(() => {
  
    const loadOrganizationsCount = async () => {
      setLoadingOrgs(true);
      try {
        const orgs = await fetchOrganizations();
        setOrganizationsCount(orgs.length);
      } catch (error) {
        setOrganizationsCount(0);
      } finally {
        setLoadingOrgs(false);
      }
    };

    loadOrganizationsCount();
  }, []);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-20">
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Admin Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
              Kelola semua data organisasi kemahasiswaan dari satu tempat
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
        <Card className="border-l-4 border-blue-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <OrganizationIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Organisasi</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {loadingOrgs ? 'Loading...' : organizationsCount}
            </p>
          </Card.Body>
        </Card>

        {/* The other cards remain unchanged with static numbers for now */}
        <Card className="border-l-4 border-purple-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Ruangan</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">50</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-green-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Kegiatan</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">100</p>
          </Card.Body>
        </Card>
        <Card className="border-l-4 border-orange-500 hover-lift">
          <Card.Body className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <AnnouncementIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Pengumuman</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">45</p>
          </Card.Body>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Akses cepat ke fitur manajemen
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Link to="/admin/organizations">
            <Card className="border-0 shadow-lg hover-lift bg-linear-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg">
                  <OrganizationIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Manajemen Organisasi
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Kelola data organisasi kemahasiswaan
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span>Kelola</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>
          <Link to="/admin/rooms">
            <Card className="border-0 shadow-lg hover-lift bg-linear-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mb-6 shadow-lg">
                  <BuildingIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Manajemen Ruangan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Kelola data ruangan untuk organisasi
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                  <span>Kelola</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>
          <Link to="/admin/announcements">
            <Card className="border-0 shadow-lg hover-lift bg-linear-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <AnnouncementIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Manajemen Pengumuman
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Kelola pengumuman dari WR3 dan Kemahasiswaan
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  <span>Kelola</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>
          <Link to="/admin/activities">
            <Card className="border-0 shadow-lg hover-lift bg-linear-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center mb-6 shadow-lg">
                  <ActivityIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Manajemen Kegiatan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Kelola kegiatan dan acara organisasi
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium">
                  <span>Kelola</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>
          <Link to="/admin/contacts">
            <Card className="border-0 shadow-lg hover-lift bg-linear-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10 h-full">
              <Card.Body className="p-10">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                  <MailIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Manajemen Kontak
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Kelola kontak WR3, Kemahasiswaan, dan Ketua Organisasi
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Kelola</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
