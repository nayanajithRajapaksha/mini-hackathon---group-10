# AI Prompt Log

This document tracks AI prompts used during the development of ParkingPulse LK.

## Log

| Date | Phase | Prompt Summary | Tool Used | Team Member |
|------|-------|----------------|-----------|-------------|
| 2026-09-04 | Foundation | Create React and Express foundation | Google Antigravity | Pasindu (IT24101460) |
| 2026-09-04 | Feature 1 | Parking Availability Browser (`ParkingPage`, `ParkingCard`, `StatusBadge`, `parking.css`) | Google Antigravity | IT24100120 |
| 2026-09-04 | Feature 3 | Report Availability Form (`ReportPage`, `updateValidation`, `api.js`, backend endpoints) | Google Antigravity | IT24101200 |

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


---

## Prompt 03

- **Date and time:** 2026-09-04 11:30
- **Tool:** Google Antigravity
- **Purpose:** Implement Report Availability Form (Feature 3) with client-side and server-side validation and backend APIs.
- **Team member:** IT24101200

### Exact prompt

```text
can you read ParkingPulse_LK_Master_Project_Plan.md file and get a idea of this project. then study already made project structure. i need complete this part "Member 3 — Report Availability Form

Branch: feature/availability-form

Work:

Parking-area selection
Available-spaces input
Observation date and time
Note input
Friendly input validation
Connect form to the backend
Display success and error messages

Main files:

ReportPage.jsx
updateValidation.js
form.css"
can you create implementation pplan for member 3 

...

member 4 built backend now. can you check this and it not build yet you can create.
other thing doing as you wish
```

### Review and modification

- Created backend Mongoose models (`ParkingArea`, `ParkingUpdate`, `HistoricalPattern`), utils (`calculateStatus`, `calculatePrediction`), and sample seed data.
- Built backend APIs (`parkingRoutes`, `updateRoutes`, `predictionRoutes`) and server-side validation middleware (`validateUpdate`).
- Created `ReportPage.jsx` for the frontend form, integrated with API (`api.js`).
- Implemented robust client-side validation (`updateValidation.js`).
- Added responsive styling (`form.css`).
- Integrated routing in `App.jsx`.
- Verified endpoints and form flow successfully.

