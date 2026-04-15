# Crystal Waves Hotel and Resort

A modern, full-stack hotel & resort website built with Next.js 15, TypeScript, TailwindCSS, Prisma, and NextAuth.

## Features

- **Modern UI/UX**: Clean, professional design with ocean blue and aqua color scheme
- **Responsive Design**: Mobile-friendly with smooth animations using Framer Motion
- **Booking System**: Online reservation form with date picker and availability checking
- **Admin Dashboard**: Complete admin panel for managing bookings and rooms
- **Authentication**: Secure admin login using NextAuth.js
- **Database**: SQLite database with Prisma ORM
- **Room Management**: CRUD operations for rooms
- **Booking Management**: View, approve, and cancel bookings

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Framer Motion, Lucide Icons
- **Backend**: Next.js Server Actions/API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Date Picker**: React Day Picker with date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Initialize the database:
```bash
npx prisma migrate dev --name init
```

4. Seed the database with initial data:
```bash
npx tsx prisma/seed.ts
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

- **URL**: http://localhost:3000/admin/login
- **Email**: admin@crystalwaves.com
- **Password**: admin123

## Project Structure

```
/app
  /api
    /admin
      /bookings
      /rooms
      /stats
    /auth
    /bookings
  /admin
    /dashboard
    /login
    /rooms
  /components
    Navbar
    Hero
    About
    Amenities
    Rooms
    BookingForm
    Gallery
    Reviews
    Location
    Contact
    Footer
    FloatingMessenger
/lib
  auth.ts
  prisma.ts
/prisma
  schema.prisma
  seed.ts
/types
```

## Database Schema

### Users
- id, email, password, role

### Rooms
- id, name, price, capacity, image

### Bookings
- id, userId, roomId, checkIn, checkOut, status, guests, specialRequest, createdAt

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with initial data

## Features Overview

### Public Website
- Hero section with animations
- About section
- Amenities showcase
- Rooms display with pricing
- Online booking form with calendar
- Photo gallery with lightbox
- Guest reviews
- Location with Google Maps
- Contact form
- Social media integration
- Floating messenger button

### Admin Dashboard
- Statistics overview
- Recent bookings management
- Approve/cancel bookings
- Room management (CRUD)
- Booking calendar view

## Deployment

This project can be deployed to Vercel, Netlify, or any platform that supports Next.js.

For production deployment:
1. Set up a production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in environment variables
3. Run `npx prisma migrate deploy`
4. Deploy the application

## License

This project is proprietary to Crystal Waves Hotel and Resort.
