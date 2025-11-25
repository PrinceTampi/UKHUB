import { v4 as uuidv4 } from 'uuid';
import { ORGANIZATION_CATEGORIES, USER_ROLES } from '../utils/constants';

const STORAGE_KEY = 'organizations_data';
const CHANGE_EVENT = 'ukhub:organizations/change';
const MUTATION_ROLES = new Set([USER_ROLES.ADMIN]);

const DEFAULT_ORGANIZATIONS = [
  {
    id: 'org-bem',
    name: 'Badan Eksekutif Mahasiswa',
    abbreviation: 'BEM',
    category: 'Ormawa',
    description:
      'Organisasi mahasiswa tingkat universitas yang mengeksekusi program kerja strategis kampus.',
    status: 'active',
    pembina: 'Dr. Ahmad Hidayat, M.Pd.',
    contact: { email: 'bem@universitas.ac.id', phone: '+62 811-1234-111' },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'org-dpm',
    name: 'Dewan Perwakilan Mahasiswa',
    abbreviation: 'DPM',
    category: 'Ormawa',
    description:
      'Lembaga legislatif mahasiswa yang mengawasi dan mengevaluasi program kerja organisasi eksekutif.',
    status: 'active',
    pembina: 'Prof. Dr. Siti Nurhaliza',
    contact: { email: 'dpm@universitas.ac.id', phone: '+62 811-1234-222' },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'org-himti',
    name: 'Himpunan Mahasiswa Teknik Informatika',
    abbreviation: 'HIMTI',
    category: 'Himpunan',
    description:
      'Organisasi mahasiswa jurusan Teknik Informatika dengan fokus pengembangan akademik dan non-akademik.',
    status: 'active',
    pembina: 'Dr. Budi Santoso, M.Kom.',
    contact: { email: 'himti@universitas.ac.id', phone: '+62 811-1234-333' },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'org-himsi',
    name: 'Himpunan Mahasiswa Sistem Informasi',
    abbreviation: 'HIMSI',
    category: 'Himpunan',
    description:
      'Wadah mahasiswa Sistem Informasi untuk kolaborasi riset dan inovasi digital.',
    status: 'active',
    pembina: 'Dr. Siti Aisyah, M.Kom.',
    contact: { email: 'himsi@universitas.ac.id', phone: '+62 811-1234-444' },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'org-ukm-seni',
    name: 'UKM Seni',
    abbreviation: 'UKM SENI',
    category: 'UKM',
    description:
      'Unit kegiatan mahasiswa yang menaungi seni musik, tari, dan teater kampus.',
    status: 'active',
    pembina: 'Dr. Ani Lestari, M.Sn.',
    contact: { email: 'ukm.seni@universitas.ac.id', phone: '+62 811-1234-555' },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'org-ukm-olahraga',
    name: 'UKM Olahraga',
    abbreviation: 'UKM OR',
    category: 'UKM',
    description:
      'Unit kegiatan mahasiswa bidang olahraga yang memfasilitasi cabang kompetitif dan rekreatif.',
    status: 'active',
    pembina: 'Dr. Joko Widodo, M.Pd.',
    contact: { email: 'ukm.olahraga@universitas.ac.id', phone: '+62 811-1234-666' },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

const getStorage = () =>
  typeof window !== 'undefined' ? window.localStorage : null;

const cloneOrganization = (org) => ({
  ...org,
  contact: {
    email: org.contact?.email || '',
    phone: org.contact?.phone || '',
  },
});

const seedOrganizations = () =>
  DEFAULT_ORGANIZATIONS.map((org) => ({
    ...cloneOrganization(org),
    id: org.id || uuidv4(),
    createdAt: org.createdAt || new Date().toISOString(),
    updatedAt: org.updatedAt || new Date().toISOString(),
  }));

const dispatchChange = (payload) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, { detail: payload.map(cloneOrganization) })
  );
};

const persistOrganizations = (organizations) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(organizations));
  dispatchChange(organizations);
};

