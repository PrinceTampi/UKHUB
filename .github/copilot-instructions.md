# UKHUB Frontend - AI Copilot Instructions

## Project Overview
UKHUB is a university hub management system built with React 19, Vite, and Tailwind CSS. The frontend handles authentication (login/register) and provides a dashboard for three user roles: Admin, Dosen (Lecturer), and Mahasiswa (Student).

## Architecture & Structure

### Core Stack
- **Framework**: React 19 with Vite (HMR enabled for fast development)
- **Styling**: Tailwind CSS v4 (imported via `@tailwindcss/vite`)
- **Authentication**: Client-side service (`src/services/authService.js`)
- **State Management**: React hooks (useState, no external state library)

### Key Directory Layout
```
src/
  ├── pages/           # Page components (LoginPage, RegisterPage, DashboardPage)
  ├── components/      # Reusable components (Header, Footer)
  ├── services/        # Business logic (authService.js - login/register)
  ├── data/            # Static data (users.json with demo accounts)
  └── assets/          # Static files
```

### User Roles & Access Control
Three distinct roles with different permissions:
- **admin**: Full system access (color: red)
- **dosen**: Lecturer role (color: blue)
- **mahasiswa**: Student role (color: green)

Role colors are defined in `DashboardPage.jsx` using `getRoleColor()` helper and applied via inline color schemes.

## UI/UX Design Patterns (2025 Modern Standards)

### Color System
- **Primary**: Blue (#2563eb, #1e40af) - Primary actions, admin features
- **Secondary**: Green (#16a34a, #15803d) - Registration, positive actions
- **Error**: Red (#dc2626, #b91c1c) - Alerts, destructive actions
- **Neutral**: Gray scale (50-900) - UI backgrounds and text

### Component Patterns
1. **Input Fields**: Tailwind form styling with focus states
   - Focus ring: `focus:ring-2 focus:ring-[color]-500`
   - Border change on focus: `border-[color]-500 bg-[color]-50`
   - Icons inside input container for validation feedback

2. **Buttons**: Gradient backgrounds with hover states
   - Pattern: `bg-linear-to-r from-[color]-600 to-[color]-500 hover:from-[color]-700 hover:to-[color]-600`
   - Loading state with spinner animation
   - Disabled state: `disabled:opacity-50 disabled:cursor-not-allowed`

3. **Cards**: Subtle shadows with hover effects
   - Base: `bg-white rounded-lg shadow-sm border border-gray-200`
   - Hover: `hover:shadow-md transition-shadow`

4. **Forms**: Organized with consistent spacing
   - Vertical spacing: `space-y-4` or `space-y-5`
   - Error messages: `text-red-600 text-xs mt-2`
   - Success states use green color scheme

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Key breakpoints used: `md:` (768px), `lg:` (1024px)
- Mobile sidebar toggle with `hidden md:block` patterns
- Flexible grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Critical Conventions

### Form Validation
- Validation happens on form submission AND on field blur
- Errors stored in `errors` state object by field name
- Clear error messages in Indonesian (Bahasa Indonesia)
- Pattern: Email regex validation, password length check (min 6 chars)

### Authentication Flow
- Demo accounts available in `data/users.json` for testing
- `authService.login()` and `authService.register()` return `{success, message, user}`
- Session stored via `onLoginSuccess` callback to parent component
- Demo credentials: admin@unklab.ac.id, dosen@unklab.ac.id, mahasiswa@unklab.ac.id

### Page Component Props Pattern
All pages receive callbacks from parent (`App.jsx`):
```javascript
LoginPage({ onLoginSuccess, onGoToRegister })
RegisterPage({ onRegisterSuccess, onGoToLogin })
DashboardPage({ user, onLogout })
```

### Loading & Error States
- `isLoading` state prevents double submissions
- Form inputs disabled during API calls: `disabled={isLoading}`
- Loading spinner: CSS animated SVG with `animate-spin`
- Error display: Alert box with red background and icon

## Development Workflow

### Build Commands
```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build locally
```

### Development Guidelines
1. **Tailwind Classes**: Use Tailwind utilities directly in JSX (no CSS files needed)
2. **Component Structure**: Functional components with hooks only
3. **Icons**: SVG icons inline with stroke/fill attributes (no icon library)
4. **Responsive**: Test on mobile/tablet/desktop - use Tailwind's mobile-first approach
5. **State Management**: Keep component-level state simple, prefer props for communication

### Common Patterns to Preserve
- Focused field highlighting with `focusedField` state for UX feedback
- Icon placement inside input containers with `absolute right-4 top-3.5`
- Inline SVG icons for consistency (no external dependencies)
- Gradient backgrounds for visual hierarchy: `bg-linear-to-r`, `bg-linear-to-br`
- Success/error color coding: green for positive, red for negative actions

## Styling Specifics

### Tailwind Configuration
- Using `@tailwindcss/vite` plugin for optimized builds
- Global styles in `src/index.css` (minimal, reset styles)
- All component styling via Tailwind utility classes

### Shadow & Spacing Patterns
- Subtle shadows by default: `shadow-sm` for cards, `shadow-md` on hover
- Consistent padding: `p-4`, `p-6`, `p-8` (8px increments)
- Consistent gaps: `gap-2`, `gap-3`, `gap-4`, `gap-6`

## Common Mistakes to Avoid

1. **Don't** use custom CSS files - use Tailwind utilities exclusively
2. **Don't** import external icon libraries - create inline SVGs
3. **Don't** hardcode colors outside the color system (use standardized colors)
4. **Don't** forget role-based color coding in components (getRoleColor helper)
5. **Don't** remove the focusedField interaction states - improves UX significantly
6. **Don't** change form structure without updating validation logic
7. **Don't** break responsive grid patterns - maintain consistent breakpoint usage

## Integration Points

### authService.js
- Handles login/register logic
- Mock implementation uses `data/users.json`
- Returns user object with: `{id, name, email, role, department}`
- Always include error messages for failed operations

### Header & Footer Components
- Reusable across all pages
- Header shows user info when authenticated (`showLogout` prop)
- Header sticky positioning (z-50) for overlays
- Footer contains company/org info

## Testing Demo Accounts
Three pre-configured accounts in `data/users.json`:
- Admin: admin@unklab.ac.id / admin123
- Dosen: dosen@unklab.ac.id / dosen123  
- Mahasiswa: mahasiswa@unklab.ac.id / mahasiswa123

One-click fill in login page demo button section demonstrates account access.
