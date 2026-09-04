# Submission Details - IT24101200

## Member Information

- **Student ID:** IT24101200
- **Assigned Role:** Member 3 - Report Availability Form
- **Git Branch:** `IT24101200` (tracks `feature/availability-form`)
- **Key Modules Owned:**
  - `frontend/src/pages/ReportPage.jsx`
  - `frontend/src/utils/updateValidation.js`
  - `frontend/src/styles/form.css`
  - `frontend/src/services/api.js` (Added `submitParkingUpdate`)
  - Route registration in `frontend/src/App.jsx`
  - `backend/models/ParkingUpdate.js`
  - `backend/middleware/validateUpdate.js`
  - `backend/routes/updateRoutes.js`

## Personal Contribution Statement (in Own Words)

I was responsible for implementing the Report Availability Form (Feature 3) for ParkingPulse LK. My work focused on allowing users to report the current number of available spaces at a parking area they have visited.

Key contributions I completed:
1. **Report Form Component**: Built `ReportPage.jsx` with a form to select a parking area, input available spaces, and add an optional note. Included real-time feedback with capacity information.
2. **Client and Server Validation**: Implemented robust validation logic in `updateValidation.js` (frontend) and `validateUpdate.js` (backend) to ensure data integrity (e.g., checking that available spaces don't exceed capacity, dates aren't in the future).
3. **Backend Integration**: Created the `POST /api/parking-updates` endpoint and Mongoose models (`ParkingUpdate`) to save user reports and immediately update the `ParkingArea` availability and status using the `calculateStatus` utility.
4. **API and Routing Setup**: Added the `submitParkingUpdate` function in `api.js` and registered the new route in `App.jsx`, ensuring seamless frontend-backend communication.
5. **Form Styling**: Designed responsive and user-friendly form styles in `form.css`, including clear success and error banners for user feedback.
