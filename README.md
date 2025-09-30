# Pritesh · Software Engineering Portfolio

This Vite + React single-page site showcases engineering impact, selected projects, and writing highlights for a senior front-end/product engineer. It is optimised for a modern developer aesthetic with TailwindCSS and Lucide icons, and deploys cleanly to Vercel.

> The previous **Daily Vedanta Inspiration** experience now lives on the `daily-vedanta` branch. Deploy that branch if you want the spiritual experience instead of the portfolio.

## ✨ Highlights

- Hero section with availability CTA and quick theme toggle.
- Impact snapshots, project cards, skill domains, and recent-role timeline.
- Learning log tiles linked to Dev.to, plus certification badges.
- Contact panel with quick links to email, LinkedIn, and GitHub.
- Light and dark palettes with subtle gradient ornaments defined via Tailwind utilities.

## 🧱 Tech Stack

- **React 18** with functional components.
- **Vite** for fast local development and builds.
- **Tailwind CSS** with a small custom palette (`brand-*` colors).
- **Lucide React** icon set.
- Deploy target: **Vercel** (works equally well on Netlify, GitHub Pages, etc.).

## 🚀 Local Development

```bash
git clone https://github.com/epritesh/personal-website.git
cd personal-website
npm install
npm run dev
```

Open `http://localhost:5173` to preview. The site supports hot module replacement by default.

To ship a production bundle:

```bash
npm run build
npm run preview # optional preview of the build output
```

> If you work across Windows and WSL, reinstall dependencies (`npm install`) inside each environment so esbuild downloads the correct native binary.

## 🗂️ Key Files

```
src/
├── App.jsx         # Portfolio content + layout
├── index.css       # Tailwind layers and component helpers
├── main.jsx        # React entry point
└── services/…      # (Unused in main branch, kept for the Daily Vedanta variant)
```

Tailwind customisations live in `tailwind.config.js`. Fonts are loaded via `index.html` (Inter by default).

## 🔧 Customisation Guide

- **Projects & copy:** Edit the data arrays (`primaryProjects`, `skillDomains`, `timeline`, `learningLog`, `certifications`) near the top of `src/App.jsx`.
- **Brand colours:** Adjust `brand-cyan`, `brand-indigo`, and `brand-purple` in `tailwind.config.js`.
- **Section heading style:** Update the `.section-title` utility in `src/index.css`.
- **Theme defaults:** Change the initial `isDarkMode` value in `App.jsx` if you prefer light mode by default.

## 🌐 Deployment Notes

1. Push the branch you want to deploy (`main` for the portfolio, `daily-vedanta` for the spiritual experience).
2. On Vercel: import the GitHub repo, keep the defaults (`npm run build`, output `dist`).
3. Add any public environment variables if future enhancements require them (`VITE_*`).
4. For static hosts (GitHub Pages / Netlify), no server-side code is needed.

## 🤝 Contributing / Forking

Fork freely and adapt the content for your own portfolio. Please keep attribution or link back if you find the layout helpful.

## 📜 License

Released under the MIT License. See `LICENSE` if you add one; otherwise treat the code as permissive personal boilerplate.
