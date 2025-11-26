import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'rooms_data';
const CHANGE_EVENT = 'ukhub:rooms/change';

const DEFAULT_ROOMS = [
  {
    id: 'room-1',
    name: 'GK3-204',
    building: 'Gedung Kemahasiswaan',
    location: 'Lantai 2',
    facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi', 'Sound System'],
    accessHours: '08:00 - 17:00',
    capacity: 30,
    organization: 'BEM',
    status: 'available',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'room-2',
    name: 'GK3-205',
    building: 'Gedung Kemahasiswaan',
    location: 'Lantai 2',
    facilities: ['AC', 'Proyektor', 'WiFi'],
    accessHours: '08:00 - 17:00',
    capacity: 20,
    organization: 'DPM',
    status: 'available',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'room-3',
    name: 'GK3-301',
    building: 'Gedung Kemahasiswaan',
    location: 'Lantai 3',
    facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi', 'Sound System', 'Panggung'],
    accessHours: '08:00 - 20:00',
    capacity: 100,
    organization: 'UKM Seni',
    status: 'occupied',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'room-4',
    name: 'GK3-102',
    building: 'Gedung Kemahasiswaan',
    location: 'Lantai 1',
    facilities: ['AC', 'WiFi'],
    accessHours: '08:00 - 17:00',
    capacity: 15,
    organization: 'HIMTI',
    status: 'available',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'room-5',
    name: 'GK3-103',
    building: 'Gedung Kemahasiswaan',
    location: 'Lantai 1',
    facilities: ['AC', 'Proyektor', 'WiFi'],
    accessHours: '08:00 - 17:00',
    capacity: 25,
    organization: 'HIMSI',
    status: 'maintenance',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'room-6',
    name: 'Aula Utama',
    building: 'Gedung A',
    location: 'Lantai 1',
    facilities: ['AC', 'Proyektor', 'Whiteboard', 'WiFi', 'Sound System', 'Panggung', 'Layar Besar'],
    accessHours: '08:00 - 22:00',
    capacity: 200,
    organization: 'Semua Organisasi',
    status: 'available',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

const getStorage = () => (typeof window !== 'undefined' ? window.localStorage : null);

const cloneRoom = (room) => ({
  ...room,
  facilities: Array.isArray(room.facilities) ? [...room.facilities] : [],
});

const dispatchChange = (rooms) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, {
      detail: rooms.map(cloneRoom),
    })
  );
};

const seedRooms = () =>
  DEFAULT_ROOMS.map((room) => ({
    ...cloneRoom(room),
    id: room.id || uuidv4(),
    createdAt: room.createdAt || new Date().toISOString(),
    updatedAt: room.updatedAt || new Date().toISOString(),
  }));

const readRooms = () => {
  const storage = getStorage();
  if (!storage) {
    return seedRooms();
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedRooms();
    persistRooms(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid rooms format');
    // Merge with default rooms if localStorage is empty or has fewer items
    const defaultIds = new Set(DEFAULT_ROOMS.map((r) => r.id));
    const existingIds = new Set(parsed.map((r) => r.id));
    const missingDefaults = DEFAULT_ROOMS.filter((r) => !existingIds.has(r.id));
    return [...parsed, ...missingDefaults].map(cloneRoom);
  } catch {
    const seeded = seedRooms();
    persistRooms(seeded);
    return seeded;
  }
};

const persistRooms = (rooms) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  dispatchChange(rooms);
};

const ensureCanMutate = (role) => {
  const normalized = (role || '').toLowerCase();
  if (!['admin', 'dosen'].includes(normalized)) {
    throw new Error('Unauthorized: admin or dosen role required');
  }
};

// Standard service functions
export const getAll = async () => readRooms().map(cloneRoom);

export const getById = async (id) => {
  const rooms = readRooms();
  const room = rooms.find((r) => r.id === id);
  if (!room) {
    throw new Error('Room not found');
  }
  return cloneRoom(room);
};

export const add = async (room, userRole) => {
  ensureCanMutate(userRole);
  const rooms = readRooms();
  const now = new Date().toISOString();
  const newRoom = {
    id: uuidv4(),
    name: (room.name || '').trim(),
    building: (room.building || '').trim(),
    location: (room.location || '').trim(),
    facilities: Array.isArray(room.facilities) ? room.facilities : [],
    accessHours: (room.accessHours || '08:00 - 17:00').trim(),
    capacity: parseInt(room.capacity) || 0,
    organization: (room.organization || '').trim(),
    status: room.status || 'available',
    createdAt: now,
    updatedAt: now,
  };

  if (!newRoom.name) {
    throw new Error('Room name is required');
  }

  rooms.push(newRoom);
  persistRooms(rooms);
  return cloneRoom(newRoom);
};

export const update = async (id, updates, userRole) => {
  ensureCanMutate(userRole);
  const rooms = readRooms();
  const index = rooms.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error('Room not found');
  }

  const updated = {
    ...rooms[index],
    ...updates,
    id: rooms[index].id, // Preserve ID
    updatedAt: new Date().toISOString(),
  };

  rooms[index] = updated;
  persistRooms(rooms);
  return cloneRoom(updated);
};

export const remove = async (id, userRole) => {
  ensureCanMutate(userRole);
  const rooms = readRooms();
  const filtered = rooms.filter((r) => r.id !== id);
  if (filtered.length === rooms.length) {
    throw new Error('Room not found');
  }
  persistRooms(filtered);
};

export const subscribeToRoomChanges = (callback) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const changeHandler = (event) => {
    if (Array.isArray(event.detail)) {
      callback(event.detail);
    } else {
      callback(readRooms().map(cloneRoom));
    }
  };

  const storageHandler = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(
        event.newValue ? JSON.parse(event.newValue).map(cloneRoom) : []
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
export const fetchRooms = getAll;
export const createRoom = add;
export const updateRoom = update;
export const deleteRoom = remove;