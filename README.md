# Alexandria - The Medical App for the New Age

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Alexandria is a modern medical application designed to streamline medical processes and provide a user-friendly interface for managing profiles, patients, and other medical-related data.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Project Dependencies

### Core Dependencies

- **Next.js (15.5.6)**: The core framework for building the application.
- **React (19.1.0)**: A JavaScript library for building user interfaces.
- **React DOM (19.1.0)**: Provides DOM-specific methods for React.

### Authentication

- **Next Auth (4.24.13)**: A library for managing authentication in Next.js.

### Database

- **@supabase/supabase-js (2.78.0)**: Supabase client for interacting with the database.

### Form Management

- **Formik (2.4.8)**: A library for building and managing forms.

### Styling

- **Tailwind CSS (4)**: A utility-first CSS framework.
- **PostCSS (8.5.6)**: A tool for transforming styles with JavaScript plugins.
- **@tailwindcss/postcss (4)**: Tailwind's PostCSS plugin.

### Linting and Formatting

- **ESLint (9)**: A tool for identifying and fixing problems in your JavaScript code.
- **eslint-config-next (15.5.6)**: ESLint configuration tailored for Next.js.

### Testing

- **Jest (29.7.0)**: A JavaScript testing framework.
- **@testing-library/react (16.3.0)**: Testing utilities for React components.
- **@testing-library/jest-dom (6.9.1)**: Custom Jest matchers for testing DOM elements.

### TypeScript

- **TypeScript (5)**: A strongly typed programming language that builds on JavaScript.

---

## Project Structure and Architecture

This project follows a modular and scalable structure to ensure maintainability and ease of development.

### Folder Structure

- **`src/app`**: Contains the main application pages and layouts.
  - `(loggedPages)`: Pages that require user authentication, such as the profile page.
  - `layout.tsx`: Root layout for the application.
- **`src/components`**: Reusable UI components such as `HeaderCard`, `Sidebar`, and `MainLayout`.
- **`src/services`**: Contains service files for interacting with the database and API.
  - `medicService.ts`: Handles operations related to medical professionals.
  - `patientsService.ts`: Handles operations related to patients.
- **`src/lib/types`**: Shared TypeScript types and interfaces.
  - `patientTypes.ts`: Defines types for patient profiles, such as `PatientProfile`.

### Key Features

1. **Profile Management**: Users can save and update their profiles using `saveMedicProfile` in `medicService.ts`.
2. **Patient Management**: Operations like creating, updating, and fetching patient data are handled in `patientsService.ts`.
3. **Database Integration**: Uses Supabase for database operations and authentication.
4. **Dark Mode Support**: Tailwind CSS ensures a seamless dark mode experience.
5. **State Management**: Local state is managed using React's `useState` hook.

---

## Environment Variables

The project uses environment variables for configuration. These are stored in `.env` files.

### Example `.env` File

```env
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=public-key-example
SUPABASE_SERVICE_ROLE_KEY=service-role-key-example
```

### Explanation

- **`NEXT_PUBLIC_SUPABASE_URL`**: The URL of your Supabase instance.
- **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`**: Public key for your Supabase instance.
- **`SUPABASE_SERVICE_ROLE_KEY`**: Service role key for interacting with the database securely.

---

## Working with the Project

### Running Tests

The project uses Jest for testing. To run the tests:

```bash
npm run test
```

### Linting

To lint the project and fix issues:

```bash
npm run lint
```

### Adding a New Feature

1. Create a new service or component in the appropriate folder.
2. Use TypeScript interfaces to define data types.
3. Follow the modular structure for better maintainability.

---

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn how to use Supabase for database and authentication.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to style your application with Tailwind.
- [Formik Documentation](https://formik.org/docs/overview) - Learn how to manage forms with Formik.

---

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Contributing

We welcome contributions to the Alexandria project! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project as per the terms of the license.
