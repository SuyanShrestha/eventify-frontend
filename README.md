# Eventify Frontend

Eventify is an Event Management System with a React frontend that connects to the Spring Boot backend. The frontend provides users with a responsive interface to browse events, book tickets, submit feedback, and manage notifications.

## Base URL

`http://127.0.0.1:5173/`

---

## Repository

Frontend source code is available at: [Eventify Frontend](https://github.com/SuyanShrestha/eventify-frontend)

Backend is required for API data and is available at: [Eventify Backend](https://github.com/SuyanShrestha/eventify-spring-backend)

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

### Events

* Explore/search events with category and status filters (sidebar-driven)
* Event detail page with full description (Markdown-rendered)
* Create and edit events, with drag-and-drop image upload and a Markdown editor for descriptions
* Share events via `react-share` (social/link sharing modal)

### Bookings & Tickets

* RSVP/book events (direct booking flow, with Stripe.js wired in for payment)
* Payment success page for post-checkout confirmation
* QR-code ticket generation for confirmed bookings
* Organizer check-in via in-browser QR code scanning

### Feedback

* Submit, view, edit, and delete feedback for events
* Restriction: users cannot leave feedback on their own events

### Notifications

* View unread/read notifications
* Mark a single notification, or all notifications, as read

### User & Dashboard

* Authentication (login/register) with persisted session state (Redux + redux-persist)
* User profile management
* Personal dashboard and bookings page to track registered/created events
* Role-aware UI for regular users and organizers

### Admin (SUPERUSER)

* Category management and event approval are exposed via backend APIs (`/api/admin/**`)
* Dedicated admin UI is scaffolded in the frontend and still in progress

---

## Tech Stack

* **Build tool:** Vite + TypeScript
* **UI:** React 18, Tailwind CSS, Lucide/React Icons, GSAP & Motion for animation, Lottie for illustrations
* **State:** Redux Toolkit with redux-persist
* **Routing:** React Router
* **Forms & content:** React Quill / Markdown editor, react-markdown, react-dropzone
* **Payments & QR:** Stripe.js, qrcode.react, @yudiel/react-qr-scanner
* **Networking:** Axios

---

## Notes

* Ensure backend is running before starting the frontend.
* All API responses are in snake_case, and frontend expects the same format.
