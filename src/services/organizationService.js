import { v4 as uuidv4 } from 'uuid';

// Key for localStorage
const STORAGE_KEY = 'organizations_data';

// Helper to get stored organizations or default empty array
const getStoredOrganizations = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save organizations array to localStorage
const saveOrganizations = (organizations) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(organizations));
};

export const fetchOrganizations = async () => {
  // Simulate async call with Promise
  return new Promise((resolve) => {
    const organizations = getStoredOrganizations();
    resolve(organizations);
  });
};

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
