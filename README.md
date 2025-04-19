# ChocoLab - Chocolate Quick-commerce Platform

A modern Full stack Quick-commerce platform for chocolate products with real-time inventory management, delivery tracking, and secure payment processing.

## Author

**Abinash Sahoo**  
Full Stack Developer at Concept Infoway PVT LTD

## Features

- 🍫 Product catalog with detailed chocolate listings
- 🛒 Seamless checkout with Stripe payment integration
- 📦 Real-time inventory management system
- 🚚 Delivery person assignment and tracking
- 👤 User authentication and order history
- 📊 Admin dashboard for product and inventory management

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **Payment**: Stripe
- **State Management**: React Query, Zustand

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npm run db:run`
5. Start the development server: `npm run dev`

## Environment Variables

```
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
APP_BASE_URL=your_app_base_url
```

## License

MIT
