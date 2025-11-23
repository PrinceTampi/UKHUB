import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Organizations from './pages/Organizations';
import Rooms from './pages/Rooms';
import Announcements from './pages/Announcements';
import Activities from './pages/Activities';
import OrganizationPublic from './pages/OrganizationPublic';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrganizations from './pages/admin/AdminOrganizations';
import AdminRooms from './pages/admin/AdminRooms';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminActivities from './pages/admin/AdminActivities';
import AdminContacts from './pages/admin/AdminContacts';
import DosenOrganizations from './pages/dosen/DosenOrganizations';
import DosenRooms from './pages/dosen/DosenRooms';
import DosenAnnouncements from './pages/dosen/DosenAnnouncements';
import DosenActivities from './pages/dosen/DosenActivities';
import DosenContacts from './pages/dosen/DosenContacts';
import DosenDashboard from './pages/dosen/DosenDashboard';
import MahasiswaOrganizations from './pages/mahasiswa/MahasiswaOrganizations';
import MahasiswaRooms from './pages/mahasiswa/MahasiswaRooms';
import MahasiswaAnnouncements from './pages/mahasiswa/MahasiswaAnnouncements';
import MahasiswaActivities from './pages/mahasiswa/MahasiswaActivities';
import MahasiswaContacts from './pages/mahasiswa/MahasiswaContacts';
import MahasiswaDashboard from './pages/mahasiswa/MahasiswaDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Component untuk routes yang memerlukan layout
const LayoutWrapper = ({ children, onGlobalSearch }) => {
  return <MainLayout onGlobalSearch={onGlobalSearch}>{children}</MainLayout>;
};

function AppRoutes() {
  const { user, isDosen, isMahasiswa } = useAuth();
  const handleGlobalSearch = (searchTerm, searchType = 'all') => {
    console.log('Global search:', searchTerm, 'Type:', searchType);
    // Implement global search logic
  };

  return (
    <Router>
      <Routes>
        {/* Login Route - No Layout */}
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" replace /> : <Login />
          } 
        />

        {/* Public Routes with Layout - Require Login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                {isMahasiswa ? <MahasiswaDashboard /> : isDosen ? <DosenDashboard /> : <Home />}
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <Contact />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/organizations"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                {isDosen ? <DosenOrganizations /> : isMahasiswa ? <MahasiswaOrganizations /> : <Organizations />}
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/organizations/:id"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <OrganizationPublic />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                {isDosen ? <DosenRooms /> : isMahasiswa ? <MahasiswaRooms /> : <Rooms />}
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                {isDosen ? <DosenAnnouncements /> : isMahasiswa ? <MahasiswaAnnouncements /> : <Announcements />}
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                {isDosen ? <DosenActivities /> : isMahasiswa ? <MahasiswaActivities /> : <Activities />}
              </LayoutWrapper>
            </PublicRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <AdminDashboard />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/organizations"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <AdminOrganizations />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <AdminRooms />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <AdminAnnouncements />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activities"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <AdminActivities />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <AdminContacts />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />

        {/* Protected Dosen Routes */}
        <Route
          path="/dosen/dashboard"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <DosenDashboard />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/dosen/organizations"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <DosenOrganizations />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/dosen/rooms"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <DosenRooms />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/dosen/announcements"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <DosenAnnouncements />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/dosen/activities"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <DosenActivities />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/dosen/contacts"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <DosenContacts />
              </LayoutWrapper>
            </PublicRoute>
          }
        />

        {/* Protected Mahasiswa Routes */}
        <Route
          path="/mahasiswa/dashboard"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <MahasiswaDashboard />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/mahasiswa/organizations"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <MahasiswaOrganizations />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/mahasiswa/rooms"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <MahasiswaRooms />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/mahasiswa/announcements"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <MahasiswaAnnouncements />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/mahasiswa/activities"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <MahasiswaActivities />
              </LayoutWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/mahasiswa/contacts"
          element={
            <PublicRoute>
              <LayoutWrapper onGlobalSearch={handleGlobalSearch}>
                <MahasiswaContacts />
              </LayoutWrapper>
            </PublicRoute>
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
