# ParkingPulse LK - Master Project Plan

**Module:** SE3090 - Software Engineering Frameworks  
**Assessment:** Assignment 2 - Mini Hackathon  
**Team size:** 4 students  
**Build time:** 4 hours  
**Target location:** Kandy city centre, Sri Lanka  
**Document version:** 1.1 - 4 September 2026 (MongoDB requirement added)  
**Project status:** Planning approved; manual setup must happen before AI-assisted feature generation

---

## 1. Important Findings From the Official Specification

The assignment does **not** give one fixed topic. Each team must select a genuine current problem affecting Sri Lankan people, communities, businesses, or the environment.

The official PDF requires:

1. A real Sri Lankan problem and a practical solution.
2. A working application, not a presentation or static mock-up.
3. All 10 minimum software requirements.
4. A public deployment.
5. Meaningful Git contributions from every registered member.
6. A complete `README.md`.
7. A demonstration video no longer than two minutes.
8. A mandatory AI Prompt Log in the submission PDF.
9. An AI-use declaration in both the README and submission PDF.
10. One final submission PDF named using the Group ID.

An AI-powered application feature is optional. ParkingPulse LK will include a simple pattern-based prediction feature, but the team will not falsely describe it as machine learning or advanced AI. AI tools will be used as development assistants, which is permitted. Every member must understand, review, test, and be able to explain the code they submit.

---

## 2. Selected Project

### 2.1 Project name

**ParkingPulse LK**

### 2.2 Tagline

**Check spaces. Share updates. Park with less searching.**

### 2.3 Selected Sri Lankan problem

Drivers visiting busy Kandy city-centre areas may spend unnecessary time moving between parking locations because they cannot easily check which location is likely to have free spaces. This wastes time and fuel, increases driver stress, and adds avoidable vehicle movement to already congested roads.

Instead of attempting an unrealistic nationwide parking platform, this prototype focuses only on selected demonstration parking areas in Kandy city centre.

The main affected users are:

- Drivers travelling into Kandy city centre
- Workers and students who park in busy areas
- Visitors and domestic tourists unfamiliar with local parking options
- Parking attendants or community members who can share availability updates

The problem is supported by Kandy-specific research. A University of Moratuwa study reports that on-street parking affects traffic speed in Kandy, while University of Peradeniya research discusses the time and productivity lost through Kandy traffic congestion. Research on smart parking at Kandy City Center also identifies the value of finding empty spaces earlier.

Problem evidence:

