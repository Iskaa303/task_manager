# Task Manager

## Tech Stack

This project is built using the following technologies:

- **Next.js** (v15.4.1) with Turbopack for fast development and production builds
- **React** (v19.1.0) and **React DOM** (v19.1.0) for building the user interface
- **TypeScript** (v5) for static typing
- **Tailwind CSS** (v4) with PostCSS for styling
- **ESLint** for code linting and quality
- **React Query** for data fetching and state management
- **React Table** for building tables
- **Radix UI** components for accessible UI primitives
- **React Hook Form** for form management
- **Zod** for schema validation
- **Hono** for server-side routing and API handling
- **Appwrite** SDK for backend services integration
- Various utility libraries including:
  - `date-fns` for date manipulation
  - `clsx` for conditional classNames
  - `lucide-react` and `react-icons` for icons
  - `sonner` for notifications
  - `tailwind-merge` for merging Tailwind classes

## Getting Started

### Prerequisites

- Node.js (recommended version 18 or higher)
- npm or yarn package manager


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Iskaa303/task_manager.git
   cd task_manager
   ```

2. Install dependencies:

   Using bun:

   ```bash
   bun install
   ```

### Running the Development Server

Start the development server with Turbopack:

```bash
bun run dev
```

Open your browser and navigate to `http://localhost:3000` to see the app running.

### Building for Production

To build the project for production:

```bash
bun run build
```

### Starting the Production Server

After building, start the production server:

```bash
bun run start
```

### Linting

To run ESLint and check for code issues:

```bash
bun run lint
```

## Additional Notes

- This project uses Appwrite for backend services, ensure you have the Appwrite server configured and running if you want to use backend features.
- Tailwind CSS is configured with PostCSS; you can customize styles in the `globals.css` file.
- The project uses React Query for efficient data fetching and caching.
