export const fetchUsers = async () => {
  try {
    const response = await fetch('/data/users.json');
    if (!response.ok) {
      throw new Error('Failed to fetch users data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
