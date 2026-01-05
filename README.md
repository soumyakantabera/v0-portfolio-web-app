# Portfolio web app

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/berasoumya08-6814s-projects/v0-portfolio-web-app)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://soumyakantabera.github.io/v0-portfolio-web-app/)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/ftcrcSN4qXr)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

This project supports multiple deployment options:

### GitHub Pages (Static Export)

The site is automatically deployed to GitHub Pages at:

**[https://soumyakantabera.github.io/v0-portfolio-web-app/](https://soumyakantabera.github.io/v0-portfolio-web-app/)**

#### How GitHub Pages Deployment Works

1. Push changes to the `main` branch
2. GitHub Actions workflow (`.github/workflows/pages.yml`) automatically triggers
3. The workflow:
   - Installs dependencies
   - Builds the static site with `npm run build`
   - Deploys the `out/` directory to GitHub Pages
4. The site becomes available at the GitHub Pages URL

#### Manual Deployment

To trigger a manual deployment:
1. Go to the [Actions tab](https://github.com/soumyakantabera/v0-portfolio-web-app/actions)
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

#### GitHub Pages Configuration

The project is configured for GitHub Pages with:
- **Static Export**: `output: 'export'` in `next.config.mjs`
- **Base Path**: `/v0-portfolio-web-app` for project subpath deployment
- **Trailing Slash**: Enabled to avoid 404s on page refresh
- **Unoptimized Images**: `images: { unoptimized: true }` for static compatibility

### Vercel

Your project is also live at:

**[https://vercel.com/berasoumya08-6814s-projects/v0-portfolio-web-app](https://vercel.com/berasoumya08-6814s-projects/v0-portfolio-web-app)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/ftcrcSN4qXr](https://v0.app/chat/ftcrcSN4qXr)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Both Vercel and GitHub Pages deploy the latest version

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build static export
npm run build

# Output will be in the ./out directory
```

### Technology Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Analytics**: Vercel Analytics

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
  - `/ui` - Reusable UI components
  - `/layout` - Navigation, footer, theme provider
  - `/home` - Home page sections
  - `/charts` - Data visualization components
  - `/calculators` - Interactive finance calculators
- `/lib` - Utilities and data
- `/public` - Static assets
- `/.github/workflows` - GitHub Actions workflows