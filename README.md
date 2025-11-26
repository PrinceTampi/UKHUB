# UKHUB - Universitas Hub

Portal Informasi Organisasi Kemahasiswaan yang profesional dan modern, dibangun dengan React + Vite + TailwindCSS.

## 🚀 Fitur Utama

### 1. Layout & Reusable UI Components
- **Header/Navbar** - Navigasi lengkap dengan search bar global, profile dropdown, dan theme toggle
- **Footer** - Informasi kontak WR3, Kemahasiswaan, dan copyright
- **Sidebar** - Navigasi khusus Admin (Organization, Rooms, Announcements, Activities, Contacts)
- **Card Components** - Specialized cards untuk:
  - Organization Card
  - Room Card
  - Announcement Card
  - Activity Card
- **SearchBar** - Advanced search dengan filter dan search type selector

### 2. Contact Directory
- Menampilkan kontak WR3 dan Kemahasiswaan
- Daftar ketua organisasi dengan informasi lengkap
- Search functionality untuk mencari kontak
- Tampilan card yang profesional dan responsif

### 3. Organization Public Page
- Profil organisasi lengkap (read-only)
- Tab navigation untuk:
  - Overview (Visi, Misi, Kontak, Social Media)
  - Activities (Kegiatan organisasi)
  - Rooms (Ruangan organisasi)
  - Structure (Struktur kepengurusan)
- Informasi kegiatan dan jadwal ruangan
- Link sosial media organisasi

### 4. Styling & UI/UX
- **TailwindCSS** untuk styling modern
- **Dark/Light Mode** toggle
- **Responsive Design** - Mobile hingga Desktop
- **Smooth Animations** - Hover effects, transitions
- **Consistent Theme** - Warna dan spacing yang konsisten

## 📁 Struktur Project

```
src/
├── components/          # Reusable components
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── SearchBar.jsx
│       ├── Skeleton.jsx
│       ├── OrganizationCard.jsx
│       ├── RoomCard.jsx
│       ├── AnnouncementCard.jsx
│       └── ActivityCard.jsx
├── layouts/            # Layout components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Sidebar.jsx
│   └── MainLayout.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Contact.jsx
│   └── OrganizationPublic.jsx
├── context/            # Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── utils/              # Helper functions
│   ├── constants.js
│   └── helpers.js
└── assets/             # Images, icons
```

## 🛠️ Tech Stack

- **React 19.2.0** - UI Library
- **Vite 7.2.2** - Build Tool
- **TailwindCSS 4.1.17** - Styling
- **React Router DOM 6.28.0** - Routing
- **PropTypes** - Type checking

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Features Detail

### Header/Navbar
- Logo dengan gradient effect
- Navigation menu (Home, Organizations, Rooms, Announcements, Activities, Contact)
- Global search bar
- Theme toggle (Light/Dark mode)
- User profile dropdown
- Mobile responsive dengan hamburger menu

### Footer
- Informasi kontak WR3
- Informasi kontak Kemahasiswaan
- Quick links
- Copyright information

### Sidebar (Admin Only)
- Hanya muncul untuk user dengan role `admin`
- Navigasi ke:
  - Organization
  - Rooms
  - Announcements
  - Activities
  - Contacts
- Collapsible di mobile view

### Card Components

#### OrganizationCard
- Logo/abbreviation display
- Nama dan kategori organisasi
- Status (Aktif/Nonaktif)
- Deskripsi
- Informasi pembina dan kontak

#### RoomCard
- Nama ruangan dan gedung
- Status (Tersedia/Terpakai/Maintenance)
- Kapasitas
- Jam akses
- Fasilitas ruangan

#### AnnouncementCard
- Judul dan kategori
- Urgent badge
- Tanggal dan author
- Excerpt/ringkasan

#### ActivityCard
- Judul kegiatan
- Status (Akan Datang/Berlangsung/Selesai)
- Tipe kegiatan (Recruitment, Seminar, Meeting, Event, Workshop)
- Tanggal, waktu, dan lokasi
- Registration required badge

### SearchBar
- Search input dengan icon
- Filter dropdown
- Search type selector (optional)
- Clear button
- Debounced search
- Focus states

### Contact Directory
- Card layout untuk WR3 dan Kemahasiswaan
- Grid layout untuk ketua organisasi
- Search functionality
- Clickable email dan phone links
- Responsive design

### Organization Public Page
- Hero section dengan gradient background
- Tab navigation:
  - **Overview**: Visi, Misi, Kontak, Social Media
  - **Activities**: Daftar kegiatan organisasi
  - **Rooms**: Informasi ruangan organisasi
  - **Structure**: Struktur kepengurusan
- Social media links dengan icons
- Professional layout

## 🔐 Authentication & Roles

### User Roles
- **Admin** - Akses penuh termasuk sidebar
- **User** - Akses terbatas (view only)
- **Guest** - Akses publik

### Testing as Admin
```javascript
// In browser console
localStorage.setItem('user', JSON.stringify({ 
  name: 'Admin', 
  email: 'admin@universitas.ac.id', 
  role: 'admin' 
}));
// Refresh page
```

## 🎯 Routes

- `/` - Home page
- `/contact` - Contact Directory
- `/organizations` - Organizations list
- `/organizations/:id` - Organization Public Page
- `/rooms` - Rooms list
- `/announcements` - Announcements list
- `/activities` - Activities list

## 🌙 Dark Mode

Dark mode tersedia dengan toggle di header. Theme preference disimpan di localStorage.

## 📱 Responsive Design

- **Mobile** (< 640px) - Single column, collapsible menu
- **Tablet** (640px - 1024px) - 2 columns grid
- **Desktop** (> 1024px) - Full layout dengan sidebar

## 🧩 Component Usage Examples

### OrganizationCard
```jsx
import OrganizationCard from './components/ui/OrganizationCard';

<OrganizationCard
  organization={{
    id: 1,
    name: 'BEM',
    abbreviation: 'BEM',
    category: 'Ormawa',
    status: 'active',
    description: 'Description here',
  }}
  onClick={() => console.log('Clicked')}
/>
```

### SearchBar
```jsx
import SearchBar from './components/ui/SearchBar';

<SearchBar
  placeholder="Search..."
  onSearch={(value) => console.log(value)}
  filters={[
    { value: 'ormawa', label: 'Ormawa' },
    { value: 'ukm', label: 'UKM' },
  ]}
/>
```

## 📝 Code Style

- Functional components dengan hooks
- PropTypes untuk type checking
- Consistent naming conventions
- Modular and reusable components
- Clear comments untuk complex logic

## 🚀 Deployment

```bash
# Build
npm run build

# Output will be in dist/
```

## 📄 License

This project is part of UKHUB - Universitas Hub.

## 👥 Contributors

- **Ralff** - Frontend Development (UI Components, Contact Page, Public Page)
**Evangjelika** — Frontend Development (Tampilan UI)
## 📚 Documentation

Lihat `.github/workflows/feature-branch-workflow.md` untuk informasi tentang GitHub workflow dan branch strategy.

---


**Dibuat dengan ❤️ menggunakan React + Vite + TailwindCSS**
