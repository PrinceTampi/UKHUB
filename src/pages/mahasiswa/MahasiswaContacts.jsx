import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import SearchBar from '../../components/ui/SearchBar';
import { LocationIcon, MailIcon, PhoneIcon, ClockIcon, UsersIcon, SearchIcon } from '../../components/icons';
import useRealtimeCollection from '../../hooks/useRealtimeCollection';
import { getAll, subscribeToContactChanges } from '../../services/contactService';

const MahasiswaContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: contacts,
    loading,
    error,
  } = useRealtimeCollection(getAll, subscribeToContactChanges);

  const { officialContacts, organizationLeaders } = useMemo(() => {
    return {
      officialContacts: contacts.filter((contact) => contact.type === 'official'),
      organizationLeaders: contacts.filter((contact) => contact.type === 'leader'),
    };
  }, [contacts]);

  const filteredLeaders = organizationLeaders.filter(
    (leader) =>
      leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onSearch={setSearchTerm}
          className="max-w-2xl"
        />
      </div>

      {/* Official Contacts */}
      <div className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">Kontak Resmi</h2>
        {loading ? (
          <Card>
            <Card.Body className="py-12 text-center text-gray-500">Memuat kontak resmi...</Card.Body>
          </Card>
        ) : error ? (
          <Card>
            <Card.Body className="py-12 text-center text-red-500">{error}</Card.Body>
          </Card>
        ) : officialContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {officialContacts.map((contact) => (
              <Card key={contact.id} hover className="border border-gray-100 dark:border-gray-800 shadow-sm hover-lift">
                <Card.Body className="p-8">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-200 flex items-center justify-center text-xl font-bold">
                      {contact.abbreviation || contact.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{contact.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.position}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {contact.address && (
                      <div className="flex items-start gap-4">
                        <LocationIcon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Alamat</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {contact.address}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <MailIcon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</p>
                        <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Telepon</p>
                        <a
                          href={`tel:${contact.phone?.replace(/\s/g, '')}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Jam Operasional</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Senin - Jumat: 08:00 - 16:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Body className="py-12 text-center text-gray-500">Belum ada kontak resmi.</Card.Body>
          </Card>
        )}
      </div>

      {/* Organization Leaders Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Ketua Organisasi</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Daftar ketua organisasi kemahasiswaan
            </p>
          </div>
          <span className="text-lg text-gray-500 dark:text-gray-400">{filteredLeaders.length} kontak</span>
        </div>
        {loading ? (
          <Card>
            <Card.Body className="text-center py-20 text-gray-500">Memuat kontak organisasi...</Card.Body>
          </Card>
        ) : error ? (
          <Card>
            <Card.Body className="text-center py-20 text-red-500">{error}</Card.Body>
          </Card>
        ) : filteredLeaders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredLeaders.map((leader) => (
              <Card key={leader.id} hover className="border-l-4 border-l-purple-600 dark:border-l-purple-400 hover-lift">
                <Card.Body className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
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
              <p className="text-xl text-gray-600 dark:text-gray-400">Tidak ada kontak yang ditemukan untuk "{searchTerm}"</p>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MahasiswaContacts;

