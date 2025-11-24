import { v4 as uuidv4 } from 'uuid';

// Key for localStorage
const STORAGE_KEY = 'organizations_data';

// Retrieve organizations array from localStorage or return empty array
const getStoredOrganizations = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    return [];
  }
  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Failed to parse stored organizations data:', error);
    return [];
  }
};

// Save organizations array to localStorage
const saveOrganizations = (organizations) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(organizations));
};

// Create a new organization if authorized
export const createOrganization = async (organization, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot create organization'));
      return;
    }
    const organizations = getStoredOrganizations();
    const newOrg = { ...organization, id: uuidv4() };
    organizations.push(newOrg);
    saveOrganizations(organizations);
    resolve(newOrg);
  });
};

// Update organization by id if authorized
export const updateOrganization = async (id, updatedOrg, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot update organization'));
      return;
    }
    let organizations = getStoredOrganizations();
    const index = organizations.findIndex((org) => org.id === id);
    if (index === -1) {
      reject(new Error('Organization not found'));
      return;
    }
    organizations[index] = { ...organizations[index], ...updatedOrg };
    saveOrganizations(organizations);
    resolve(organizations[index]);
  });
};

// Delete organization by id if authorized
export const deleteOrganization = async (id, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot delete organization'));
      return;
    }
    let organizations = getStoredOrganizations();
    organizations = organizations.filter((org) => org.id !== id);
    saveOrganizations(organizations);
    resolve();
  });
};
