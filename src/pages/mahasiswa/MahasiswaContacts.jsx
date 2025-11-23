import { useState } from 'react';
import { CONTACT_INFO } from '../../utils/constants';
import Card from '../../components/ui/Card';
import SearchBar from '../../components/ui/SearchBar';
import { LocationIcon, MailIcon, PhoneIcon, ClockIcon, UsersIcon, SearchIcon } from '../../components/icons';

const MahasiswaContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for organization leaders
  const organizationLeaders = [
    { 
      id: 1,
      name: 'Ketua BEM', 
      email: 'ketua.bem@universitas.ac.id', 
      phone: '+62 123 456 7892', 
      organization: 'BEM',
      position: 'Ketua Umum',
      photo: null
    },
    { 
      id: 2,
      name: 'Ketua DPM', 
      email: 'ketua.dpm@universitas.ac.id', 
      phone: '+62 123 456 7893', 
      organization: 'DPM',
      position: 'Ketua Umum',
      photo: null
    },
    { 
      id: 3,
      name: 'Ketua HIMTI', 
      email: 'ketua.himti@universitas.ac.id', 
      phone: '+62 123 456 7894', 
      organization: 'HIMTI',
      position: 'Ketua',
      photo: null
    },
    { 
      id: 4,
      name: 'Ketua HIMSI', 
      email: 'ketua.himsi@universitas.ac.id', 
      phone: '+62 123 456 7895', 
      organization: 'HIMSI',
      position: 'Ketua',
      photo: null
    },
  ];

  // Filter organizations based on search
  const filteredLeaders = organizationLeaders.filter(leader =>
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="mb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Direktori Kontak
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Hubungi kami untuk informasi lebih lanjut tentang organisasi kemahasiswaan
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-16">
        <SearchBar
          placeholder="Cari kontak (nama, organisasi, email)..."
          onSearch={handleSearch}
          className="max-w-2xl"
        />
      </div>

      {/* WR3 & Kemahasiswaan Section */}
      <div className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Kontak Resmi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* WR3 Card */}
          <Card hover className="border-l-4 border-l-blue-600 dark:border-l-blue-400 hover-lift">
            <Card.Body className="p-8">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                  WR
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {CONTACT_INFO.WR3.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Wakil Rektor Bidang Kemahasiswaan
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <LocationIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Alamat</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{CONTACT_INFO.WR3.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MailIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</p>
                    <a 
                      href={`mailto:${CONTACT_INFO.WR3.email}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.WR3.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Telepon</p>
                    <a 
                      href={`tel:${CONTACT_INFO.WR3.phone.replace(/\s/g, '')}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.WR3.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ClockIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jam Operasional</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Senin - Jumat: 08:00 - 16:00 WIB</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Kemahasiswaan Card */}
          <Card hover className="border-l-4 border-l-green-600 dark:border-l-green-400 hover-lift">
            <Card.Body className="p-8">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                  KM
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {CONTACT_INFO.KEMAHASISWAAN.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Divisi Kemahasiswaan
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <LocationIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Alamat</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{CONTACT_INFO.KEMAHASISWAAN.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MailIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</p>
                    <a 
                      href={`mailto:${CONTACT_INFO.KEMAHASISWAAN.email}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.KEMAHASISWAAN.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Telepon</p>
                    <a 
                      href={`tel:${CONTACT_INFO.KEMAHASISWAAN.phone.replace(/\s/g, '')}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {CONTACT_INFO.KEMAHASISWAAN.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ClockIcon className="w-6 h-6 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jam Operasional</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Senin - Jumat: 08:00 - 16:00 WIB</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Organization Leaders Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredLeaders.map((leader) => (
              <Card key={leader.id} hover className="border-l-4 border-l-purple-600 dark:border-l-purple-400 hover-lift">
                <Card.Body className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                      {leader.photo ? (
                        <img 
                          src={leader.photo} 
                          alt={leader.name}
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      ) : (
                        <UsersIcon className="w-8 h-8" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
                        {leader.name}
                      </h3>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
                        {leader.organization}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {leader.position}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                      <MailIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate group-hover:underline">{leader.email}</span>
                    </a>
                    <a
                      href={`tel:${leader.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                      <PhoneIcon className="w-5 h-5 flex-shrink-0" />
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
    </div>
  );
};

export default MahasiswaContacts;

