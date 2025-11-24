import { v4 as uuidv4 } from 'uuid';

// Key for localStorage
const STORAGE_KEY = 'rooms_data';

// Helper to get stored rooms or default empty array
const getStoredRooms = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save rooms array to localStorage
const saveRooms = (rooms) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};

export const fetchRooms = async () => {
  return new Promise((resolve) => {
    const rooms = getStoredRooms();
    resolve(rooms);
  });
};

export const createRoom = async (room, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot create room'));
      return;
    }
    const rooms = getStoredRooms();
    const newRoom = { ...room, id: uuidv4() };
    rooms.push(newRoom);
    saveRooms(rooms);
    resolve(newRoom);
  });
};

export const updateRoom = async (id, updatedRoom, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot update room'));
      return;
    }
    let rooms = getStoredRooms();
    const index = rooms.findIndex((room) => room.id === id);
    if (index === -1) {
      reject(new Error('Room not found'));
      return;
    }
    rooms[index] = { ...rooms[index], ...updatedRoom };
    saveRooms(rooms);
    resolve(rooms[index]);
  });
};

export const deleteRoom = async (id, userRole) => {
  return new Promise((resolve, reject) => {
    if (userRole !== 'admin' && userRole !== 'dosen') {
      reject(new Error('Unauthorized: Cannot delete room'));
      return;
    }
    let rooms = getStoredRooms();
    rooms = rooms.filter((room) => room.id !== id);
    saveRooms(rooms);
    resolve();
  });
};
