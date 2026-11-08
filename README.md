# FORGD — Workout Clothing Storefront

A static, responsive storefront for a workout clothing brand. Its layout is inspired by premium athletic-lifestyle sites, but it has its own brand, copy and look.

## Run it
Open `index.html` in a browser. No build step is needed.

Or serve it locally:

```bash
npx serve .
```

## Structure
- `index.html`: page markup and sections
- `css/styles.css`: all styles. Brand colors and fonts are CSS variables at the top (`--accent`, `--display`, …)
- `js/products.js`: product catalogue and reviews. Edit names, prices and images here.
- `js/main.js`: product rendering, tabs, carousel, cart drawer (saved in localStorage), search, mobile menu, review slider

## Sections
Announcement bar · sticky header with mega menu · hero · Best Sellers carousel (tabs) · Iron Collection split banner + grid · parallax "No Days Off" drop · category tiles · marquee · women's Sculpt Sets banner + filtered grid · Run Club banner · New Arrivals · perks · reviews slider · social grid · footer with newsletter

## Customising
- **Logo:** the header, mobile menu and footer show the placeholder text `LOGO`. Search for `logo__text` in `index.html` to change it.
- **Brand name:** search and replace `FORGD`.
- **Accent color:** change `--accent` in `css/styles.css`.
- **Images:** currently free Unsplash photos. Replace them with the client's own product and campaign photography.
