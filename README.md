# Eventify Frontend

Eventify is an Event Management System with a React frontend that connects to the Spring Boot backend. The frontend provides users with a responsive interface to browse events, book tickets, submit feedback, and manage notifications.

## Base URL

`http://127.0.0.1:5173/`

---

## Repository

Frontend source code is available at: [Eventify Frontend](https://github.com/SuyanShrestha/eventify-frontend)

Backend is required for API data and is available at: [Eventify Backend](https://github.com/SuyanShrestha/eventify-backend-django)

---

## Running the Frontend

### Prerequisites

* Node.js and npm/yarn installed
* Backend running at `http://127.0.0.1:8080/`

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/SuyanShrestha/eventify-frontend.git
   cd eventify-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```
4. Open your browser at `http://127.0.0.1:5173/`

---

## Configuration

* The frontend communicates with the backend APIs available at `http://127.0.0.1:8080/`.
* Any API endpoints required by the frontend should be accessible from the running backend.

---

## Features

* Browse and search events
* Book tickets (temporary direct booking before Stripe integration)
* Submit and view feedback for events
* View notifications and mark them as read
* Organizer functionalities: Check-in users with QR code based tickets
* Admin functionalities (SUPERUSER only): Access via backend APIs

---

## Notes

* Ensure backend is running before starting the frontend.
* All API responses are in snake_case, and frontend expects the same format.
