# Sooner — project brief

Sooner is a **showcase** site (not a shop) for lighting pieces and interior design projects.
Its signature feature is a **Light toggle**: every product is shown in two
photos, lamp off (daylight) and lamp on (evening), and the whole page fades
between the two moods.

No cart, prices, search or filters. Keep it minimal and editorial.

## Stack

- Next.js (App Router) + TypeScript, deployed on Vercel
- Tailwind CSS, with all colours defined as CSS variables in `app/globals.css`
- `next/image` for every product image
- Product content in `data/products.json` (no CMS yet; all access goes through `lib/products.ts` so a CMS can be swapped in later)
- Font: Schibsted Grotesk via `next/font/google` (weights 400, 500, 700)

## Folder structure

```
app/
  layout.tsx                 # <html>, font, LightProvider, sets data-light on <html>
  page.tsx                   # home page: intro line, LightToggle, two department tiles
  globals.css                # light-off / light-on tokens, base styles
  [department]/page.tsx      # "All" view: /lighting, /interior-design
  [department]/[category]/page.tsx   # /lighting/pendants, /interior-design/residential etc.
  [department]/[category]/[slug]/page.tsx   # project page: /interior-design/commercial/beth
                                            # (interior design only; anything else → notFound())
components/
  Header.tsx                 # client: "Sooner" wordmark + department links (current one highlighted)
  Footer.tsx                 # every page (in layout.tsx): email, department links, Instagram, © <year> Sooner Studios
  CurrentYear.tsx            # server: current year inside "use cache" + cacheLife("days")
  DepartmentTile.tsx         # home page: large image tile linking to a department
  StickyBar.tsx              # client: slim sticky bar, optional left content + LightToggle at right
                             # (home page, project pages)
  PageTitle.tsx              # centred: department or category name + "N pieces" / "N projects"
  CategoryBar.tsx            # desktop: centred tabs + LightToggle at right end; sticky on scroll
  MobileDock.tsx             # mobile: floating pill at bottom — category button | light toggle
  CategorySheet.tsx          # mobile: bottom sheet listing categories with counts
  LightToggle.tsx            # the switch; reused in CategoryBar and MobileDock
  ProductGrid.tsx            # 4 cols ≥1024px, 2 cols below
  ProductCard.tsx            # stacked off/on images, name, material (or category label if no material);
                             # interior design cards link to their project page
  ProjectCarousel.tsx        # client: project page photos, one at a time; arrows, swipe, ←/→ keys, "2 / 6" counter
lib/
  light-context.tsx          # client context: lit boolean, toggle(), persisted in localStorage
  products.ts                # getAll, getByDepartment, getByCategory, getBySlug, counts
  categories.ts              # departments (slug, label, noun) → categories (slug + label)
data/products.json
public/images/products/      # <slug>-off / <slug>-on images for every lighting product
public/images/projects/      # <slug>-off / <slug>-on images for every interior design project
```

## Data shape

```json
{
  "slug": "orbit-disc-sconce",
  "name": "Orbit Disc Sconce",
  "department": "lighting",
  "category": "sconces",
  "material": "Glazed ceramic",
  "images": {
    "off": "/images/products/orbit-disc-sconce-off.jpg",
    "on": "/images/products/orbit-disc-sconce-on.jpg"
  }
}
```

`material` is optional. Interior Design projects have none; their card shows the category
label ("Residential" / "Commercial") instead.

Interior Design projects also have these optional fields, shown on the project page:

```json
{
  "date": "2025",
  "location": "Upper Thomson, Singapore",
  "scope": "Interiors, Brand Activation",
  "summary": "One short line describing the project.",
  "description": ["First paragraph…", "Second paragraph…"]
}
```

Project page: "← All projects" link, large photo carousel (`ProjectCarousel`) beside
name, Date / Location / Scope (`<dl>`), summary and description; "Next project →" at the bottom
cycles through projects in `products.json` order.

