import { v4 as uuidv4 } from 'uuid';
import { CONTACT_INFO } from '../utils/constants';

const STORAGE_KEY = 'contacts_data';
const CHANGE_EVENT = 'ukhub:contacts/change';

const DEFAULT_CONTACTS = [
  {
    id: 'contact-wr3',
    type: 'official',
    name: CONTACT_INFO.WR3.name,
    abbreviation: 'WR',
    position: 'Wakil Rektor Bidang Kemahasiswaan',
    email: CONTACT_INFO.WR3.email,
    phone: CONTACT_INFO.WR3.phone,
    address: CONTACT_INFO.WR3.address,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'contact-kemahasiswaan',
    type: 'official',
    name: CONTACT_INFO.KEMAHASISWAAN.name,
    abbreviation: 'KM',
    position: 'Divisi Kemahasiswaan',
    email: CONTACT_INFO.KEMAHASISWAAN.email,
    phone: CONTACT_INFO.KEMAHASISWAAN.phone,
    address: CONTACT_INFO.KEMAHASISWAAN.address,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'contact-leader-1',
    type: 'leader',
    name: 'Ketua BEM',
    email: 'ketua.bem@universitas.ac.id',
    phone: '+62 123 456 7892',
    organization: 'BEM',
    position: 'Ketua Umum',
    photo: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'contact-leader-2',
    type: 'leader',
    name: 'Ketua DPM',
    email: 'ketua.dpm@universitas.ac.id',
    phone: '+62 123 456 7893',
    organization: 'DPM',
    position: 'Ketua Umum',
    photo: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'contact-leader-3',
    type: 'leader',
    name: 'Ketua HIMTI',
    email: 'ketua.himti@universitas.ac.id',
    phone: '+62 123 456 7894',
    organization: 'HIMTI',
    position: 'Ketua',
    photo: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'contact-leader-4',
    type: 'leader',
    name: 'Ketua HIMSI',
    email: 'ketua.himsi@universitas.ac.id',
    phone: '+62 123 456 7895',
    organization: 'HIMSI',
    position: 'Ketua',
    photo: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

const getStorage = () => (typeof window !== 'undefined' ? window.localStorage : null);

const cloneContact = (contact) => ({ ...contact });

const dispatchChange = (contacts) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, {
      detail: contacts.map(cloneContact),
    })
  );
};

const seedContacts = () =>
  DEFAULT_CONTACTS.map((contact) => ({
    ...cloneContact(contact),
    id: contact.id || uuidv4(),
    createdAt: contact.createdAt || new Date().toISOString(),
    updatedAt: contact.updatedAt || new Date().toISOString(),
  }));

const readContacts = () => {
  const storage = getStorage();
  if (!storage) {
    return seedContacts();
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedContacts();
    persistContacts(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid contacts format');
    // Merge with default contacts
    const defaultIds = new Set(DEFAULT_CONTACTS.map((c) => c.id));
    const existingIds = new Set(parsed.map((c) => c.id));
    const missingDefaults = DEFAULT_CONTACTS.filter((c) => !existingIds.has(c.id));
    return [...parsed, ...missingDefaults].map(cloneContact);
  } catch {
    const seeded = seedContacts();
    persistContacts(seeded);
    return seeded;
  }
};

const persistContacts = (contacts) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  dispatchChange(contacts);
};

const ensureCanMutate = (role) => {
  const normalized = (role || '').toLowerCase();
  if (!['admin', 'dosen'].includes(normalized)) {
    throw new Error('Unauthorized: admin or dosen role required');
  }
};

// Standard service functions
export const getAll = async () => readContacts().map(cloneContact);

export const getById = async (id) => {
  const contacts = readContacts();
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return cloneContact(contact);
};

export const add = async (contact, userRole) => {
  ensureCanMutate(userRole);
  const contacts = readContacts();
  const now = new Date().toISOString();
  const newContact = {
    id: uuidv4(),
    type: contact.type || 'leader',
    name: (contact.name || '').trim(),
    abbreviation: (contact.abbreviation || contact.name?.substring(0, 2).toUpperCase() || '').trim(),
    position: (contact.position || '').trim(),
    email: (contact.email || '').trim(),
    phone: (contact.phone || '').trim(),
    address: (contact.address || '').trim(),
    organization: (contact.organization || '').trim(),
    photo: contact.photo || null,
    createdAt: now,
    updatedAt: now,
  };

  if (!newContact.name || !newContact.email) {
    throw new Error('Contact name and email are required');
  }

  contacts.push(newContact);
  persistContacts(contacts);
  return cloneContact(newContact);
};

export const update = async (id, updates, userRole) => {
  ensureCanMutate(userRole);
  const contacts = readContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error('Contact not found');
  }

  const updated = {
    ...contacts[index],
    ...updates,
    id: contacts[index].id, // Preserve ID
    updatedAt: new Date().toISOString(),
  };

  contacts[index] = updated;
  persistContacts(contacts);
  return cloneContact(updated);
};

export const remove = async (id, userRole) => {
  ensureCanMutate(userRole);
  const contacts = readContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) {
    throw new Error('Contact not found');
  }
  persistContacts(filtered);
};

export const subscribeToContactChanges = (callback) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const changeHandler = (event) => {
    if (Array.isArray(event.detail)) {
      callback(event.detail);
    } else {
      callback(readContacts().map(cloneContact));
    }
  };

  const storageHandler = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(
        event.newValue ? JSON.parse(event.newValue).map(cloneContact) : []
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
export const fetchContacts = getAll;
export const createContact = add;
export const updateContact = update;
export const deleteContact = remove;