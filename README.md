# jasri-travel-hub

A Tailwind CSS static travel site with destinations, gallery, guides and a sample blog.

**Description**: Responsive static travel website built with Tailwind CSS and vanilla JavaScript. Uses JSON files for destination and news data and includes pages for destinations, gallery, guides, blog and contact.

**Features**
- **Static Pages:** `index.html`, `destinations.html`, `gallery.html`, `guide.html`, `blog.html`, `contact.html`.
- **Tailwind CSS:** Utility-first styling with a `tailwind.config.js` and `css/input.css` source file.
- **JSON-driven Content:** `data/destinations.json` and `data/news.json` provide content consumed by JS.
- **Vanilla JS:** Lightweight `js/` scripts for interaction and content rendering.

**File Structure (high level)**
- **`index.html`**: Home / landing page.
- **`destinations.html`**: Destination listings driven by `data/destinations.json`.
- **`gallery.html`**: Photo gallery.
- **`guide.html`**: Travel guides.
- **`blog.html`**, **`contact.html`**: Blog samples and contact page.
- **`css/`**: `input.css` (Tailwind source) and generated `style.css`.
- **`js/`**: Page scripts (e.g., `destinations.js`, `main.js`).
- **`data/`**: JSON content files.

**Quick Start**
1. Install dev dependencies (optional, for Tailwind building):

```sh
npm install
```

2. Build Tailwind once (generates `css/style.css`):

```sh
npm run build
```

3. Or run the Tailwind watcher during development:

```sh
npm run watch
```

4. Preview the site: open `index.html` in your browser (static files).

**Repository Metadata**
- **Suggested repo name:** `jasri-travel-hub`
- **One-line tagline:** "A Tailwind CSS static travel site with destinations, gallery, guides and a sample blog."
- **Suggested topics:** `tailwindcss`, `static-site`, `travel`, `html`, `javascript`, `portfolio`

**Next steps**
- Add a `LICENSE` and update `package.json` author fields.
- Commit the README: `git add README.md && git commit -m "Add README"`.
- Publish to GitHub and enable GitHub Pages if you want a hosted demo.

**License**
This project currently has `ISC` in `package.json`. Add or change a LICENSE file as desired.

---
Created for the local project at the repository root.
