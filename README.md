# Phoenix Tech — Victor Ayomide's Portfolio

Personal developer portfolio for **Awoyele Victor Ayomide**, a Computer Science student and software developer in Nigeria. The site presents selected projects, technical interests, and contact options.

**Live portfolio:** https://phoenix-tech2026.onrender.com  
**GitHub profile:** https://github.com/Awoyelevictor

## What the site includes

- Responsive, dark-themed portfolio interface with animated navigation and section transitions
- Hero section with clear links to projects and contact
- About section covering development interests and current focus
- Project gallery with technology tags, featured-project filtering, and GitHub links
- Skills and technology overview
- Contact section with email, phone, WhatsApp, and a message form
- Optional live content loading from the portfolio API, with local JSON fallback
- Google Search metadata, canonical URL, structured Person data, robots.txt, and sitemap.xml

## Selected projects shown

Project details and links are maintained in `src/data/portfolio.json`. The current gallery includes 11 projects, including:

- **Eazy Pay VTU** — a VTU and bill-payment platform for airtime, mobile data, electricity, cable TV, and exam PIN purchases, with wallet-funding and transaction flows
- **E-commerce App with AI** — an exploration of AI in online shopping
- **Health Management System** — a web application for health-related workflows
- **Inventory Management System** — product and stock-management workflows
- **3D Website** — an interactive 3D-focused web experience
- **Terminal Portfolio** — a command-line-inspired portfolio interface
- **TaskWise** — task organisation and productivity
- **Weather App** — a weather-information interface
- **Steps Tracker** — walking-activity tracking
- **VideoSense** — a video/digital-media web project
- **Portfolio** — a personal portfolio site

Descriptions are intentionally concise; each project card links to its corresponding source repository. A live-demo link appears only when a project has a configured URL.

## Tech stack

- React 19 and Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React
- Optional Node.js backend with API utilities

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/Awoyelevictor/phoenix-tech2026.git
cd phoenix-tech2026
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Build and check

```bash
npm run build
npm run lint
npm run preview
```

The production frontend build is generated in `dist/`.

## Project structure

```text
src/
  components/       Portfolio sections and reusable UI
  components/admin/ Admin interface
  data/
    portfolio.json  Local profile, skills, and project fallback data
  utils/            API helpers
  App.jsx           Application composition and routes
  main.jsx          React entry point
public/
  robots.txt
  sitemap.xml
index.html          Page metadata and structured data
```

## Updating portfolio content

- Update the fallback profile and project content in `src/data/portfolio.json`.
- Keep project names, descriptions, technologies, and repository URLs accurate.
- Add a `vercel` or `liveUrl` value only when a public demo is actually available.
- Update the canonical URL, sitemap, and social preview metadata if the production domain changes.

## Deployment

The portfolio is hosted at Render. Pushing changes to the connected deployment branch can trigger a redeploy, depending on the Render service's deployment settings. Confirm the latest deployment in the Render dashboard after making changes.

## Notes

This repository is a portfolio showcase, not a claim that every listed project is production-ready. Project status and live availability can change. Google indexing is controlled by Google and is not guaranteed by adding SEO metadata or submitting a sitemap.
