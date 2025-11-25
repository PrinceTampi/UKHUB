import { v4 as uuidv4 } from 'uuid';
import { ACTIVITY_STATUS } from '../utils/constants';

const STORAGE_KEY = 'activities_data';
const CHANGE_EVENT = 'ukhub:activities/change';

const DEFAULT_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'Workshop Leadership & Management',
    date: '2024-03-15',
    time: '09:00',
    status: 'upcoming',
    location: 'Aula Utama, Gedung A',
    organization: 'BEM',
    type: 'workshop',
    description: 'Workshop untuk meningkatkan kemampuan kepemimpinan dan manajemen organisasi',
    registrationRequired: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'act-2',
    title: 'Seminar Kewirausahaan Mahasiswa',
    date: '2024-03-20',
    time: '14:00',
    status: 'upcoming',
    location: 'Ruang Seminar, Gedung B',
    organization: 'Kemahasiswaan',
    type: 'seminar',
    description: 'Seminar tentang kewirausahaan untuk mahasiswa dengan pembicara dari industri',
    registrationRequired: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'act-3',
    title: 'Open Recruitment Anggota Baru',
    date: '2024-03-25',
    time: '10:00',
    status: 'upcoming',
    location: 'Gedung Kemahasiswaan',
    organization: 'BEM',
    type: 'recruitment',
    description: 'Open recruitment untuk anggota baru periode 2024',
    registrationRequired: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'act-4',
    title: 'Rapat Koordinasi Organisasi',
    date: '2024-03-12',
    time: '13:00',
    status: 'ongoing',
    location: 'GK3-204',
    organization: 'Semua Organisasi',
    type: 'meeting',
    description: 'Rapat koordinasi antar organisasi kemahasiswaan',
    registrationRequired: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'act-5',
    title: 'Festival Seni Mahasiswa',
    date: '2024-03-05',
    time: '18:00',
    status: 'completed',
    location: 'Aula Utama',
    organization: 'UKM Seni',
    type: 'event',
    description: 'Festival seni mahasiswa dengan berbagai pertunjukan',
    registrationRequired: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'act-6',
    title: 'Pelatihan Manajemen Keuangan',
    date: '2024-03-28',
    time: '09:00',
    status: 'upcoming',
    location: 'GK3-301',
    organization: 'Kemahasiswaan',
    type: 'workshop',
    description: 'Pelatihan manajemen keuangan untuk pengurus organisasi',
    registrationRequired: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

const getStorage = () => (typeof window !== 'undefined' ? window.localStorage : null);

const cloneActivity = (activity) => ({ ...activity });

const dispatchChange = (activities) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, {
      detail: activities.map(cloneActivity),
    })
  );
};

const seedActivities = () =>
  DEFAULT_ACTIVITIES.map((act) => ({
    ...cloneActivity(act),
    id: act.id || uuidv4(),
    createdAt: act.createdAt || new Date().toISOString(),
    updatedAt: act.updatedAt || new Date().toISOString(),
  }));

const readActivities = () => {
  const storage = getStorage();
  if (!storage) {
    return seedActivities();
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedActivities();
    persistActivities(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid activities format');
    // Merge with default activities
    const defaultIds = new Set(DEFAULT_ACTIVITIES.map((a) => a.id));
    const existingIds = new Set(parsed.map((a) => a.id));
    const missingDefaults = DEFAULT_ACTIVITIES.filter((a) => !existingIds.has(a.id));
    return [...parsed, ...missingDefaults].map(cloneActivity);
  } catch {
    const seeded = seedActivities();
    persistActivities(seeded);
    return seeded;
  }
};

const persistActivities = (activities) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(activities));
  dispatchChange(activities);
};

const ensureCanMutate = (role) => {
  const normalized = (role || '').toLowerCase();
  if (!['admin', 'dosen'].includes(normalized)) {
    throw new Error('Unauthorized: admin or dosen role required');
  }
};

const normalizeStatus = (value) => {
  if (!value) return ACTIVITY_STATUS.UPCOMING;
  const normalized = Object.values(ACTIVITY_STATUS).find(
    (status) => status.toLowerCase() === String(value).toLowerCase()
  );
  return normalized || value;
};

// Standard service functions
export const getAll = async () => readActivities().map(cloneActivity);

export const getById = async (id) => {
  const activities = readActivities();
  const activity = activities.find((a) => a.id === id);
  if (!activity) {
    throw new Error('Activity not found');
  }
  return cloneActivity(activity);
};

export const add = async (activity, userRole) => {
  ensureCanMutate(userRole);
  const activities = readActivities();
  const now = new Date().toISOString();
  const newActivity = {
    id: uuidv4(),
    title: (activity.title || '').trim(),
    date: activity.date || new Date().toISOString().split('T')[0],
    time: (activity.time || '09:00').trim(),
    status: normalizeStatus(activity.status),
    location: (activity.location || '').trim(),
    organization: (activity.organization || '').trim(),
    type: (activity.type || 'event').trim(),
    description: (activity.description || '').trim(),
    registrationRequired: Boolean(activity.registrationRequired),
    createdAt: now,
    updatedAt: now,
  };

  if (!newActivity.title) {
    throw new Error('Activity title is required');
  }

  activities.push(newActivity);
  persistActivities(activities);
  return cloneActivity(newActivity);
};

export const update = async (id, updates, userRole) => {
  ensureCanMutate(userRole);
  const activities = readActivities();
  const index = activities.findIndex((a) => a.id === id);
  if (index === -1) {
    throw new Error('Activity not found');
  }

  const updated = {
    ...activities[index],
    ...updates,
    id: activities[index].id, // Preserve ID
    status: updates.status ? normalizeStatus(updates.status) : activities[index].status,
    updatedAt: new Date().toISOString(),
  };

  activities[index] = updated;
  persistActivities(activities);
  return cloneActivity(updated);
};

export const remove = async (id, userRole) => {
  ensureCanMutate(userRole);
  const activities = readActivities();
  const filtered = activities.filter((a) => a.id !== id);
  if (filtered.length === activities.length) {
    throw new Error('Activity not found');
  }
  persistActivities(filtered);
};

export const subscribeToActivityChanges = (callback) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const changeHandler = (event) => {
    if (Array.isArray(event.detail)) {
      callback(event.detail);
    } else {
      callback(readActivities().map(cloneActivity));
    }
  };

  const storageHandler = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(
        event.newValue ? JSON.parse(event.newValue).map(cloneActivity) : []
      );
    }
  };

  window.addEventListener(CHANGE_EVENT, changeHandler);
  window.addEventListener('storage', storageHandler);

  return () => {
    window.removeEventListener(CHANGE_EVENT, changeHandler);
    window.removeEventListener('storage', storageHandler);
  };
};

// Legacy function names for backward compatibility
export const fetchActivities = getAll;
export const createActivity = add;
export const updateActivity = update;
export const deleteActivity = remove;