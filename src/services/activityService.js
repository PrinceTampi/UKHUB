import { v4 as uuidv4 } from 'uuid';

// Key for localStorage
const STORAGE_KEY = 'activities_data';

// Helper to get stored activities or default empty array
const getStoredActivities = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save activities array to localStorage
const saveActivities = (activities) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
};

export const fetchActivities = async () => {
  return new Promise((resolve) => {
    const activities = getStoredActivities();
    resolve(activities);
  });
};

export const createActivity = async (activity, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot create activity'));
      return;
    }
    const activities = getStoredActivities();
    const newActivity = { ...activity, id: uuidv4() };
    activities.push(newActivity);
    saveActivities(activities);
    resolve(newActivity);
  });
};

export const updateActivity = async (id, updatedActivity, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot update activity'));
      return;
    }
    let activities = getStoredActivities();
    const index = activities.findIndex((act) => act.id === id);
    if (index === -1) {
      reject(new Error('Activity not found'));
      return;
    }
    activities[index] = { ...activities[index], ...updatedActivity };
    saveActivities(activities);
    resolve(activities[index]);
  });
};

export const deleteActivity = async (id, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot delete activity'));
      return;
    }
    let activities = getStoredActivities();
    activities = activities.filter((act) => act.id !== id);
    saveActivities(activities);
    resolve();
  });
};
