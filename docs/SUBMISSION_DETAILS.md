# Submission Details

## Project Name

ParkingPulse LK

## Team Members
 
 | Name | Role |
 |------|------|
 | Pasindu (IT24101460) | Application Shell, Navigation & Setup |
 | Member (IT24100421) | Prediction UI & Dashboard Integration |
 | Member (IT24100120) | Parking Availability Browser (`/parking`) |
 | Member (IT24101200) | Availability Update Form (`/report`) & Backend API |
 
 ## Description
 
 ParkingPulse LK is a smart parking availability prototype designed for drivers visiting busy Kandy city-centre areas. It helps drivers avoid time-wasting traffic congestion and unnecessary searches by providing community-reported parking updates and historical pattern estimates across demonstration parking areas in Kandy.
 
 ## Features
 
 1. **Current Parking Availability Board (`/parking`)** - Responsive parking cards with live occupancy meters, color-coded availability badges (🟢 Available, 🟡 Limited, 🔴 Full), real-time search by location or name, status filtering, and multi-option sorting.
 2. **Home Dashboard (`/`)** - Central Kandy problem overview, real-time statistics (total capacity, free spaces, full areas), and action shortcuts.
 3. **Pattern-Based Availability Prediction (`/predict`)** - Transparent historical average availability estimations based on selected day types and time periods.
 4. **Availability Update Reporting (`/report`)** - Community reporting form to submit verified space availability with frontend validation.
 
 ## How to Run
 
 ### Frontend
 ```bash
 cd frontend
 npm install
 npm run dev
 ```
 
 ### Backend
 ```bash
 cd backend
 npm install
 npm start
 ```
