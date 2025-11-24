import { v4 as uuidv4 } from 'uuid';

// Key for localStorage
const STORAGE_KEY = 'contacts_data';

// Helper to get stored contacts or default empty array
const getStoredContacts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save contacts array to localStorage
const saveContacts = (contacts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const fetchContacts = async () => {
  return new Promise((resolve) => {
    const contacts = getStoredContacts();
    resolve(contacts);
  });
};

export const createContact = async (contact, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot create contact'));
      return;
    }
    const contacts = getStoredContacts();
    const newContact = { ...contact, id: uuidv4() };
    contacts.push(newContact);
    saveContacts(contacts);
    resolve(newContact);
  });
};

export const updateContact = async (id, updatedContact, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot update contact'));
      return;
    }
    let contacts = getStoredContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      reject(new Error('Contact not found'));
      return;
    }
    contacts[index] = { ...contacts[index], ...updatedContact };
    saveContacts(contacts);
    resolve(contacts[index]);
  });
};

export const deleteContact = async (id, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot delete contact'));
      return;
    }
    let contacts = getStoredContacts();
    contacts = contacts.filter((contact) => contact.id !== id);
    saveContacts(contacts);
    resolve();
  });
};
