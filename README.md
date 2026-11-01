# STACK’D Burgers — Next.js

Next.js 14 (App Router) port of the single-file STACK’D site, with the app code split by functionality.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Next.js side

| Path | Purpose |
|---|---|
| `app/layout.js` | Metadata, JSON-LD, fonts, theme-init script, mounts the shell and script loader |
| `app/globals.css` | All CSS |
| `app/page.js` | Empty — the app is hash-routed (`#menu`, `#admin`, …) |
| `components/Shell.js` | Intro overlay + `header` / `main` / `footer` mount points |
| `components/LegacyScripts.js` | Loads `public/js/*` sequentially, once |
| `lib/scripts.js` | **Load order** of the scripts (order matters) |
| `public/hero.mp4` | Hero video |

## App code (`public/js`)

These are shared-scope scripts, not ES modules, so inline `onclick="add('x')"` handlers keep working.
Later files use things declared in earlier ones; keep `lib/scripts.js` in sync when adding a file.

```
core/       util.js (PHP, Manila time, $, esc, toast) · state.js (localStorage "stackd")
data/       menu-data.js (MENU, BR, images, story)
ui/         icons.js · media.js · theme.js · modal.js · header.js · intro.js · carousel.js
features/   menu.js · branches.js · promos.js · cart.js · orders.js · contact.js · auth.js
admin/      state.js · users.js · menu-editor.js · store-settings.js · order-actions.js
            analytics.js · demo-data.js · guard.js
router.js   page registry (R), go(), route(), hashchange + link handling
pages/      home · menu (+item) · cart · checkout (+confirmation, track) · locations
            promos · about · legal · account (login, signup, account) · admin
boot.js     seed demo data/users, first render, splash
```

Each `pages/*.js` file registers its pages with `Object.assign(R, { … })`.

## Notes
- Verified in headless Chromium against the original single file: identical rendered HTML across
  all public pages, cart → checkout → order, demo-account login, all 11 admin tabs and the theme
  toggle. The only difference is the hero video now loads from `/hero.mp4`.
- State is still `localStorage`; auth/RBAC is a client-side demo.
- Next step toward idiomatic React: convert one page at a time into `app/<route>/page.js`
  components, and replace the global state with a store.
