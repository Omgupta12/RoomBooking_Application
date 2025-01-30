# Room Booking Management System

A full-stack Room Booking Management System built with React (frontend) and Node.js with Express (backend). Users can register, log in, search for available rooms, book rooms, and manage their bookings. Key features include user authentication via JWT, room search by date/type, booking creation, view booking history, and booking cancellation. Built with MongoDB, Mongoose, and Axios for HTTP requests.

## Features

- User authentication (sign-up, login)
- Room listing with search and filter functionality
- Room details page with booking form
- Calendar for selecting booking dates
- Booking history for users
- API endpoints for room booking management
- Secure booking logic with real-time availability checks
- Overlapping booking prevention

## Tech Stack

### Frontend:
- React.js (Vite)
- React Router
- Axios (for API requests)
- Tailwind CSS (for styling)

### Backend:
- Node.js
- Express.js
- MongoDB (Database)
- JWT Authentication
- dotenv (for environment variables)
- Mongoose (ORM)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clone the Repository
```sh
git clone https://github.com/Omgupta12/RoomBooking_Application.git
cd RoomBooking_Application
```
### Backend Setup
- Navigate to the backend directory: cd backend
- Install dependencies: npm install
- Create a .env file in the backend directory and add the following:
- PORT=5000
- DATABASE_URL=mongodb://localhost:27017/roombooking
- JWT_SECRET=your_secret_key
- Start the backend server: npm start

### Frontend Setup
- Navigate to the frontend directory: cd frontend
- Install dependencies: npm install
- Start the frontend application: npm run dev

### Running the Application
- The backend will be running at http://localhost:5000 or http://localhost:8000
- The frontend will be running at http://localhost:5173
  
### API Endpoints
| Function Name          | HTTP Method | Endpoint                               | Description                          |
|------------------------|-------------|----------------------------------------|--------------------------------------|
| registerUser           | POST        | /api/auth/register                      | User registration                    |
| loginUser              | POST        | /api/auth/login                        | User login                           |
| fetchRooms             | GET         | /api/rooms                             | Fetch available rooms                |
| fetchRoomDetails       | GET         | /api/rooms/:roomId                     | Fetch details of a specific room     |
| createBooking          | POST        | /api/bookings                          | Create a booking                     |
| cancelBooking          | DELETE      | /api/bookings/:bookingId               | Cancel a booking                     |
| fetchAvailableSlots    | GET         | /api/bookings/available-slots/:roomId/:date | Fetch available slots for a room|

# App Screenshots

## Screenshot 1: Room Listing Page

Here user see list of rooms :

![Rooms List](https://github.com/user-attachments/assets/4c68aecc-ed07-4118-9f52-ec316388c9cd)


## Screenshot 2: User Registration

Here is what the user registration screen looks like:

![User Registration](https://github.com/user-attachments/assets/89be239e-18f0-4ef2-8f38-b92d2769f187)
)
## Screenshot 3: User Login

Here is what the user login screen looks like:

![User Login](https://github.com/user-attachments/assets/e319c3ef-346d-448c-822d-8dfc64fa2506)

)

## Screenshot 3: Room Booking

Here is the room booking screen:

![Room Booking](https://github.com/user-attachments/assets/e664e8eb-157a-4295-a404-bac1315307a9)

## Screenshot 4: Booking History

The booking history page displays the user's previous bookings:

![Booking History](https://github.com/user-attachments/assets/9a6df883-4e5c-41a6-8ac0-7ec5dc663c7b)










