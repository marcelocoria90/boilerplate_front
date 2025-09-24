# React Boilerplate Project

A modern React application boilerplate using Vite, React Router, and Tailwind CSS.

## Features

- ⚡️ Built with [Vite](https://vitejs.dev/) for fast development and building
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- 🌓 Dark/Light mode support with system preference detection
- 🛠 Component library with reusable UI components
- 📱 Responsive design
- 🧭 React Router for client-side routing

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ThemeSwitcher.jsx
│   └── ui/        # Basic UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
│   ├── agendar-certificado/    # Certificado scheduling page
│   │   ├── components/         # Page-specific components
│   │   │   ├── EjemploCard.jsx
│   │   │   └── EmailManager.jsx
│   │   └── AgendarCertificadoPage.jsx
├── routes/        # Routing configuration
├── theme/         # Theme configuration
└── utils/         # Utility functions
```

## Pages Description

### Agendar Certificado Page (`/agendar-certificado`)

A demonstration page that showcases:

- Email management functionality
- Custom component integration
- Responsive layout using Tailwind CSS

#### Components

- **EmailManager**: Handles email operations and management
- **EjemploCard**: Example card component for demonstration purposes

#### Layout

The page is structured with:

- A header section displaying the page title
- A centered email management section
- A demonstration card component
- An informative text section explaining the page's purpose

#### Styling

- Uses Flexbox for layout management
- Implements responsive design using Tailwind CSS classes
- Maintains consistent spacing with `mt-4` margin utilities

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/marcelocoria90/boilerplate_front
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

### Building for Production

```bash
pnpm build
```

### Running Production Build Locally

```bash
pnpm preview
```

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## License

MIT
