# GitHub Workflow untuk Development

## Branch Strategy

Proyek ini menggunakan **Feature Branch Workflow** dengan struktur branch sebagai berikut:

### Branch Structure

```
main (production)
├── develop (development)
    ├── feature/ui-components
    ├── feature/contact-page
    ├── feature/public-page
    └── feature/[feature-name]
```

## Workflow Steps

### 1. Membuat Feature Branch

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create new feature branch
git checkout -b feature/ui-components
# atau
git checkout -b feature/contact-page
# atau
git checkout -b feature/public-page
```

### 2. Development Workflow

```bash
# Work on your feature
# Make commits with clear messages
git add .
git commit -m "feat: add Header component with navigation"
git commit -m "feat: add Footer component with contact info"
git commit -m "style: improve responsive design for mobile"

# Push to remote
git push origin feature/ui-components
```

### 3. Commit Message Convention

Gunakan format berikut untuk commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `style:` - Styling changes (formatting, CSS)
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Contoh:**
```
feat: add OrganizationCard component
fix: resolve sidebar mobile menu issue
style: improve button hover effects
docs: update README with setup instructions
```

### 4. Pull Request Process

1. **Create Pull Request** dari feature branch ke `develop`
2. **PR Title Format:** `[Feature] Description`
   - Contoh: `[Feature] UI Components - Header, Footer, Sidebar`
   - Contoh: `[Feature] Contact Directory Page`
   - Contoh: `[Feature] Organization Public Page`

3. **PR Description Template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Styling update
   - [ ] Documentation

   ## Changes Made
   - List of changes
   - Component updates
   - New features added

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Testing
   - [ ] Tested on Chrome
   - [ ] Tested on Firefox
   - [ ] Tested on Mobile
   - [ ] Responsive design verified

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] Responsive design tested
   ```

### 5. Code Review

- Reviewer akan memeriksa:
  - Code quality
  - Styling consistency
  - Responsive design
  - Component reusability
  - Best practices

### 6. Merge to Develop

Setelah approval:
```bash
# Merge to develop
git checkout develop
git pull origin develop
git merge feature/ui-components
git push origin develop
```

### 7. Deploy to Production

Setelah semua features siap:
```bash
# Merge develop to main
git checkout main
git pull origin main
git merge develop
git push origin main
```

## Branch Naming Convention

### Feature Branches
- `feature/ui-components` - UI Components development
- `feature/contact-page` - Contact Directory page
- `feature/public-page` - Organization Public page
- `feature/[component-name]` - Specific component
- `feature/[page-name]` - Specific page

### Bug Fix Branches
- `fix/[bug-description]` - Bug fixes

### Hotfix Branches
- `hotfix/[issue-description]` - Critical fixes

## Best Practices

1. **Keep branches focused** - One feature per branch
2. **Regular commits** - Commit frequently with clear messages
3. **Pull before push** - Always pull latest changes before pushing
4. **Test before PR** - Test your changes thoroughly
5. **Clean up** - Delete merged branches

## Example Workflow for Ralff's Tasks

### Task 1: UI Components
```bash
git checkout -b feature/ui-components
# Work on Header, Footer, Sidebar, Cards
git commit -m "feat: add Header component with navigation"
git commit -m "feat: add Footer component"
git commit -m "feat: add Sidebar component for admin"
git commit -m "feat: add Card components (Organization, Room, Announcement, Activity)"
git commit -m "feat: add SearchBar component"
git push origin feature/ui-components
# Create PR: [Feature] UI Components
```

### Task 2: Contact Directory
```bash
git checkout -b feature/contact-page
# Work on Contact page
git commit -m "feat: add Contact Directory page"
git commit -m "feat: add search functionality for contacts"
git commit -m "style: improve contact card design"
git push origin feature/contact-page
# Create PR: [Feature] Contact Directory Page
```

### Task 3: Organization Public Page
```bash
git checkout -b feature/public-page
# Work on Organization Public page
git commit -m "feat: add Organization Public page"
git commit -m "feat: add tab navigation (Overview, Activities, Rooms, Structure)"
git commit -m "feat: add organization profile display"
git commit -m "style: improve organization page layout"
git push origin feature/public-page
# Create PR: [Feature] Organization Public Page
```

## Git Commands Cheat Sheet

```bash
# Check status
git status

# Add files
git add .
git add src/components/Header.jsx

# Commit
git commit -m "feat: description"

# Push
git push origin feature/branch-name

# Pull latest
git pull origin develop

# Create branch
git checkout -b feature/new-feature

# Switch branch
git checkout develop

# View branches
git branch

# Delete branch (local)
git branch -d feature/old-feature

# Delete branch (remote)
git push origin --delete feature/old-feature
```