const readOrganizations = () => {
  const storage = getStorage();
  if (!storage) {
    return seedOrganizations();
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedOrganizations();
    persistOrganizations(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid organizations format');
    return parsed.map(cloneOrganization);
  } catch {
    const seeded = seedOrganizations();
    persistOrganizations(seeded);
    return seeded;
  }
};

const ensureCanMutate = (role) => {
  const normalized = (role || '').toLowerCase();
  if (!MUTATION_ROLES.has(normalized)) {
    throw new Error('Unauthorized: admin role required');
  }
};

const normalizeCategory = (value) => {
  if (!value) return ORGANIZATION_CATEGORIES[0];
  const normalized = ORGANIZATION_CATEGORIES.find(
    (cat) => cat.toLowerCase() === String(value).toLowerCase()
  );
  return normalized || value;
};

const normalizeOrganizationPayload = (payload = {}, current = null) => {
  const now = new Date().toISOString();
  const base = current ?? {};

  const next = {
    id: base.id ?? payload.id ?? uuidv4(),
    name: (payload.name ?? base.name ?? '').trim(),
    abbreviation: (payload.abbreviation ?? base.abbreviation ?? '').trim(),
    category: normalizeCategory(payload.category ?? base.category),
    description: (payload.description ?? base.description ?? '').trim(),
    status:
      (payload.status ?? base.status ?? 'active').toLowerCase() === 'inactive'
        ? 'inactive'
        : 'active',
    pembina: (payload.pembina ?? base.pembina ?? '').trim(),
    contact: {
      email: (payload.contact?.email ?? base.contact?.email ?? '').trim(),
      phone: (payload.contact?.phone ?? base.contact?.phone ?? '').trim(),
    },
    createdAt: base.createdAt ?? payload.createdAt ?? now,
    updatedAt: now,
  };

  if (!next.name) {
    throw new Error('Organization name is required');
  }

  return next;
};

// Standard service functions
export const getAll = async () => {
  return readOrganizations().map(cloneOrganization);
};

export const getById = async (id) => {
  const organizations = readOrganizations();
  const organization = organizations.find((org) => org.id === id);
  if (!organization) {
    throw new Error('Organization not found');
  }
  return cloneOrganization(organization);
};

export const add = async (organization, role) => {
  ensureCanMutate(role);
  const organizations = readOrganizations();
  const next = normalizeOrganizationPayload(organization);
  if (!next.createdAt) next.createdAt = next.updatedAt;
  organizations.push(next);
  persistOrganizations(organizations);
  return cloneOrganization(next);
};

export const update = async (id, updates, role) => {
  ensureCanMutate(role);
  const organizations = readOrganizations();
  const index = organizations.findIndex((org) => org.id === id);
  if (index === -1) {
    throw new Error('Organization not found');
  }
  const updated = normalizeOrganizationPayload(updates, organizations[index]);
  organizations[index] = updated;
  persistOrganizations(organizations);
  return cloneOrganization(updated);
};

export const remove = async (id, role) => {
  ensureCanMutate(role);
  const organizations = readOrganizations();
  const filtered = organizations.filter((org) => org.id !== id);
  if (filtered.length === organizations.length) {
    throw new Error('Organization not found');
  }
  persistOrganizations(filtered);
};

// Legacy function names for backward compatibility
export const fetchOrganizations = getAll;
export const createOrganization = add;
export const updateOrganization = update;
export const deleteOrganization = remove;

export const fetchOrganizationCategories = async () => {
  const organizations = readOrganizations();
  const customCategories = organizations
    .map((org) => org.category)
    .filter(Boolean);
  return Array.from(new Set([...ORGANIZATION_CATEGORIES, ...customCategories]));
};

export const resetOrganizations = async (role) => {
  ensureCanMutate(role);
  const snapshot = seedOrganizations();
  persistOrganizations(snapshot);
  return snapshot.map(cloneOrganization);
};

export const subscribeToOrganizationChanges = (callback) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const changeHandler = (event) => {
    if (Array.isArray(event.detail)) {
      callback(event.detail);
    } else {
      callback(readOrganizations().map(cloneOrganization));
    }
  };

  const storageHandler = (event) => {
    if (event.key === STORAGE_KEY) {
      callback(
        event.newValue ? JSON.parse(event.newValue).map(cloneOrganization) : []
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