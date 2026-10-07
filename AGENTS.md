# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a single-page Next.js website for kids aged 6–10. Bright, rounded, playful design with big buttons, large readable text and emoji. Static mock data only. No login, no forms that collect email or personal info, no external links, no ads, no chat with other people, no real photos of people. Simple positive wording. Works on phone and desktop. Include a header, a main interactive section and a footer.

[shared rules] Make a pet shop game. The player has 100 coins and a row of 4 pets, each with hunger and happiness bars. They can feed (costs coins), play and pet each animal, and the bars update. Add a small shop to buy food and toys, a coin counter, and a "You're a great pet keeper!" message when all pets are happy. State is kept in the page only.

## Goal
Build a single-page, kid-friendly virtual pet shop game called "Pet Pals" with 4 pets, coin management, hunger/happiness bars, an in-game shop, and reward messages — all in React useState on one Next.js page.

## Project type
landing-page

## Design system — match this exactly
- Color tokens: `--background: #FFF4E0`, `--foreground: #2D2D2D`, `--card: #FFFFFF`, `--border: #FFD700`, `--muted-foreground: #6B6B6B`
- Fonts: Nunito

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`cta`, `footer`, `happy_banner`, `hero`, `how_to_play`, `meet_gang`, `meta`, `nav`, `pets`, `shop`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
