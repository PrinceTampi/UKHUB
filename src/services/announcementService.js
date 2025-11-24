import { v4 as uuidv4 } from 'uuid';

// Key for localStorage
const STORAGE_KEY = 'announcements_data';

// Helper to get stored announcements or default empty array
const getStoredAnnouncements = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save announcements array to localStorage
const saveAnnouncements = (announcements) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
};

export const fetchAnnouncements = async () => {
  return new Promise((resolve) => {
    const announcements = getStoredAnnouncements();
    resolve(announcements);
  });
};

export const createAnnouncement = async (announcement, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot create announcement'));
      return;
    }
    const announcements = getStoredAnnouncements();
    const newAnnouncement = { ...announcement, id: uuidv4() };
    announcements.push(newAnnouncement);
    saveAnnouncements(announcements);
    resolve(newAnnouncement);
  });
};

export const updateAnnouncement = async (id, updatedAnnouncement, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot update announcement'));
      return;
    }
    let announcements = getStoredAnnouncements();
    const index = announcements.findIndex((ann) => ann.id === id);
    if (index === -1) {
      reject(new Error('Announcement not found'));
      return;
    }
    announcements[index] = { ...announcements[index], ...updatedAnnouncement };
    saveAnnouncements(announcements);
    resolve(announcements[index]);
  });
};

export const deleteAnnouncement = async (id, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot delete announcement'));
      return;
    }
    let announcements = getStoredAnnouncements();
    announcements = announcements.filter((ann) => ann.id !== id);
    saveAnnouncements(announcements);
    resolve();
  });
};
