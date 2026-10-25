# Sooner — project brief

Sooner is a **showcase** site (not a shop) for lighting, furniture and objects.
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
  page.tsx                   # redirect to /lighting
  globals.css                # light-off / light-on tokens, base styles
  [department]/page.tsx      # "All" view: /lighting, /furniture, /objects
  [department]/[category]/page.tsx   # /lighting/pendants etc.
components/
  Header.tsx                 # "Sooner" wordmark only
  PageTitle.tsx              # centred: department or category name + "N pieces"
  CategoryBar.tsx            # desktop: centred tabs + LightToggle at right end; sticky on scroll
  MobileDock.tsx             # mobile: floating pill at bottom — category button | light toggle
  CategorySheet.tsx          # mobile: bottom sheet listing categories with counts
  LightToggle.tsx            # the switch; reused in CategoryBar and MobileDock
  ProductGrid.tsx            # 4 cols ≥1024px, 2 cols below
  ProductCard.tsx            # stacked off/on images, name, material
lib/
  light-context.tsx          # client context: lit boolean, toggle(), persisted in localStorage
  products.ts                # getAll, getByDepartment, getByCategory, counts
  categories.ts              # departments → categories (slug + label)
data/products.json
public/images/products/      # <slug>-off.jpg and <slug>-on.jpg for every product
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

Departments and categories:
- lighting: pendants, sconces, table, floor, outdoor
- furniture: (to be decided)
- objects: (to be decided)

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

- Switch tokens with `html[data-light="on"]`; transition background and colour over ~600ms.
- Base text 13px; page title 30px/500 (24px on mobile); wordmark 19px/700, letter-spacing -0.02em.
- Content column: 1048px of content (max-width 1080px including 16px side padding), centred. Grid gap 16px across, 24px down. Card image aspect 5:6 (250×300 at full width).

## Layout

**Desktop (≥1024px)**
- Header: "Sooner" wordmark on the left, nothing else.
- Centred title block: "Lighting" with "113 pieces" underneath (muted).
- Category bar: full column width, rule above and below, 68px tall. Tabs centred as pills
  (selected = filled ink pill with bg-coloured text; others = 1px rule outline). First tab is "All".
  LightToggle at the right end: bulb icon, "Light" label, 34×18 switch.
- When scrolled, the category bar sticks to the top with a soft shadow; header and title scroll away.

**Mobile (<1024px)**
- Header: wordmark only, rule below.
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
- Current tab/row: `aria-current="page"`.
- CategorySheet: `role="dialog"`, focus trapped while open, Esc closes, focus returns to the dock button.
- Visible focus outlines. Respect `prefers-reduced-motion` (no fades).
- Text contrast ≥4.5:1 in both moods.

## Placeholders

Until real photos exist, generate placeholder off/on image pairs (e.g. simple SVGs of a lamp
shape on a beige wall, and the same with a warm radial glow on a dark wall) so the toggle can be tested.
