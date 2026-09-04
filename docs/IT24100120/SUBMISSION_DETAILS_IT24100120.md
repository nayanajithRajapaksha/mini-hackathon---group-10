# Submission Details - IT24100120

## Member Information

- **Student ID:** IT24100120
- **Assigned Role:** Member 2 - Parking Availability Browser
- **Git Branch:** `IT24100120` (tracks `feature/parking-browser`)
- **Key Modules Owned:**
  - `frontend/src/pages/ParkingPage.jsx`
  - `frontend/src/components/ParkingCard.jsx`
  - `frontend/src/components/StatusBadge.jsx`
  - `frontend/src/styles/parking.css`
  - Route registration in `frontend/src/App.jsx`

## Personal Contribution Statement (in Own Words)

I was responsible for implementing the Parking Availability Browser (Feature 1) for ParkingPulse LK. My work focused on providing Kandy city-centre drivers with an intuitive, responsive interface to check real-time parking availability before entering crowded areas. 

Key contributions I completed:
1. **Status Badge & Card Components**: Built `StatusBadge.jsx` and `ParkingCard.jsx` to clearly display location details, total capacity, remaining spaces, and colour-coded statuses (`🟢 Available`, `🟡 Limited`, `🔴 Full`) adhering to accessibility standards.
2. **Search, Filter & Sort Logic**: Implemented live, case-insensitive keyword searching across parking names and locations, dropdown filtering by availability status, and dual-sorting (by latest update timestamp and by highest number of free spaces).
3. **Robust State Management**: Added complete loading, error handling with retry capability, and empty-state messaging when no parking locations match the query.
4. **Responsive Styling**: Designed and tested `parking.css` ensuring smooth responsiveness across mobile viewports (375px) up to large desktop screens (1440px) without horizontal scrolling.
5. **Testing & Validation**: Validated the component against live API calls and verified that status indicators accurately represent the occupancy percentages defined in the master plan.
