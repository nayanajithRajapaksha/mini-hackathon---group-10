# AI Prompt Log - IT24100120

This document tracks AI prompts used by student **IT24100120** during the development of ParkingPulse LK (Member 2: Parking Availability Browser).

## Log

| Date | Phase | Prompt Summary | Tool Used | Team Member |
|------|-------|----------------|-----------|-------------|
| 2026-09-04 | Feature 1 | Implement Parking Availability Browser (`ParkingPage`, `ParkingCard`, `StatusBadge`, `parking.css`) | Google Antigravity | IT24100120 |
| 2026-09-04 | Enhancement | Modernize site UI, integrate site logo, and replace emojis with SVG icons | Google Antigravity | IT24100120 |
| 2026-09-04 | Authentication and CRUD | Add login-first access, admin and worker dashboards, parking-worker assignments, and remove predictions | OpenAI Codex | IT24100120 |
| 2026-09-04 | UI refinement | Compact the parking-area form, add field labels, and use a worker dropdown | OpenAI Codex | IT24100120 |
| 2026-09-04 | Version control | Commit and push the completed role-based parking management work | OpenAI Codex | IT24100120 |
| 2026-09-04 | Merge resolution | Resolve pull-request conflicts with the latest `main` branch | OpenAI Codex | IT24100120 |
| 2026-09-04 | Role navigation | Separate admin, worker, and driver landing pages and navigation | OpenAI Codex | IT24100120 |
| 2026-09-04 | Role correction | Repair the reserved admin role and refresh server-authoritative sessions | OpenAI Codex | IT24100120 |
| 2026-09-04 | Worker assignment | Add worker names to assignment dropdown and verify worker reporting flow | OpenAI Codex | IT24100120 |
| 2026-09-04 | Worker login | Diagnose missing worker credentials and add non-destructive development bootstrap | OpenAI Codex | IT24100120 |

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

---

## Prompt 03

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Implement secure role-based authentication, complete administration and worker CRUD workflows, restrict each parking area to assigned workers, remove prediction functionality, and require login before accessing the application.
- **Team member using the tool:** IT24100120

### Exact prompts

```text
implement a user loging part and add admin parts add full crud operations for admin and also add wokers dashboard as well to with full crud operations

now i want admin can add a workers for their parking slots so only their workers can edit that parking slots details and also remember i dont need prediction part so make sure to remove that feature and also when i run project i must need 1st loging to the system and remember updates my AI prompt log md file and submission details file according IT24100120
```

### Review and modification

- Added JWT login persistence and protected all application routes so unauthenticated visitors are redirected to login.
- Restricted public registration to driver accounts; administrators create worker and admin accounts.
- Added an admin dashboard with complete CRUD for users and parking areas.
- Added multi-worker assignment controls for each parking area and stored assignments in MongoDB.
- Enforced worker assignments in backend authorization so workers can only submit or edit availability for their assigned parking areas.
- Added a worker dashboard with create, read, update, and delete operations for availability reports.
- Removed the prediction page, navigation item, frontend API method, backend endpoint, historical pattern model, and prediction seed generation.
- Ran the frontend production build and backend syntax validation after implementation.

---

## Prompt 04

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Improve the administrator parking-area form usability and visual layout.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
i want to edit this part text box are too large and assign workers i need drop down list and also remember above the textbox what that need to input
```

### Review and modification

- Reduced all parking-area inputs to a consistent compact height.
- Added visible labels above the parking-area name, location, total spaces, available spaces, and worker fields.
- Added clearer example placeholders to explain the expected values.
- Replaced the tall multiple-selection box with a standard worker dropdown that includes a `No worker assigned` option.
- Added responsive layouts for desktop, tablet, and mobile widths.

---

## Prompt 05

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Finalize the documentation, commit the completed implementation, and push it to the `IT24100120` branch.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
now push these changes into my branch with commit msg and also update my ai prompt log file and submission details file
```

### Review and modification

- Reviewed the complete authentication, administration, worker-assignment, CRUD, UI, and prediction-removal change set.
- Updated the student-specific AI prompt log and submission details before committing.
- Prepared the verified implementation for delivery on the `IT24100120` branch.

---

## Prompt 06

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Resolve pull-request conflicts between `IT24100120` and the latest `main` branch.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
This branch has conflicts that must be resolved. Use the command line to resolve conflicts before continuing.
```

### Review and modification

- Merged the latest `origin/main` into `IT24100120` and resolved all seven reported conflicts.
- Preserved login-first access, role-based CRUD dashboards, and worker-to-parking assignments.
- Kept compatible parking identifiers and reporting metadata introduced on `main`.
- Preserved the intentional removal of prediction functionality.
- Revalidated the combined frontend and backend before pushing the resolution.

---

## Prompt 07

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Correct overlapping role dashboards and make the authenticated account role clear.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
when i log as a admin why this as a driver i think there is the issue , workers admins and drivers dashboards are overlapping
```

### Review and modification

- Added role-based landing redirects: admins open the admin dashboard, workers open the worker dashboard, and drivers open the parking dashboard.
- Separated navbar links by role so dashboards no longer overlap.
- Displayed the full authenticated email and a clear role badge in the navbar.
- Kept authorization tied to the database role instead of inferring privileges from an email address or username.

---

## Prompt 08

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Fix an existing `admin@parkingpulse.lk` database account incorrectly stored with the driver role.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
still show as a driver so make sure again i want to dashboards are works well in users creditinatials because i log as a admin but it goes to driver dashboard
```

### Review and modification

- Added startup administrator bootstrap and role correction for the reserved administrator email.
- Blocked public driver registration from claiming the reserved administrator address.
- Added authenticated session refresh through `/api/auth/me`, replacing stale browser role data with the current database role.
- Retained strict role-based redirects and dashboard route authorization.

---

## Prompt 09

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Improve named worker assignment and strengthen the worker dashboard workflow.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
i want drop down list and also shows the names of workers in assign workers and make sure worker dashboard work well
```

### Review and modification

- Added names to user accounts and administrator user CRUD forms.
- Updated the assignment dropdown to show each worker's name and email address.
- Added guidance when no worker accounts exist.
- Improved the worker dashboard with labeled fields, assigned-area dropdown details, capacity limits, loading feedback, and empty-assignment guidance.
- Preserved backend authorization so workers can update only their assigned parking areas.

---

## Prompt 10

- **Date and time:** 2026-09-04
- **Tool:** OpenAI Codex
- **Purpose:** Diagnose and correct worker login failure.
- **Team member using the tool:** IT24100120

### Exact prompt

```text
cant loging for workers check it
```

### Review and modification

- Confirmed the API and database connection were healthy.
- Tested the documented worker credentials and reproduced the invalid-credentials response.
- Queried non-sensitive user metadata and confirmed that MongoDB contained only the administrator account.
- Added a non-destructive development bootstrap that creates the documented worker account only when it is missing.
- Kept production worker creation under administrator control unless explicit worker environment credentials are configured.
