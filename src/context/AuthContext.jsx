import { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/constants';

const AuthContext = createContext(null);

const readStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const savedUser = window.localStorage.getItem('user');
  if (!savedUser) return null;
  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error('Error parsing user data:', error);
    window.localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = readStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const normalizedRole =
      userData?.role &&
      [USER_ROLES.ADMIN, USER_ROLES.MAHASISWA, USER_ROLES.DOSEN, USER_ROLES.USER].includes(
        String(userData.role).toLowerCase()
      )
        ? String(userData.role).toLowerCase()
        : USER_ROLES.USER;

    const userWithRole = {
      ...userData,
      role: normalizedRole,
    };

    setUser(userWithRole);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('user', JSON.stringify(userWithRole));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
    }
  };

  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const isMahasiswa = user?.role === USER_ROLES.MAHASISWA;
  const isDosen = user?.role === USER_ROLES.DOSEN;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        isMahasiswa,
        isDosen,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};