# AI Prompt Log - IT24100120

This document tracks AI prompts used by student **IT24100120** during the development of ParkingPulse LK (Member 2: Parking Availability Browser).

## Log

| Date | Phase | Prompt Summary | Tool Used | Team Member |
|------|-------|----------------|-----------|-------------|
| 2026-09-04 | Feature 1 | Implement Parking Availability Browser (`ParkingPage`, `ParkingCard`, `StatusBadge`, `parking.css`) | Google Antigravity | IT24100120 |
| 2026-09-04 | Enhancement | Modernize site UI, integrate site logo, and replace emojis with SVG icons | Google Antigravity | IT24100120 |

---

## Prompt 01

- **Date and time:** 2026-09-04 11:05
- **Tool:** Google Antigravity
- **Purpose:** Build the complete Parking Availability Browser (Feature 1) including responsive cards, status badges, search, filter, sort controls, and error/empty states.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
Parking Availability Page
Branch: feature/parking-browser
Work:
- Display parking-area cards
- Show available spaces and total spaces
- Show 🟢 Available, 🟡 Limited, and 🔴 Full
- Search parking areas
- Filter by status
- Sort by latest update or available spaces
- Loading, error, and no-result messages
- Responsive card design

Main files:
ParkingPage.jsx
ParkingCard.jsx
StatusBadge.jsx
parking.css
```

### Review and modification

- Verified that `StatusBadge.jsx` renders accessible badges with status colors and text for Available, Limited, and Full states.
- Verified that `ParkingCard.jsx` shows parking name, Kandy location, capacity progress bar, available/total spaces, last updated time, and latest observation notes.
- Tested `ParkingPage.jsx` with case-insensitive search by name and location, status filter, and sorting by latest update and most available spaces.
- Added graceful error handling and retry mechanism when the backend API is starting or unreachable, with sample demonstration data fallback.
- Validated responsive layout for mobile (375px) and desktop (1440px) without horizontal overflow.

---

## Prompt 02

- **Date and time:** 2026-09-04 11:33
- **Tool:** Google Antigravity
- **Purpose:** Incorporate official `Parking_Pulse.png` logo and modernize the site UI by replacing emoji icons with accessible SVG icons and glowing status indicators.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
use this image as a our site logo so remove the emojis and modify the site as a modern site
```

### Review and modification

- Copied `Parking_Pulse.png` into `frontend/public/` as the site logo and favicon.
- Updated `Navbar.jsx` and `Footer.jsx` to render the clean logo image alongside branded typography.
- Replaced emoji indicators (`🟢`, `🟡`, `🔴`) in `StatusBadge.jsx` with sleek glowing status dots (`status-dot`) and updated the status filter dropdown.
- Replaced emojis in `ParkingCard.jsx` (`📍`, `💬`, `🕒`) and `HomePage.jsx` (`🅿️`, `📢`, `📊`) with clean, lightweight inline SVGs.
- Polished `parking.css` and `global.css` with modern design tokens, rounded pills, subtle hover elevations, and a live pulse indicator.
- Verified that `npm run build` succeeds cleanly in under 1 second.

