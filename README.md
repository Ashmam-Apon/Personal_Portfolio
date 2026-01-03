# Personal Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Showcase your projects, skills, and achievements with an elegant design and smooth user experience.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes with persistent user preference
- **Admin Dashboard**: Secure admin panel to manage portfolio content
- **Project Showcase**: Display your best work with project cards and details
- **Achievement Tracker**: Highlight awards and accomplishments
- **Hero Carousel**: Eye-catching hero section with multiple slides
- **Contact Section**: Easy way for visitors to reach out
- **Smooth Animations**: Engaging animations and transitions throughout the site

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Font**: Inter & Playfair Display

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashmam-Apon/Personal_Portfolio.git
   cd Personal_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Build for Production

To create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── ui/             # Reusable UI components
│   ├── About.tsx
│   ├── Achievements.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   └── Portfolio.tsx
├── context/            # React context for state management
├── services/           # API and utility services
├── App.tsx             # Main app component
├── index.tsx           # Entry point
├── types.ts            # TypeScript type definitions
├── constants.ts        # App constants
└── vite.config.ts      # Vite configuration
```

## Admin Panel

Access the admin panel at `/#/admin` to manage your portfolio content:

- Update profile information
- Manage hero slides
- Add/edit/delete projects
- Update services
- Manage achievements
- Reset to defaults

**Demo Password**: `admin123`

## Customization

### Update Profile Data

Edit `constants.ts` to update your profile information:

```typescript
export const INITIAL_DATA: AppData = {
  profile: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio",
    // ... other profile details
  },
  // ... other sections
};
```

### Update Colors

Customize the color scheme in `index.html`:

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: {
            // Define your primary colors
          }
        }
      }
    }
  }
</script>
```

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, feel free to reach out through the contact form on the portfolio website.
