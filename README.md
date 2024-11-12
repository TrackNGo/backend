# Smart Public Transportation App - Backend

The backend server for the Smart Public Transportation App, providing APIs for real-time bus tracking, route and fare information, lost item reporting, and a dashboard for conductors and admins.

## 📑 Table of Contents
- [Features](#features)
- [🚀 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [📦 Package Management](#-package-management)
- [🚦 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)
- [Conclusion](#conclusion)

---

## Features

### User Features

- **Real-Time Tracking API**: Endpoints for fetching and updating the real-time location of buses, integrating with the GPS data provided by conductors to deliver live location updates for users.
- **Route and Schedule Retrieval**: APIs to retrieve route details, including stops, schedules, and arrival times. Enables users to view and plan their trips with up-to-date information.
- **Fare Estimation API**: Backend logic to calculate fares based on origin, destination, and rate adjustments set by admins. Provides transparent fare details for users.
- **Lost and Found Reporting System**: Endpoints to submit and query lost item reports. Users can create reports with details like item description, contact information, and bus route, and query any items found by conductors.
- **Notifications and Alerts Service**: Backend event handling to deliver real-time alerts to users about changes in routes, delays, or important updates.

### Conductor Features

- **Bus Location Updates**: Secure endpoint for conductors to continuously update the real-time GPS location of their assigned bus. This data is stored and shared with the tracking system to ensure accurate live tracking for passengers.
- **Lost Item Management**: Backend supports conductors in reporting items found on the bus. Each found item report can include item description, location, and a conductor’s contact information, allowing users to search for their belongings.
- **Passenger Capacity Updates (Optional)**: Optional backend logic and endpoints for conductors to report on current bus capacity, enabling users to make informed decisions about bus availability.

### Admin Features

- **Route Management**: CRUD (Create, Read, Update, Delete) operations to manage bus routes in the system. Admins can add, update, or remove routes, with changes reflected in real-time for both users and conductors.
- **Schedule Management**: Endpoints to manage bus schedules, including special schedules for holidays, peak hours, or route changes. This ensures accurate schedule data for users and conductors.
- **Fare Rate Configuration**: APIs to set and adjust fare rates dynamically, taking into account variables like route distance, fuel cost, or policy changes. Fare data updates are reflected immediately for users accessing the fare estimator.
- **Lost and Found Oversight**: Admin view of all lost and found reports submitted by users and conductors, with the ability to update report statuses and assist in item recovery.
- **User and Conductor Management**: Comprehensive user management endpoints to handle registration, authentication, and permissions. Admins can create, update, or suspend accounts, and assign roles or permissions as needed.
- **Activity Reports and Analytics**: Analytical endpoints to generate and view reports on system usage, popular routes, lost item statistics, and user feedback. These insights allow admins to improve service quality and identify trends.

---

## 🚀 Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB ODM for schema modeling
- **JWT**: Authentication
- **Bcrypt.js**: Password hashing

## 🏗️ Project Structure

```plaintext
src/
├── controllers/    
├── models/         
├── routes/         
├── middlewares/    
├── config/
├── utils/       
└── app.js          


```
---
## 📦 Package Management

### Adding Dependencies
To add a new package:
```sh
npm install [package-name]
```
### Updating Dependencies
To update all dependencies:
```sh
npm update

```
---

### 🚦 Getting Started
## Prerequisites
- Node.js: [Download here](#https://nodejs.org/).
- MongoDB: Local or cloud-based MongoDB setup. [See MongoDB Atlas](https://www.mongodb.com/atlas/database).
- Postman: For API testing (optional). [Download here](https://www.postman.com/).

---

### Setup Steps
1. Clone the repository:

    ```sh
    git clone https://github.com/TrackNGo/backend.git
    ```

2. Navigate to the frontend directory and install packages:

    ```sh
    cd backend
    npm install 
    ```

3. Create a `.env` file in the backend directory similar to `.env.sample` and enter the required variables:

    ```env
    MONGODB_URI="mongodb://localhost:27017/mydb"
    PORT=3000
    JWT_SECRET=mysecretkey
    TOKEN_EXPIRE_TIME=xh
    ```

    **To generate the `JWT_SECRET`, use the following command:**

    ```sh
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
  

4. Start the client:

    ```sh
    npm run start
    ```

This command will start the server, and you can access the application at `http://localhost:3000`.


---
### 🤝 Contributing

Contribution Steps
- Fork the repository.
- Create a feature branch.
- Commit changes following the commit message convention.
- Push changes and create a Pull Request.

  
### Commit Message Convention
This project follows Conventional Commits.  
The Conventional Commits specification provides a way to create a consistent commit history, making it easier to automate release notes and versioning.  

A commit message must have the structure  
```sh 
<type>(<scope>): <description>.
```

- type: Describes the nature of the change (e.g., feat, fix, docs, style, refactor, test, chore).
- scope: An optional section specifying the part of the codebase affected (e.g., parser, button, api). This is usually in parentheses.
- description: A short, imperative mood description of what was done (e.g., "add new login validation").

### Types:
- feat: New feature  
- fix: Bug fix  
- docs: Documentation changes only  
- style: Changes that don’t affect meaning (e.g., white-space, formatting)  
- refactor: Code changes that neither add a feature nor fix a bug   
- test: Adding or modifying tests   
- chore: Updates to build process or auxiliary tools  

### Rules:
- Use lowercase for types and scopes.
- Keep descriptions short (under 50 characters if possible).
- Begin the description with a lowercase letter.
- Don’t end the description with a period.

### Breaking Changes:
Indicate breaking changes with a BREAKING CHANGE section in the footer or within the commit message if the change introduces incompatibility with the previous version.
- For more details, refer to the [Conventional Commits Specification](https://www.conventionalcommits.org).

### Conclusion
The backend of the Smart Public Transportation App provides comprehensive API functionality, including real-time tracking, route management, and user data handling, to deliver a smooth transit experience for passengers, conductors, and administrators.