- [University of Moratuwa - behaviour and impacts of on-street parking in Kandy](https://dl.lib.uom.lk/items/5d123937-b3d1-4972-aa91-072846de5546)
- [University of Peradeniya - loss of manpower due to road traffic congestion in Kandy](https://ir.lib.pdn.ac.lk/items/8b89e240-3fa2-4817-bac5-14d7f65f1381)
- [Kandy City Center smart parking research](https://www.researchgate.net/publication/377262148_IoT-based_Smart_Parking_System_for_the_Kandy_City_Center_KCC_car_park_in_Sri_Lanka)

These sources only support the problem choice. The application will use clearly labelled sample data and will not claim to provide official live parking information.

### 2.4 Proposed solution

ParkingPulse LK is a small responsive web application where a user can:

1. View the latest reported number of free spaces at selected Kandy parking areas.
2. Search and filter parking areas by name and availability status.
3. Submit a new parking-availability update with validation.
4. Request a simple availability prediction for a selected location, day type, and time period based on sample historical patterns.

The app is a student prototype, not an official parking or reservation service. A visible notice will tell users to confirm availability when they arrive because parking conditions can change quickly.

### 2.5 One-sentence pitch

ParkingPulse LK helps drivers reduce unnecessary parking searches in Kandy by combining community updates with a simple historical availability estimate.

---

## 3. Why This Idea Fits a Four-Hour Student Hackathon

- The problem is specific to a real Sri Lankan city and clearly affects drivers.
- The scope is one small area, not the whole country.
- The solution directly connects the problem to working features.
- It contains three strong functional features without complex technology.
- The colour-coded availability is easy to understand and demonstrate.
- The prediction is simple, transparent, and easy for students to explain.
- It requires no login, map, payment, sensor, camera, or paid external API.
- It uses a simple MongoDB database structure that students can explain.
- All four members receive separate meaningful coding work.
- It can be deployed as one full-stack service with one public application link.

---

## 4. MVP Scope Lock

### 4.1 Features that must be built

#### Feature 1 - Current Parking Availability Board

Display responsive cards for selected demonstration parking areas. Every card shows:

- Parking-area name
- Short Kandy location description
- Available spaces
- Total spaces
- Colour-coded status
- Last reported date and time
- Latest short note

The user can:

- Search by parking-area name or location
- Filter by availability status
- Sort by latest update or highest number of available spaces
- Clear the search and filter controls

#### Feature 2 - Submit a Parking Update

The user selects an existing parking area and enters:

- Number of spaces currently available
- Date and time observed
- Optional short note

The form checks the values, displays friendly error messages, sends valid data to the backend, and shows a clear success message. The backend updates the selected parking area's current availability and automatically calculates its status.

#### Feature 3 - Pattern-Based Availability Prediction

The user selects:

- Parking area
- Day type: Weekday or Weekend
- Time period: Morning, Midday, or Evening

The backend finds matching sample historical values and calculates the rounded average number of available spaces.

The result shows:

- Selected parking area
- Selected day type and time period
- Predicted free spaces
- Predicted availability status
- Number of sample historical observations used
- A clear estimate disclaimer

The interface must call this a **pattern-based estimate**, not a guaranteed live result and not an advanced AI model.

#### Supporting Feature - Home Dashboard

The landing page shows:

- The Kandy parking problem and proposed solution
- Number of demonstration parking areas
- Total parking capacity
- Total currently reported free spaces
- Number of areas currently full
- Clear buttons to check parking, report availability, and predict availability

The statistics are calculated from the current backend data.

### 4.2 Features that must not be added during the four-hour build

- User registration or login
- Admin roles and permissions
- Parking reservations
- Online payments
- Google Maps or live GPS navigation
- IoT sensor integration
- Number-plate recognition
- Camera or image uploads
- SMS, email, or push notifications
- Machine-learning model training
- Real-time sockets
- Complex database relationships
- Nationwide or multi-city support
- Any feature not required by the marking scheme

These may be mentioned only as future improvements.

---

## 5. Users and User Flow

### 5.1 User types

The MVP has one general public user type. No authentication is required.

The same user may:

- View parking availability before entering central Kandy
- Search for a suitable parking location
- Report the number of available spaces they observe
- Check an estimated future availability pattern

Parking attendants are possible contributors, but the prototype does not create a separate attendant role.

### 5.2 Flow A - Find a Parking Area

1. User opens the Home page.
2. User selects **Check Parking**.
3. User searches by name/location or selects a status filter.
4. Matching parking cards are displayed.
5. User compares available spaces and last-update time.

### 5.3 Flow B - Report Current Availability

1. User opens **Report Availability**.
2. User selects one listed parking area.
3. The form displays that area's total capacity.
4. User enters the observed number of free spaces, time, and optional note.
5. Invalid input produces a friendly field message.
6. Valid input is sent to the backend.
7. The app displays a success message.
8. The updated number and status appear on the Parking page.

### 5.4 Flow C - Predict Availability

1. User opens **Predict Availability**.
2. User selects a parking area, day type, and time period.
3. The frontend validates the selection.
4. The backend averages the matching historical sample values.
5. The app displays the predicted spaces, status, and observation count.
6. The user sees that the output is an estimate, not a reservation or guarantee.

---

## 6. Pages and Interface Content

### 6.1 Home page - `/`

Required sections:

1. Navigation bar with project name and four links.
2. Hero section with the tagline and two main action buttons.
3. Short explanation of the Kandy parking problem.
4. Short explanation of how ParkingPulse LK helps.
5. Live summary cards calculated from parking data.
6. Three feature cards.
7. Prototype and data disclaimer.
8. Simple footer with team and module details.

### 6.2 Parking page - `/parking`

Required sections:

1. Page title and short instruction.
2. Demonstration-data notice.
3. Search input.
4. Status filter.
5. Sort selector.
6. Clear Controls button.
7. Result count.
8. Responsive parking-card grid.
9. Loading, backend-error, and no-results states.

### 6.3 Report Availability page - `/report`

Required sections:

1. Short purpose statement.
2. Parking-area dropdown.
3. Selected area's total-capacity information.
4. Available-spaces number input.
5. Observed date/time input.
6. Optional note input.
7. Inline validation errors.
8. Submit button with submitting state.
9. Success message after a valid update.
10. General message if the server request fails.

### 6.4 Prediction page - `/predict`

Required sections:

1. Simple explanation of historical-average prediction.
2. Parking-area dropdown.
3. Day-type dropdown.
4. Time-period dropdown.
5. Friendly validation messages.
6. Predict button with loading state.
7. Clear button.
8. Result card.
9. Calculation explanation.
10. Prediction disclaimer.

---

## 7. Navigation

The navigation links are:

- Home
- Check Parking
- Report Availability
- Predict Availability

On small screens, links may wrap or stack. A JavaScript hamburger menu is not required unless all important work is already complete. The current page must have a clear active style.

---

## 8. Technology Decisions

### 8.1 Selected stack

| Area | Technology | Reason |
|---|---|---|
| Frontend | React with Vite | Fast setup, familiar components, and easy responsive pages |
| Navigation | React Router | Simple page navigation without reloads |
| Styling | Plain CSS | No extra configuration and easy to explain |
| Backend | Node.js with Express | Small understandable REST API and easy deployment |
| Database | MongoDB Atlas with Mongoose | Provides required persistent cloud storage and fits the Node.js backend |
| API calls | Browser `fetch` | Avoids an unnecessary HTTP dependency |
| Repository | GitHub | Required collaboration and contribution evidence |
| Deployment | One Render Web Service | Serves both Express API and built React application with one public link |
| AI assistance | ChatGPT and Google Antigravity | Planning, selected code assistance, debugging, and documentation with human review |

### 8.2 Database decision

A database is required for this project, so ParkingPulse LK will use **MongoDB Atlas** through **Mongoose**.

MongoDB is suitable because:

- It works directly with the selected Node.js and Express backend.
- The document structure is simple for students to understand.
- It stores parking areas, updates, and historical patterns persistently.
- The deployed Render service can connect using one environment variable.
- Sample records can be inserted automatically when the database is empty.

Use three collections:

- `parkingareas`
- `parkingupdates`
- `historicalpatterns`

The MongoDB connection string must be stored in `backend/.env` locally and as a secret environment variable on Render. It must never be committed to GitHub.

### 8.3 What the prediction really is

The prediction is a simple average of matching historical demonstration values:

```text
predicted spaces = rounded sum of matching free-space values / number of matching values
```

This approach is selected because it is:

- Fast to implement
- Easy to test
- Transparent to the user
- Easy for every member to explain
- Appropriate for a student prototype

It must not be presented as a trained machine-learning model. The optional AI requirement does not need to be used to obtain full marks.

---

## 9. Simple System Architecture

```text
Mobile or Desktop Browser
          |
          v
React Frontend
  - Home dashboard
  - Parking search and filters
  - Update form and client validation
  - Prediction form and result
          |
          | fetch('/api/...')
          v
Express Backend
  - Parking area endpoint
  - Availability update endpoint
  - Prediction endpoint
  - Server validation and health check
          |
          v
MongoDB Atlas
  - Parking areas
  - Availability updates
  - Historical sample patterns
```

During local development, Vite proxies `/api` requests to Express. In production, Express serves the API and the built React files from the same Render service.

---

## 10. Target Folder Structure

This structure must be created during the manual setup stage before feature prompts are given to Antigravity.

```text
parkingpulse-lk/
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- ParkingCard.jsx
|   |   |   `-- StatusBadge.jsx
|   |   |-- pages/
|   |   |   |-- HomePage.jsx
|   |   |   |-- ParkingPage.jsx
|   |   |   |-- ReportPage.jsx
|   |   |   `-- PredictionPage.jsx
|   |   |-- services/
|   |   |   `-- api.js
|   |   |-- utils/
|   |   |   `-- updateValidation.js
|   |   |-- styles/
|   |   |   |-- global.css
|   |   |   |-- home.css
|   |   |   |-- parking.css
|   |   |   |-- form.css
|   |   |   `-- prediction.css
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
|
|-- backend/
|   |-- config/
|   |   `-- db.js
|   |-- models/
|   |   |-- ParkingArea.js
|   |   |-- ParkingUpdate.js
|   |   `-- HistoricalPattern.js
|   |-- data/
|   |   `-- seedData.js
|   |-- routes/
|   |   |-- parkingRoutes.js
|   |   |-- updateRoutes.js
|   |   `-- predictionRoutes.js
|   |-- middleware/
|   |   `-- validateUpdate.js
|   |-- utils/
|   |   |-- calculateStatus.js
|   |   `-- calculatePrediction.js
|   |-- server.js
|   |-- .env.example
|   `-- package.json
|
|-- docs/
|   |-- AI_PROMPT_LOG.md
|   `-- SUBMISSION_DETAILS.md
|
|-- .gitignore
|-- README.md
|-- render.yaml
`-- ParkingPulse_LK_Master_Project_Plan.md
```

Do not add unnecessary folders or complex architecture.

---

## 11. Data Design

Mongoose models map the following documents to MongoDB Atlas collections. Use simple schema validation and automatic timestamps.

### 11.1 Parking-area data model

```js
{
  id: "P001",
  name: "KCC Demo Parking Area A",
  location: "Dalada Veediya area, Kandy",
  totalSpaces: 20,
  availableSpaces: 8,
  status: "Available",
  lastUpdated: "2026-09-04T08:15:00.000Z",
  note: "Spaces reported near the main entrance."
}
```

### 11.2 Availability-update input model

```js
{
  parkingId: "P001",
  availableSpaces: 8,
  observedAt: "2026-09-04T08:15",
  note: "Spaces reported near the main entrance."
}
```

After validation, the backend saves a `ParkingUpdate` document and updates the matching `ParkingArea` document with the newest available spaces, status, observation time, and note.

### 11.3 Historical-pattern model

```js
{
  parkingId: "P001",
  dayType: "Weekday",
  timeSlot: "Morning",
  samples: [7, 9, 8, 10]
}
```

Historical patterns are stored in their own MongoDB collection and read by the prediction endpoint.

The prediction for this example is:

```text
(7 + 9 + 8 + 10) / 4 = 8.5, rounded to 9 predicted spaces
```

### 11.4 Allowed availability statuses

- Available
- Limited
- Full

Status is calculated automatically:

```text
If availableSpaces is 0:
    status = Full
Else if availableSpaces / totalSpaces is 0.25 or less:
    status = Limited
Else:
    status = Available
```

### 11.5 Allowed day types

- Weekday
- Weekend

### 11.6 Allowed time periods

- Morning: 6:00 AM to before 10:00 AM
- Midday: 10:00 AM to before 3:00 PM
- Evening: 3:00 PM to 8:00 PM

The user selects the period directly. The prototype does not need automatic time detection.

---

## 12. Sample Data Plan

Create four fictional demonstration parking records using Kandy location labels:

| ID | Demo parking area | Total | Available | Status |
|---|---|---:|---:|---|
| P001 | KCC Demo Parking Area A | 20 | 8 | Available |
| P002 | Municipal Demo Parking Area B | 24 | 0 | Full |
| P003 | Bogambara Demo Parking Area C | 20 | 2 | Limited |
| P004 | Clock Tower Demo Parking Area D | 18 | 6 | Available |

This matches the simple visual idea:

- Area A: green, 8 spaces
- Area B: red, full
- Area C: amber, 2 spaces
- Area D: green, 6 spaces

Create historical sample patterns for every parking area across:

- Weekday Morning, Midday, and Evening
- Weekend Morning, Midday, and Evening

Each combination should contain four small historical free-space values. Values must remain between zero and that area's total capacity.

The UI must display this notice:

> Demo notice: Parking availability and predictions in this student prototype use sample and community-reported information. Spaces are not reserved or guaranteed. Confirm availability when you arrive.

Do not use real phone numbers, personal information, or claims that the sample values are official live data.

---

## 13. API Contract

### 13.1 Health check

`GET /api/health`

Successful response:

```json
{
  "status": "ok",
  "message": "ParkingPulse LK API is running"
}
```

### 13.2 Get parking areas

`GET /api/parking-areas`

Successful response: `200 OK`

```json
{
  "success": true,
  "count": 4,
  "data": []
}
```

The `data` array contains the four current parking-area objects.

The backend reads these documents from the MongoDB `parkingareas` collection.

### 13.3 Submit availability update

`POST /api/parking-updates`

Request body:

```json
{
  "parkingId": "P002",
  "availableSpaces": 5,
  "observedAt": "2026-09-04T09:15",
  "note": "A few vehicles have just left."
}
```

Successful response: `200 OK`

```json
{
  "success": true,
  "message": "Thank you. The parking availability was updated successfully.",
  "data": {}
}
```

For a valid request, the backend performs two database operations:

1. Save the submitted observation in `parkingupdates`.
2. Update the matching document in `parkingareas` with its latest values.

Invalid response: `400 Bad Request`

```json
{
  "success": false,
  "message": "Please correct the highlighted information.",
  "errors": {
    "availableSpaces": "Available spaces cannot be greater than this parking area's total capacity."
  }
}
```

### 13.4 Predict availability

`GET /api/predictions?parkingId=P001&dayType=Weekday&timeSlot=Morning`

Successful response: `200 OK`

```json
{
  "success": true,
  "data": {
    "parkingId": "P001",
    "parkingName": "KCC Demo Parking Area A",
    "dayType": "Weekday",
    "timeSlot": "Morning",
    "predictedAvailableSpaces": 9,
    "predictedStatus": "Available",
    "sampleCount": 4
  }
}
```

Invalid or missing query values return `400` with friendly field errors. Unknown API routes return simple `404` JSON. Unexpected errors return simple `500` JSON without exposing technical details.

The prediction endpoint loads the matching document from `historicalpatterns` before calculating the average.

---

## 14. Validation Rules

Validation must happen in both the frontend and backend for the availability update. Frontend validation helps the user; backend validation protects the API.

### 14.1 Availability update form

| Field | Rule | Friendly message example |
|---|---|---|
| Parking area | Required and must match a known ID | Please select a parking area. |
| Available spaces | Required whole number from 0 to the selected area's capacity | Enter a whole number between 0 and 24. |
| Observed date/time | Required and cannot be in the future | Observation time cannot be in the future. |
| Note | Optional, but no more than 120 characters | Please keep the note under 120 characters. |

Text must be trimmed before submission. The backend must use its own parking capacity when checking the available-space value; it must not trust a capacity sent by the frontend.

### 14.2 Prediction form

| Field | Rule | Friendly message example |
|---|---|---|
| Parking area | Required and must be known | Please select a parking area. |
| Day type | Weekday or Weekend | Please select a day type. |
| Time period | Morning, Midday, or Evening | Please select a time period. |

### 14.3 Prediction calculation

```text
matchingSamples = historical samples for selected parking + day type + time period
average = sum(matchingSamples) / matchingSamples.length
predictedAvailableSpaces = round(average)
predictedStatus = calculate status using predicted spaces and total capacity
sampleCount = matchingSamples.length
```

If no matching sample group exists, return a friendly no-data message instead of producing a false prediction.

---

## 15. Search, Filter, and Sort Logic

The Parking page stores:

- `searchTerm`
- `selectedStatus`
- `sortOption`

Search is case-insensitive and checks:

- Parking-area name
- Location description

Status filtering uses exact matches. An empty status means **All Statuses**.

Sort options are:

- Latest Update
- Most Spaces Available

Clear Controls resets search, filter, and sorting. The result count updates immediately. Current data should not be changed by searching or filtering.

---

## 16. UI and Responsive Design Rules

### 16.1 Visual style

- Primary colour: deep blue
- Secondary colour: teal
- Accent colour: amber
- Background: very light grey
- Available badge: green with text
- Limited badge: amber with text
- Full badge: red with text
- Error colour: red
- Use one common system font stack
- Use consistent spacing and rounded cards
- Maintain clear contrast and readable font sizes

### 16.2 Parking-card status display

- **Available:** green indicator and available-space number
- **Limited:** amber indicator and available-space number
- **Full:** red indicator and `0 spaces - Full`

Do not communicate status only through colour. Always include the status word.

### 16.3 Usability requirements

- Every form input has a visible label.
- Error text appears next to the relevant input.
- Every visible button performs a real action.
- Loading, success, error, empty, and no-history states are visible.
- Keyboard focus is visible.
- Last-update time is easy to find.
- New availability data appears without confusing the user.
- Prediction results explain how many samples were used.
- Disclaimers are readable but do not dominate the page.

### 16.4 Responsive behaviour

- Desktop content uses a centred maximum width.
- Multiple columns become one column on narrow screens.
- Parking cards do not cause horizontal scrolling.
- Forms use full-width controls on mobile.
- Navigation links wrap or stack on mobile.
- Buttons remain large enough to tap.
- Test near 375 px and 1440 px widths.

No complex animation is required.

---

## 17. Work Ownership for Four Members

Replace Member 1 to Member 4 with the real names and student IDs. Every member must use their own Git identity and write their final contribution statement in their own words.

### Member 1 - Application Shell, Home, and Prediction UI

**Branch:** `feature/home-prediction`

Owned files and work:

- `App.jsx`
- `Navbar.jsx`
- `Footer.jsx`
- `HomePage.jsx`
- `PredictionPage.jsx`
- `global.css`, `home.css`, and `prediction.css`
- Connect the final routes after branches are merged
- Connect the prediction form to the prediction endpoint

Suggested meaningful commits:

1. `Create responsive navigation and application layout`
2. `Build landing page with problem and parking summary`
3. `Add historical availability prediction interface`
4. `Add prediction states and responsive page styles`

### Member 2 - Parking Availability Browser

**Branch:** `feature/parking-browser`

Owned files and work:

- `ParkingPage.jsx`
- `ParkingCard.jsx`
- `StatusBadge.jsx`
- `parking.css`
- Load data from `GET /api/parking-areas`
- Implement search, status filter, sorting, result count, and empty state

Suggested meaningful commits:

1. `Create responsive parking availability cards`
2. `Load and display parking areas from the API`
3. `Add parking search filter and sorting controls`
4. `Add loading error and empty result states`

### Member 3 - Availability Update Form

**Branch:** `feature/availability-form`

Owned files and work:

- `ReportPage.jsx`
- `updateValidation.js`
- `form.css`
- Connect form to `POST /api/parking-updates`
- Display selected capacity
- Add submitting, validation, success, and server-error states

Suggested meaningful commits:

1. `Create parking availability update form`
2. `Add friendly client-side update validation`
3. `Connect availability form to backend API`
4. `Add submission feedback and responsive form styles`

### Member 4 - Backend, Prediction Logic, and Deployment

**Branch:** `feature/api-deployment`

Owned files and work:

- `backend/server.js`
- `backend/config/db.js`
- `backend/models/ParkingArea.js`
- `backend/models/ParkingUpdate.js`
- `backend/models/HistoricalPattern.js`
- `backend/data/seedData.js`
- All backend route files
- `backend/middleware/validateUpdate.js`
- `calculateStatus.js`
- `calculatePrediction.js`
- Backend `package.json`
- Production static-file serving
- `render.yaml`
- Backend and public-deployment testing

Suggested meaningful commits:

1. `Connect Express server to MongoDB Atlas`
2. `Add parking models and database seed data`
3. `Add parking query and validated update endpoints`
4. `Implement database-backed historical prediction`
5. `Configure and test Render production deployment`

### Shared work

- Each member tests their own feature before merging.
- Each member reviews at least one other feature.
- Each member writes their own README contribution statement.
- Each member must be ready to explain their files and make a small live change.
- All four members should speak briefly in the demonstration video if possible.

Do not create fake commits, rewrite another person's authorship, or let one member commit everybody's completed work.

---

## 18. Git Workflow

1. One member creates the empty GitHub repository.
2. Complete the agreed manual frontend and backend setup.
3. Push the clean working foundation to `main`.
4. Every member clones or pulls the same foundation.
5. Every member confirms their own Git name and email.
6. Every member creates their assigned branch.
7. Members commit small completed units with meaningful messages.
8. Members push their own branches.
9. Merge one branch at a time and test after each merge.
10. Push the tested integrated version to `main`.
11. Deploy only the tested `main` branch.

Before beginning, each member pulls the latest foundation. Members should avoid editing files owned by another member unless the team agrees, which reduces merge conflicts.

---

## 19. Manual Setup Checkpoint Before Antigravity

No feature-generation prompt should be used until every item below is complete:

- Root project folder created manually
- Git repository initialized and connected to GitHub
- React/Vite frontend created manually
- Express backend created manually
- Basic required packages installed
- `.gitignore` created
- MongoDB Atlas project and database user created
- Local `backend/.env` contains the MongoDB connection string
- `.env` is ignored by Git and `.env.example` contains no secret
- Frontend starter page runs locally
- Backend connects to MongoDB and its health endpoint runs locally
- Sample parking areas and historical patterns are seeded only when collections are empty
- Frontend reaches the backend health endpoint through the Vite proxy
- Clean foundation committed and pushed to `main`
- Four feature branches created from the same working `main`

After this checkpoint, give Antigravity one small feature prompt at a time. Inspect and test every output before continuing.

---

## 20. Implementation Order After Manual Setup

1. MongoDB connection, Mongoose models, and seed data
2. `GET /api/parking-areas`
3. Shared application navigation and routes
4. Parking cards, search, filter, and sorting
5. Availability update form and frontend validation
6. `POST /api/parking-updates` and frontend integration
7. Home dashboard statistics
8. Historical pattern query and prediction endpoint
9. Prediction interface and result display
10. Responsive styling, integration testing, and production configuration
11. Deployment, README, AI log, video, and submission PDF

Do not start another optional feature after minute 175.

---

## 21. Four-Hour Control Schedule

This follows the official recommended schedule.

| Time | Phase | Required outcome |
|---|---|---|
| 0-20 min | Plan | Scope and master plan locked |
| 20-45 min | Design and setup | Manual structure runs and work is divided |
| 45-175 min | Build | Three features integrated and running |
| 175-205 min | Polish | Validation, mobile layout, and errors tested |
| 205-225 min | Ship | Final code pushed and public deployment verified |
| 225-240 min | Submit | Video recorded and final PDF uploaded |

Hard rules:

- Lock scope by minute 20.
- Stop adding features by minute 175.
- Start deployment no later than minute 205.
- Keep the final 15 minutes for video and submission checks.

---

## 22. Requirement-to-Feature Mapping

| Official minimum requirement | ParkingPulse LK evidence | Owner |
|---|---|---|
| 1. Clear landing page or main UI | Home page with hero, problem, solution, dashboard, and actions | Member 1 |
| 2. Sri Lankan problem explained inside app | Visible Kandy city-centre parking problem section | Member 1 |
| 3. At least two functional features | Parking browser, update form, and prediction | All members |
| 4. At least one user-input form | Availability update and prediction forms | Members 1 and 3 |
| 5. Friendly input validation | Inline client errors and backend update validation | Members 1, 3, and 4 |
| 6. Display/search/filter/calculate/update/process | Cards, search/filter/sort, live update, and prediction calculation | All members |
| 7. Responsive interface | Mobile and desktop CSS for every page | Members 1, 2, and 3 |
| 8. Basic navigation | Four React Router links | Member 1 |
| 9. Relevant sample data | Four Kandy demo areas and historical pattern samples | Member 4 |
| 10. Clear value to Sri Lankan users | Complete check/report/predict demonstration for Kandy drivers | All members |

Check this table before deployment. Missing one item can directly reduce the 20-mark functional-requirements score.

---

## 23. Rubric Strategy

| Rubric criterion | Marks | Evidence to prepare |
|---|---:|---|
| Relevance of Sri Lankan problem | 10 | Clearly named Kandy location, affected drivers, and supporting local research |
| Practicality and creativity | 15 | Focused community availability plus explainable pattern prediction |
| Minimum functional requirements | 20 | All 10 mapped and tested |
| Quality and usability | 15 | Clean cards, responsive pages, friendly validation, complete states |
| Effective technology and AI use | 10 | Simple justified stack, transparent algorithm, prompt log, reviewed AI output |
| Git repository and documentation | 10 | Individual meaningful commits and complete README |
| Successful deployment | 10 | Public link tested in an incognito window |
| Two-minute demonstration | 5 | Timed demo of problem, working features, deployment, and impact |
| Contribution from all members | 5 | Commits, own-word statements, and demo participation from all four |

Highest-risk marks are functional requirements, usability, Git history, and deployment. Finish them before visual extras.

---

## 24. Testing Checklist

### 24.1 Frontend

- [ ] Home page loads without console errors.
- [ ] All four navigation links work.
- [ ] Current page has an active navigation style.
- [ ] Dashboard statistics match the parking data.
- [ ] Parking areas load from the backend.
- [ ] Green, amber, and red cards show the correct status text.
- [ ] Search works with upper- and lowercase text.
- [ ] Status filter works.
- [ ] Latest Update sort works.
- [ ] Most Spaces Available sort works.
- [ ] Combined search and filter work.
- [ ] Clear Controls resets everything.
- [ ] No-results message appears correctly.
- [ ] Update form shows required-field errors.
- [ ] Negative available spaces are rejected.
- [ ] Decimal available spaces are rejected.
- [ ] A number above the selected capacity is rejected.
- [ ] A future observation time is rejected.
- [ ] Valid update shows a success message.
- [ ] Updated parking card shows the new number and status.
- [ ] Prediction form rejects missing selections.
- [ ] Prediction result matches a manual average calculation.
- [ ] Prediction status matches the result and capacity.
- [ ] Prediction Clear button resets selections and result.
- [ ] All pages work near 375 px width.
- [ ] All pages work near 1440 px width.
- [ ] No horizontal page scrolling appears on mobile.

### 24.2 Backend

- [ ] `GET /api/health` returns `200`.
- [ ] Backend starts only after connecting successfully to MongoDB Atlas.
- [ ] Sample seed does not create duplicates after a restart.
- [ ] `GET /api/parking-areas` returns four sample areas.
- [ ] Valid `POST /api/parking-updates` returns `200`.
- [ ] Update changes available spaces, status, time, and note.
- [ ] Availability update is saved in the `parkingupdates` collection.
- [ ] Changed parking availability remains after restarting the backend.
- [ ] Invalid parking ID returns `400`.
- [ ] Invalid available-space value returns `400`.
- [ ] Valid prediction query returns the expected average.
- [ ] Invalid prediction query returns `400`.
- [ ] Missing historical group returns a friendly no-data response.
- [ ] Unknown API route returns `404` JSON.
- [ ] Unexpected errors do not expose sensitive details.

### 24.3 Production

- [ ] Render build completes successfully.
- [ ] Public Home page loads.
- [ ] Public API health route works.
- [ ] Refreshing `/parking`, `/report`, or `/predict` does not return 404.
- [ ] Public availability update works.
- [ ] Public prediction works.
- [ ] Render has a working secret `MONGODB_URI` environment variable.
- [ ] Public updates are stored in MongoDB Atlas.
- [ ] Public link works in an incognito window.
- [ ] Deployed build matches the latest `main` branch.
- [ ] No secrets or API keys are committed.

---

## 25. Deployment Plan

### Primary plan - One Render Web Service

1. Build the React frontend into `frontend/dist`.
2. Configure Express to serve `frontend/dist` in production.
3. Keep every `/api` route before the frontend fallback route.
4. Connect one Render Web Service to the GitHub repository.
5. Use the root `render.yaml` or equivalent dashboard settings.
6. Add `MONGODB_URI` to Render as a secret environment variable.
7. Set `NODE_ENV` to `production` on Render.
8. Render automatically builds the tested `main` branch as the project's simple CI/CD flow.
9. Test all routes, refresh behaviour, database updates, and prediction on the public URL.
10. Open the deployed app before the demonstration so a free service has time to wake.

Expected build command:

```text
npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend
```

Expected start command:

```text
npm start --prefix backend
```

### Database connection backup

At least two team members should be able to access the MongoDB Atlas project. If one account or connection fails, use another team member's Atlas access. Do not replace the required database with `localStorage` in the final project.

---

## 26. README Requirements

The final `README.md` must contain all items required by the official PDF:

1. Project title
2. Selected Sri Lankan problem
3. Proposed solution
4. Main features
5. Technologies used
6. AI tools used and a one-line declaration for each
7. Team member names, IDs, and contributions in their own words
8. Installation and execution instructions
9. Deployed application link
10. Demonstration video link

Recommended additional sections:

- How the prediction works
- API endpoints
- Sample-data disclaimer
- MongoDB collections and seed-data behaviour
- Required environment variables without exposing their values
- Future improvements
- Screenshots if enough time remains

Never add fake links. Use `Pending` until a real working link exists.

---

## 27. Mandatory AI Prompt Log

Create `docs/AI_PROMPT_LOG.md` at the beginning of development. Update it immediately after each significant ChatGPT or Antigravity use. Do not attempt to reconstruct every prompt at the end.

Use this format:

````md
## Prompt 01

- Date and time:
- Tool:
- Purpose:
- Team member using the tool:

### Exact prompt

```text
Paste the complete prompt exactly as entered.
```

### Review and modification

Explain how the team tested, corrected, simplified, or changed the output.
````

Rules:

- Preserve the exact prompt wording.
- Record the purpose of each significant prompt.
- State how the output was checked or modified.
- Redact passwords, API keys, tokens, and personal data.
- Copy the same completed log into the final submission PDF.
- Do not claim a review or modification that did not happen.

Suggested declaration wording, which must be edited to match the work actually completed:

- **ChatGPT:** Used to analyse the assignment, check the local problem, scope the MVP, and help draft planning and documentation. The team reviewed the results against the official rubric.
- **Google Antigravity:** Used to assist with selected React and Express implementation and debugging. The team reviewed, tested, simplified, and corrected the generated code.

The team contribution statements must still be written by the students in their own words.

---

## 28. Team Contribution Record

Use this structure but replace every placeholder during the session:

| Member | Student ID | Branch | Main files/features | Own-word contribution statement |
|---|---|---|---|---|
| Member 1 | Add ID | `feature/home-prediction` | Home, navigation, prediction interface | Write during session |
| Member 2 | Add ID | `feature/parking-browser` | Parking cards, search, filter, and sort | Write during session |
| Member 3 | Add ID | `feature/availability-form` | Update form, validation, and integration | Write during session |
| Member 4 | Add ID | `feature/api-deployment` | Backend, algorithm, sample data, and deployment | Write during session |

Git commits, README statements, and video explanations must show consistent evidence for all four members.

---

## 29. Two-Minute Demonstration Structure

Target length: approximately 1 minute 55 seconds. Never exceed 2 minutes.

| Time | Speaker | Content |
|---|---|---|
| 0:00-0:12 | Member 1 | Team, ParkingPulse LK, and the Kandy parking-search problem |
| 0:12-0:32 | Member 2 | Parking cards, current statuses, search, and one filter |
| 0:32-0:58 | Member 3 | Show one invalid update, its error, and a valid update |
| 0:58-1:12 | Member 2 | Show that the selected parking card changed |
| 1:12-1:38 | Member 1 | Run one prediction and explain the historical average result |
| 1:38-1:52 | Member 4 | Confirm public deployment and briefly state the backend flow |
| 1:52-1:58 | Member 4 | State the benefit to Kandy drivers and close |

The video must cover:

- Team and project
- Sri Lankan problem
- Proposed solution
- Main working features
- Public deployment
- Expected impact

Open all pages before recording. Prepare one valid update and one prediction selection to avoid typing delays.

---

## 30. Final Submission PDF Structure

Rename the final PDF using the actual Group ID.

Recommended order:

1. Assignment and project title
2. Group ID
3. Team member names and student IDs
4. Short problem description
5. Short solution description
6. Technologies used
7. AI tools used and declaration
8. GitHub repository link
9. Public deployed application link
10. Two-minute demonstration video link
11. Team contributions written in the members' own words
12. Complete AI Prompt Log

Before uploading:

- [ ] Repository link opens.
- [ ] Deployment link works in incognito mode.
- [ ] Video permissions allow the evaluator to view it.
- [ ] Video duration is no more than two minutes.
- [ ] All four names and IDs are correct.
- [ ] AI Prompt Log is included.
- [ ] AI use is declared in README and submission PDF.
- [ ] File name is the correct Group ID.
- [ ] Correct PDF is uploaded before the deadline.

---

## 31. Questions Every Member Must Be Ready to Answer

1. What specific problem does ParkingPulse LK solve?
2. Why did the team target only Kandy city centre?
3. Who are the main users?
4. What are the three working features?
5. How is parking status calculated?
6. How do search, filtering, and sorting work together?
7. How is a new availability report validated?
8. How does the historical prediction calculation work?
9. Why is the prediction not described as machine learning?
10. Why did the team choose React and Express?
11. Why was MongoDB Atlas selected?
12. What are the three MongoDB collections used for?
13. How is the database connection string protected?
14. Where were AI tools used and how was the output checked?
15. What did each member personally implement?
16. What would be added with more development time?

Likely small live modifications include adding another parking area, changing the Limited threshold, adding another time period, changing a validation limit, or changing a status colour. Each member should practise one small change in their own files.

---

## 32. Risks and Controls

| Risk | Control |
|---|---|
| Scope becomes too large | Keep the Kandy-only scope and fixed non-goals |
| Prediction is mistaken for AI or live data | Label it clearly as a historical sample average and show the disclaimer |
| Parking values appear official | Use `Demo` in names and show the sample-data notice |
| User submits more spaces than capacity | Validate against backend-owned capacity |
| Merge conflicts | Give members separate file ownership and merge one branch at a time |
| AI generates complex code | Apply the custom simplicity rules and reject unnecessary patterns |
| Team cannot explain code | Add short comments, review features, and practise questions |
| Prompt Log is forgotten | Record every significant prompt immediately |
| MongoDB connection fails | Create Atlas access early, verify the URI locally, and give two members project access |
| Database secret is exposed | Keep `.env` ignored and store `MONGODB_URI` only in local and Render environment settings |
| Seed data duplicates after restart | Seed only when each target collection is empty |
| Backend deployment is delayed | Test the database connection before starting deployment and use one Render service |
| Public route refresh returns 404 | Put the Express frontend fallback after every API route |
| Free host starts slowly | Open the app before recording and evaluation |
| Video link is private | Test the link in an incognito window |

---

## 33. Final Definition of Done

The project is complete only when:

- [ ] Availability board, update form, and prediction all work.
- [ ] All 10 minimum software requirements are visibly satisfied.
- [ ] Invalid input is handled with friendly messages.
- [ ] Prediction calculations are correct and transparently described.
- [ ] Sample information is not presented as official live data.
- [ ] MongoDB stores parking areas, updates, and historical patterns.
- [ ] Submitted parking updates remain after a backend restart.
- [ ] No database connection string or secret is committed.
- [ ] Desktop and mobile layouts work.
- [ ] All four members have meaningful personal commits.
- [ ] README contains every required item.
- [ ] AI Prompt Log contains exact significant prompts and review notes.
- [ ] AI usage is declared in README and final PDF.
- [ ] Latest tested code is on `main`.
- [ ] Public deployment matches `main` and works in incognito mode.
- [ ] Video is accessible and under two minutes.
- [ ] Submission PDF contains all official deliverables and the prompt log.
- [ ] Correct Group ID PDF is uploaded before the deadline.

---

## 34. Immediate Next Step

Do **not** request feature code yet.

The next step is to create the root project, Git repository, React frontend, Express backend, basic files, and local frontend-backend connection manually. Complete this one small step at a time. Only after the manual foundation works should the first Antigravity feature prompt be used.
