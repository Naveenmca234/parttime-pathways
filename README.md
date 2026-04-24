# Part time Pathways

A React Native + Expo mobile application that also runs as a website using React Native Web.

## Project idea

Part time Pathways is a Rapido-style local task and part-time job platform. A customer or work giver can post short tasks like shifting, delivery, cleaning, errands, and construction support. Nearby workers can view available jobs, book them, track bookings, and receive payment after a 10% platform commission.

## Main features

- Worker and Work Giver role-based registration
- Email/password login
- Google and GitHub login for the web build through Firebase Authentication
- Multilingual UI: English, Tamil, Hindi
- Available jobs listing with category filters and search
- Post Job form with amount, location, date, time, workers needed
- 10% platform commission calculation
- Booking management: upcoming, completed, cancelled
- Worker/provider dashboard with earnings and spending cards
- Profile, settings, location and trust-score UI
- Firebase backend-ready with Firestore collections: users, jobs, bookings
- Demo mode works without Firebase keys
- Web deployment-ready with Netlify config

## Backend used

This project uses **Firebase** as backend:

- Firebase Authentication for login, Google login and GitHub login
- Cloud Firestore for jobs, bookings and users
- Firebase security rules included in `firebase.rules`

There is no separate Django/Node backend needed. This is easier to deploy for a UG project and works for mobile + web.

## Project structure

```text
parttime-pathways/
├── App.js
├── app.json
├── package.json
├── netlify.toml
├── .env.example
├── firebase.rules
└── src/
    ├── components/
    ├── context/
    ├── data/
    ├── screens/
    ├── services/
    ├── i18n.js
    └── theme.js
```

## Run locally

Install dependencies:

```bash
npm install
```

Run as mobile app using Expo:

```bash
npm start
```

Then scan the QR code with Expo Go.

Run as website:

```bash
npm run web
```

## Firebase setup

1. Go to Firebase Console.
2. Create a new project.
3. Add a Web App.
4. Enable Authentication providers:
   - Email/Password
   - Google
   - GitHub
5. Create Firestore Database.
6. Copy `.env.example` to `.env`.
7. Paste your Firebase web config into `.env`.
8. Restart Expo.

## Firestore collections

### jobs

```js
{
  title: string,
  description: string,
  category: string,
  location: string,
  date: string,
  startTime: string,
  endTime: string,
  amount: number,
  commissionAmount: number,
  workerPayout: number,
  workersNeeded: number,
  bookedWorkers: number,
  providerId: string,
  providerName: string,
  status: 'active'
}
```

### bookings

```js
{
  jobId: string,
  workerId: string,
  workerName: string,
  title: string,
  location: string,
  date: string,
  amount: number,
  commissionAmount: number,
  workerPayout: number,
  status: 'upcoming' | 'completed' | 'cancelled'
}
```

### users

```js
{
  name: string,
  email: string,
  role: 'worker' | 'provider',
  location: string,
  bio: string,
  interests: string[],
  trustScore: number
}
```

## Deploy website on Netlify

Build command:

```bash
npm run build:web
```

Publish directory:

```text
dist
```

Because `netlify.toml` is included, Netlify can usually detect this automatically after you upload/connect the GitHub repository.

## Notes for mobile social login

Google and GitHub popup login works on the web build. For a production Android/iOS APK, configure native OAuth using Expo AuthSession or a custom dev client. Email/password works in the normal Expo demo flow.

## Demo login

The app works without Firebase in demo mode. You can use:

```text
Email: demo@pathways.app
Password: password123
```

## Project report title

**Part time Pathways: A Mobile Application for Connecting Workers and Job Providers**
