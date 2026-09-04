# AI Prompt Log

This document tracks AI prompts used during the development of ParkingPulse LK.

## Log

| Date | Phase | Prompt Summary | Tool Used | Team Member |
|------|-------|----------------|-----------|-------------|
| 2026-09-04 | Foundation | Create React and Express foundation | Google Antigravity | Pasindu (IT24101460) |
| 2026-09-04 | Feature 1 | Parking Availability Browser (`ParkingPage`, `ParkingCard`, `StatusBadge`, `parking.css`) | Google Antigravity | IT24100120 |

---

## Prompt 01

- **Date and time:** 2026-09-04 10:15
- **Tool:** Google Antigravity
- **Purpose:** Create the React and Express project foundation
- **Team member:** Pasindu (IT24101460)
- **Exact prompt:** Copy the complete Prompt 01 exactly
- **Review:** Frontend build, backend health endpoint, and 404 response were tested successfully. No feature code was generated.

---

## Prompt 02

- **Date and time:** 2026-09-04 11:05
- **Tool:** Google Antigravity
- **Purpose:** Implement Parking Availability Browser (Feature 1) with responsive cards, search, filter, and sort controls.
- **Team member:** IT24100120

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

- Created `StatusBadge.jsx` with accessible status badges (`🟢 Available`, `🟡 Limited`, `🔴 Full`) and text labels.
- Created `ParkingCard.jsx` displaying location, capacity meter bar, remaining spaces, update timestamp, and latest note.
- Created `ParkingPage.jsx` integrating live `getParkingAreas` API calls with graceful demonstration fallback data, case-insensitive keyword search, status filtering, and dual sorting (latest / most free spaces).
- Created `parking.css` ensuring full mobile and desktop responsiveness without horizontal scrollbars.
- Successfully verified frontend production bundle build with `vite build` (53 modules transformed cleanly in 1.06s).




