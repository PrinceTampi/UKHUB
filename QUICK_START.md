# 🚀 Quick Reference - Sistem Login Unklab

## ⚡ Quick Start (3 langkah)

```bash
npm install
npm run dev
# Buka: http://localhost:5173
```

---

## 🎯 Test Sekarang

Gunakan salah satu akun ini:

```
📧 admin@unklab.ac.id      🔑 admin123
📧 dosen@unklab.ac.id      🔑 dosen123
📧 mahasiswa@unklab.ac.id  🔑 mahasiswa123
```

Atau klik tombol "Quick Fill" di halaman login!

---

## 📂 File Penting yang Sudah Dibuat

```
✅ src/components/Login.jsx          - Halaman Login
✅ src/components/Register.jsx       - Halaman Register
✅ src/components/Dashboard.jsx      - Dashboard User
✅ src/components/PrivateRoute.jsx   - Route Protection
✅ src/context/AuthContext.jsx       - State Management
✅ src/services/authService.js       - Auth Logic
✅ src/data/users.json               - Database (JSON)
✅ src/App.jsx                       - App Routing
✅ DOKUMENTASI_LOGIN.md              - Full Documentation
✅ README_LOGIN.md                   - Quick Guide
✅ .env.example                      - Environment Template
```

---

## 🔄 Alur Aplikasi

```
1. User akses aplikasi → Redirect ke /login
2. User login → Simpan data ke localStorage
3. Akses dashboard → Protected by PrivateRoute
4. Logout → Clear localStorage → Kembali ke login
```

---

## 🎨 Styling dengan Tailwind

Semua styling sudah menggunakan Tailwind CSS classes:
- Gradients: `from-blue-600 to-indigo-600`
- Shadows: `shadow-2xl`
- Responsive: `md:` dan `lg:` prefixes
- Hover effects: `hover:` prefixes

---

## 🔐 Authentication Flow

```javascript
// Saat user login:
authService.login(email, password)
  → Cari user di users.json
  → Jika ketemu → Simpan token & user
  → Redirect ke /dashboard

// Saat user membuka dashboard:
PrivateRoute → Cek localStorage
  → Jika ada token → Show dashboard
  → Jika tidak → Redirect ke /login
```

---

## 📊 Database Format (users.json)

```json
{
  "users": [
    {
      "id": 1,
      "name": "Admin Unklab",
      "email": "admin@unklab.ac.id",
      "password": "admin123",
      "role": "admin",
      "department": "Sistem Organisasi",
      "createdAt": "2025-01-01"
    }
  ]
}
```

---

## 🛠️ Customization

### Tambah User Baru
Edit `src/data/users.json`, tambahkan object ke array `users`

### Ubah Warna Theme
Edit `src/components/Login.jsx`, ubah `from-blue-600` ke warna lain

### Tambah Validasi
Edit `validateForm()` di `src/components/Login.jsx`

---

## 🚨 Jika Ada Error

| Error | Solusi |
|-------|--------|
| "Cannot find react-router-dom" | `npm install react-router-dom` |
| Tailwind tidak berfungsi | `npm run dev` (restart server) |
| Login tidak bekerja | Cek password di users.json |
| Blank page | Check DevTools Console |

---

## 📱 Responsive Design

✅ Mobile (< 640px)
✅ Tablet (640px - 1024px)
✅ Desktop (> 1024px)

---

## 💾 Local Storage Keys

```javascript
localStorage.getItem('authToken')  // User token (base64)
localStorage.getItem('user')       // User data (JSON)
```

---

## 🎓 Untuk Development Lebih Lanjut

### Menambah Role Baru
1. Edit `src/data/users.json` - tambah role baru
2. Edit `src/components/Dashboard.jsx` - tambah color di `getRoleColor()`
3. Edit `src/components/Dashboard.jsx` - tambah label di `getRoleLabel()`

### Menghubung dengan Backend
1. Edit `src/services/authService.js` - ganti dengan API calls
2. Gunakan `fetch()` atau `axios` untuk API requests
3. Get JWT token dari server response

### Custom Dashboard per Role
```javascript
// src/components/Dashboard.jsx
if (user?.role === 'admin') {
  return <AdminDashboard />;
} else if (user?.role === 'dosen') {
  return <DosenDashboard />;
}
```

---

## 📦 Build untuk Production

```bash
npm run build
# Output di folder: dist/

npm run preview
# Test production build locally
```

Deploy ke: Vercel, Netlify, GitHub Pages, atau hosting lainnya

---

## 🎯 Checklist Implementasi

- ✅ Login page dengan form validation
- ✅ Register page dengan form validation
- ✅ Dashboard dengan user info
- ✅ Protected routes
- ✅ Logout functionality
- ✅ Session management (localStorage)
- ✅ Static JSON database
- ✅ Responsive design
- ✅ Tailwind CSS styling
- ✅ Demo credentials untuk testing

---

## 📞 Butuh Bantuan?

Baca file:
1. `DOKUMENTASI_LOGIN.md` - Dokumentasi lengkap
2. `README_LOGIN.md` - Quick start guide
3. Check `src/` folder structure

---

## 🎉 Siap Digunakan!

Aplikasi login sudah siap digunakan. Sekarang tinggal:

1. ✅ Test semua fitur
2. ✅ Customize sesuai kebutuhan
3. ✅ Tambah fitur tambahan jika diperlukan
4. ✅ Deploy ke production

**Selamat menggunakan Unklab System!** 🚀

---

*Created: November 21, 2025*
