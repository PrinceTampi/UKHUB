import { v4 as uuidv4 } from 'uuid';
import { ANNOUNCEMENT_CATEGORIES } from '../utils/constants';

const STORAGE_KEY = 'announcements_data';

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Pengumuman Penting: Open Recruitment BEM 2024',
    category: 'Penting',
    date: '2024-03-10',
    author: 'WR3',
    isUrgent: true,
    excerpt: 'Dibuka pendaftaran untuk anggota baru Badan Eksekutif Mahasiswa periode 2024. Pendaftaran dibuka mulai tanggal 15 Maret 2024.',
    content: 'Dibuka pendaftaran untuk anggota baru Badan Eksekutif Mahasiswa periode 2024. Pendaftaran dibuka mulai tanggal 15 Maret 2024.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'ann-2',
    title: 'Seminar Kewirausahaan Mahasiswa',
    category: 'Event',
    date: '2024-03-12',
    author: 'Kemahasiswaan',
    isUrgent: false,
    excerpt: 'Seminar tentang kewirausahaan untuk mahasiswa dengan pembicara dari industri. Acara akan dilaksanakan pada tanggal 25 Maret 2024.',
    content: 'Seminar tentang kewirausahaan untuk mahasiswa dengan pembicara dari industri. Acara akan dilaksanakan pada tanggal 25 Maret 2024.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'ann-3',
    title: 'Workshop Leadership & Management',
    category: 'Event',
    date: '2024-03-15',
    author: 'Kemahasiswaan',
    isUrgent: false,
    excerpt: 'Workshop untuk meningkatkan kemampuan kepemimpinan dan manajemen organisasi. Terbuka untuk semua organisasi kemahasiswaan.',
    content: 'Workshop untuk meningkatkan kemampuan kepemimpinan dan manajemen organisasi. Terbuka untuk semua organisasi kemahasiswaan.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'ann-4',
    title: 'Informasi Perpanjangan Masa Aktif Organisasi',
    category: 'Informasi',
    date: '2024-03-18',
    author: 'WR3',
    isUrgent: false,
    excerpt: 'Informasi penting mengenai perpanjangan masa aktif organisasi kemahasiswaan untuk periode 2024-2025.',
    content: 'Informasi penting mengenai perpanjangan masa aktif organisasi kemahasiswaan untuk periode 2024-2025.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'ann-5',
    title: 'Pendaftaran Program Beasiswa Kemahasiswaan',
    category: 'Penting',
    date: '2024-03-20',
    author: 'WR3',
    isUrgent: true,
    excerpt: 'Dibuka pendaftaran program beasiswa untuk mahasiswa aktif yang terlibat dalam organisasi kemahasiswaan.',
    content: 'Dibuka pendaftaran program beasiswa untuk mahasiswa aktif yang terlibat dalam organisasi kemahasiswaan.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'ann-6',
    title: 'Pelatihan Manajemen Keuangan Organisasi',
    category: 'Event',
    date: '2024-03-22',
    author: 'Kemahasiswaan',
    isUrgent: false,
    excerpt: 'Pelatihan manajemen keuangan untuk pengurus organisasi kemahasiswaan. Wajib diikuti oleh bendahara organisasi.',
    content: 'Pelatihan manajemen keuangan untuk pengurus organisasi kemahasiswaan. Wajib diikuti oleh bendahara organisasi.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

const getStorage = () => (typeof window !== 'undefined' ? window.localStorage : null);

const seedAnnouncements = () => DEFAULT_ANNOUNCEMENTS.map((ann) => ({
  ...ann,
  id: ann.id || uuidv4(),
  createdAt: ann.createdAt || new Date().toISOString(),
  updatedAt: ann.updatedAt || new Date().toISOString(),
}));

const readAnnouncements = () => {
  const storage = getStorage();
  if (!storage) {
    return seedAnnouncements();
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedAnnouncements();
    persistAnnouncements(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid announcements format');
    // Merge with default announcements
    const defaultIds = new Set(DEFAULT_ANNOUNCEMENTS.map(a => a.id));
    const existingIds = new Set(parsed.map(a => a.id));
    const missingDefaults = DEFAULT_ANNOUNCEMENTS.filter(a => !existingIds.has(a.id));
    return [...parsed, ...missingDefaults];
  } catch {
    const seeded = seedAnnouncements();
    persistAnnouncements(seeded);
    return seeded;
  }
};

const persistAnnouncements = (announcements) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(announcements));
};

const ensureCanMutate = (role) => {
  const normalized = (role || '').toLowerCase();
  if (!['admin', 'dosen'].includes(normalized)) {
    throw new Error('Unauthorized: admin or dosen role required');
  }
};

const normalizeCategory = (value) => {
  if (!value) return ANNOUNCEMENT_CATEGORIES[0];
  const normalized = ANNOUNCEMENT_CATEGORIES.find(
    (cat) => cat.toLowerCase() === String(value).toLowerCase()
  );
  return normalized || value;
};

// Standard service functions
export const getAll = async () => {
  return readAnnouncements();
};

export const getById = async (id) => {
  const announcements = readAnnouncements();
  const announcement = announcements.find((a) => a.id === id);
  if (!announcement) {
    throw new Error('Announcement not found');
  }
  return announcement;
};

export const add = async (announcement, userRole) => {
  ensureCanMutate(userRole);
  const announcements = readAnnouncements();
  const now = new Date().toISOString();
  const newAnnouncement = {
    id: uuidv4(),
    title: (announcement.title || '').trim(),
    category: normalizeCategory(announcement.category),
    date: announcement.date || new Date().toISOString().split('T')[0],
    author: (announcement.author || 'WR3').trim(),
    isUrgent: Boolean(announcement.isUrgent),
    excerpt: (announcement.excerpt || announcement.content || '').trim(),
    content: (announcement.content || announcement.excerpt || '').trim(),
    createdAt: now,
    updatedAt: now,
  };

  if (!newAnnouncement.title) {
    throw new Error('Announcement title is required');
  }

    announcements.push(newAnnouncement);
  persistAnnouncements(announcements);
  return newAnnouncement;
};

export const update = async (id, updates, userRole) => {
  ensureCanMutate(userRole);
  const announcements = readAnnouncements();
  const index = announcements.findIndex((a) => a.id === id);
    if (index === -1) {
    throw new Error('Announcement not found');
  }

  const updated = {
    ...announcements[index],
    ...updates,
    id: announcements[index].id, // Preserve ID
    category: updates.category ? normalizeCategory(updates.category) : announcements[index].category,
    updatedAt: new Date().toISOString(),
  };

  announcements[index] = updated;
  persistAnnouncements(announcements);
  return updated;
};

export const remove = async (id, userRole) => {
  ensureCanMutate(userRole);
  const announcements = readAnnouncements();
  const filtered = announcements.filter((a) => a.id !== id);
  if (filtered.length === announcements.length) {
    throw new Error('Announcement not found');
  }
  persistAnnouncements(filtered);
};

// Legacy function names for backward compatibility
export const fetchAnnouncements = getAll;
export const createAnnouncement = add;
export const updateAnnouncement = update;
export const deleteAnnouncement = remove;