# COS30049 Blockchain Frontend

A modern, responsive, and user-friendly frontend application for interacting with blockchain services. Built using Next.js with the App Router, providing server-side rendering capabilities, optimized client-side navigation, and a component-based architecture.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd cos30049-fe
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Features

- **Wallet Management**: Create, view, and manage blockchain wallets
- **Transaction Handling**: Send and track blockchain transactions
- **Asset Visualization**: View and analyze blockchain assets with interactive charts
- **Responsive Design**: Optimized for both desktop and mobile devices

## Documentation

- [Architecture Overview](docs/architecture-documentation.md)
- [Technical Documentation](docs/technical-documentation.md)

## Development

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm typegen` - Generate TypeScript types from API schema

### Project Structure

```
/
├── /src
│   ├── /app                 # Next.js App Router pages and layouts
│   ├── /components          # Reusable UI components
│   ├── /lib                 # Utility functions and types
│   └── /actions             # Server actions for data fetching
├── /public                  # Static assets
├── /docs                    # Documentation
└── /node_modules           # Dependencies
```

## Important Notes

> ℹ️ **Note:** The .env file with backend connection details is included in the submission package.

> 🚨 **Warning:** The backend may take ~1 minute to boot up from sleep since it's hosted on a Free tier platform. Please be patient when fetching data, especially when retrieving wallet information.

## Troubleshooting

- **Blank Screen**: Clear browser cache and reload
- **Slow Loading**: The backend may be waking up from sleep mode (wait ~1 minute)
- **UI Glitches**: Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Recharts](https://recharts.org/) - Composable charting library
- [Viem](https://viem.sh/) - TypeScript interface for Ethereum
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Flow](https://reactflow.dev/) - Library for node-based UIs
- [Tanstack Table](https://tanstack.com/table/latest) - Headless UI for tables
- [Embla Carousel](https://www.embla-carousel.com/) - Lightweight carousel component

## Version

Current version: 0.1.0
