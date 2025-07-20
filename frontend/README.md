# Infrnce - Intelligent Log Classification Engine

A professional Next.js website showcasing an intelligent log classification engine for infrastructure teams. Built with modern web technologies and designed with professional minimalism and "Clarity as a Feature" philosophy.

## Features

- **Intelligent Homepage**: Comprehensive landing page with hero section, live demo, value propositions, and architecture overview
- **Live Classification Engine**: Interactive log classification with support for manual input, dataset samples, and AI-generated logs
- **Performance Dashboard**: Detailed analytics showing pipeline performance, cost metrics, and stage breakdowns
- **Professional Design**: Clean, minimalist interface using sophisticated teal accent colors and elegant typography
- **Consistent Background Pattern**: Diagonal line pattern applied across all pages for visual coherence
- **Responsive Layout**: Fully responsive design optimized for all devices
- **Accessibility**: Built with accessibility standards and keyboard navigation support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS v4 with custom teal theme
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Backend Integration**: FastAPI endpoints at http://127.0.0.1:8000

## Design Philosophy

- **Clarity as a Feature**: Every element serves a purpose
- **Professional Minimalism**: Clean, uncluttered, elegant design
- **Data-driven Interface**: Focus on showcasing intelligent classification technology
- **Sophisticated Teal Theme**: Professional color palette with teal accents
- **Gallery-like Background**: Very light gray (#F9FAFB) for refined feel

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The application integrates with three FastAPI endpoints:

- `POST /api/classify` - Main classification endpoint
- `POST /api/generate-synthetic` - Generate synthetic logs
- `POST /api/random-log` - Get random existing logs

Make sure your FastAPI backend is running at `http://127.0.0.1:8000` for full functionality.

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Global layout with Header/Footer
│   ├── page.js            # Homepage with comprehensive sections
│   ├── engine/
│   │   └── page.js        # Dedicated classification engine
│   └── dashboard/
│       └── page.js        # Performance analytics dashboard
├── components/
│   ├── Header.jsx         # Navigation header
│   ├── Footer.jsx         # Site footer
│   └── ui/               # shadcn/ui components
└── lib/
    └── utils.js          # Utility functions
```

## Design Philosophy

**Clarity as a Feature** - Every element serves a purpose. The interface maintains professional minimalism while showcasing the intelligent classification technology through clean design and flawless user experience.

## Color Palette

- **Primary Accent**: Sophisticated teal for interactive elements
- **Background**: Very light gray (#F9FAFB) for gallery-like feel
- **Text & Borders**: Neutral palette of dark grays and black with varying opacities

## Development

- **Linting**: ESLint with Next.js configuration
- **Styling**: Tailwind CSS with custom color scheme
- **Components**: Exclusively shadcn/ui for consistent design
- **Icons**: Lucide React for professional iconography

## Deployment

This Next.js application can be deployed to any platform that supports Node.js:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS/GCP/Azure**

Build the application for production:

```bash
npm run build
npm start
```

## License

This project showcases modern web development practices for intelligent infrastructure monitoring solutions.
