# Wallet Test Project

A full-stack wallet application with frontend and backend components.

## Project Structure

```
wallet-test/
├── backend/          # Backend server
├── frontend/         # React frontend application
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd wallet-test
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env` files in both backend and frontend directories as needed:

**Backend (.env)**

```
PORT=3000
# Add other backend environment variables
```

**Frontend (.env)**

```
VITE_API_URL=http://localhost:3000
# Add other frontend environment variables
```

### Running the Application

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run dev
```

## Technologies Used

### Frontend

- React
- Vite
- ESLint

### Backend

- Node.js
- Express (or other framework)

## License

This project is licensed under the MIT License.
