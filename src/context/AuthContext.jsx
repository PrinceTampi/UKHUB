import { createContext, useContext, useState, useEffect } from 'react';
  import { USER_ROLES } from '../utils/constants';

  const AuthContext = createContext(null);

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check for saved user in localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    }, []);

    const login = (userData) => {
      // Ensure role always exists and is one of our known roles, default to USER
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
      localStorage.setItem('user', JSON.stringify(userWithRole));
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
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