ProjectCarousel: one 5:6 photo at a time. Previous / Next `<button>`s (44px, labelled "Previous photo" /
"Next photo") over the photo, wrapping at the ends; swipe on touch (>50px); ←/→ keys when the carousel
has focus (`role="region"`, `aria-roledescription="carousel"`). Counter "2 / 6" under the photo with
`aria-live="polite"`. Alt text "<name>, photo 2 of 6". Only the current photo is rendered, no slide
animation. With one photo, arrows and counter are hidden. Until PER-27 adds `gallery`, the page passes
`[images.off, images.on]` as the photos.

Light toggle placement must be the same on every page: on desktop it sits at the right end of a
sticky bar (the CategoryBar on grid pages; on project pages a slim bar with "← All projects" on the
left and the LightToggle on the right, same height, stickiness and shadow as the CategoryBar). On
mobile it is in the MobileDock. The home page has no dock, so its sticky bar (above the tiles) shows
on mobile too. The project-page and home-page bars are the same `StickyBar` component.

Next.js has `cacheComponents` on: don't use `dynamicParams`; reject unknown params with `notFound()`.

Departments and categories (each department has a `noun` used in the title count):
- lighting (noun "piece"): pendants, sconces, table, floor, outdoor
- interior-design (noun "project"): residential, commercial. The client's spatial projects
  (Beth, DINKWAC!, Good Company, Everyday Rituals, Nook and Move), shown as cards in the same grid.
  Real copy (date, location, scope, description) is on soonerstudios.framer.website/projects/*.
- furniture: on hold until the client has pieces to show

## Design tokens

| Token        | Light off (day) | Light on (evening) |
|--------------|-----------------|--------------------|
| --bg         | #F6F4F0         | #1E1814            |
| --ink        | #2B1B15         | #EFE3D3            |
| --muted      | #6B5D53         | #B3A392            |
| --rule       | #C9BFB4         | #5A4A3F            |
| --tile       | #E5DFD4         | #2E2620            |
| --dock-bg    | #2B1B15         | #EFE3D3            |
| --dock-ink   | #F6F4F0         | #1E1814            |

- Switch tokens with `html[data-light="on"]`; crossfade via View Transitions (~600ms).
- Base text 13px; page title 30px/500 (20px on mobile); wordmark 19px/700, letter-spacing -0.02em.
- Content column: 1048px of content (max-width 1080px including 16px side padding), centred. Grid gap 16px across, 24px down. Card image aspect 5:6 (250×300 at full width).

## Layout

**Home page (`/`)**

```
Sooner                                    Lighting   Interior Design

          An independent design label exploring furniture,
          lighting, objects and spaces through material,
          construction and proportion.

                                                   💡 Light  [○  ]   ← sticky bar
┌──────────────────────────────┐  ┌──────────────────────────────┐
│                              │  │                              │
│   first lighting product     │  │   first interior design      │
│   (off/on, fades)            │  │   project photo              │
│                              │  │                              │
└──────────────────────────────┘  └──────────────────────────────┘
Lighting →                         Interior Design →
15 pieces                          5 projects

──────────────────────────────────────────────────────────────────
Sooner   Get in touch                ┌──────────────────────────────┐
         For projects and enquiries… │ soonerstudios…  [ EMAIL US ] │
                                     └──────────────────────────────┘
         Explore           Social
         Lighting          Instagram
         Interior Design
──────────────────────────────────────────────────────────────────
© 2026 Sooner Studios. All rights reserved.
```

- Intro line (the client's own copy, verbatim): "An independent design label exploring furniture,
  lighting, objects and spaces through material, construction and proportion."
  Centred, ~24px/500 on desktop (two balanced lines), 18px on mobile, max ~860px wide. This is the page's `<h1>`.
- `StickyBar` between the intro line and the tiles: empty on the left, LightToggle at the right end,
  sticks with a shadow on scroll, shown on mobile too (no dock on the home page).
- Two department tiles, built from `departments` (so a new department adds a tile):
  side by side on desktop (16px gap), stacked on mobile. Each tile is one link: image (aspect 5:6
  on mobile, 4:5 on desktop), then department label + "→", then the count ("15 pieces") in muted.
  Image = the first product in that department in `products.json` order. Lighting's tile uses the
  off/on pair and fades with the toggle; Interior Design's uses the project photo.
- No CategoryBar, no MobileDock on the home page.

**Footer (every page)**
- Added once in `layout.tsx`, below the page content, `--rule` line on top. A `<footer>` landmark.
- Layout adapted from HyperUI's "Large with newsletter form" footer
  (hyperui.dev/components/marketing/footers), in Sooner's tokens:
  - "Sooner" wordmark on the left (same style as the header's, links to `/`); the grid sits beside it on desktop.
  - Top row: "Get in touch" heading + one muted line; on the right, where HyperUI has the newsletter form,
    a single `mailto:` link (soonerstudios.sg@gmail.com) styled as an outlined box with a filled ink
    "Email us" button. No real form: there is no mailing list.
  - Compact (client request): tight spacing, no category lists.
  - "Explore" column: one link per department (built from `departments`).
  - "Social" column, same style: Instagram as a text link
    (https://instagram.com/soonerstudios, new tab, `rel="noopener noreferrer"`).
- Bottom row under a `--rule` line: "© <current year> Sooner Studios. All rights reserved.", muted.
- Desktop: 5-column grid beside the wordmark. Mobile: wordmark on top, everything stacked.
  Links are 44px tall touch targets.
- On pages with the MobileDock, keep enough bottom padding that the dock never covers the footer.

**Desktop (≥1024px)**
- Header: "Sooner" wordmark on the left, department links on the right (Lighting · Interior Design),
  built from `departments`. Current department in `--ink` with `aria-current="page"` (category pages count),
  others in `--muted`. Links are 44px tall.
- Centred title block: "Lighting" with "113 pieces" underneath (muted).
- Category bar: full column width, no rules, 68px tall, sits close under the title. Tabs centred as slim
  ~30px pills inside 44px click areas (selected = filled ink pill with bg-coloured text; others = 1px rule outline). First tab is "All".
  LightToggle at the right end: bulb icon, "Light" label, 34×18 switch.
- When scrolled, the category bar sticks to the top with a soft shadow; header and title scroll away.

**Mobile (<1024px)**
- Header: wordmark and department links on one line, rule below.
- Title left-aligned: category name + "N pieces".
- 2-column grid.
- No tab bar. A floating dock sits 28px above the bottom (respect `env(safe-area-inset-bottom)`):
  one pill with two buttons — "Category · Pendants ▾" and the LightToggle — separated by a 1px divider.
  Dock colours invert (`--dock-bg` / `--dock-ink`).
- Tapping the category button opens CategorySheet: bottom sheet, 20px top radius, grab handle,
  "Category" heading, close button, 52px rows with counts, current row bold with a tick.
  The dock hides while the sheet is open. Add bottom padding to the grid so the dock never covers content.

## Behaviour

- Light state: default off. Stored in localStorage; set `data-light` before first paint
  (small inline script in layout.tsx) to avoid a flash of the wrong mood.
- ProductCard: both images rendered in the same box, "on" image on top with `opacity: 0`;
  `html[data-light="on"]` fades it to 1. Pure CSS, no re-render.
- Category lives in the URL (`/lighting/pendants`). Tabs and sheet rows are links.
  Generate static params for every department/category.

## Accessibility

- Real `<button>` / `<a>` elements; touch targets ≥44px.
- LightToggle: `aria-pressed`, label "Lighting: off" / "Lighting: on".
- Category button: label "Category: <name>. Change category".
- Current tab/row/header department link: `aria-current="page"`.
- CategorySheet: `role="dialog"`, focus trapped while open, Esc closes, focus returns to the dock button.
- Visible focus outlines. Respect `prefers-reduced-motion` (no fades).
- Text contrast ≥4.5:1 in both moods.

## Placeholders

Until real photos exist, generate placeholder off/on image pairs (e.g. simple SVGs of a lamp
shape on a beige wall, and the same with a warm radial glow on a dark wall) so the toggle can be tested.
