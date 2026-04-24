import { seedJobs, seedBookings } from '../data/seed';
import {
  firebaseReady,
  loadJobsFromFirestore,
  addJobToFirestore,
  addBookingToFirestore,
  updateFirestoreDocument
} from './firebase';

export const COMMISSION_RATE = 0.10;

export function money(value) {
  const number = Number(value || 0);
  return `₹${number.toLocaleString('en-IN')}`;
}

export function calculateMoney(amount) {
  const base = Number(amount || 0);
  const commissionAmount = Math.round(base * COMMISSION_RATE);
  return {
    amount: base,
    commissionAmount,
    workerPayout: base - commissionAmount
  };
}

export async function initialJobs() {
  try {
    const cloudJobs = await loadJobsFromFirestore();
    if (firebaseReady && cloudJobs && cloudJobs.length > 0) return cloudJobs;
  } catch (error) {
    console.log('Firestore jobs fallback:', error.message);
  }
  return seedJobs;
}

export function initialBookings() {
  return seedBookings;
}

export async function createJob(payload, user) {
  const financials = calculateMoney(payload.amount);
  const job = {
    id: `job-${Date.now()}`,
    title: payload.title,
    description: payload.description,
    category: payload.category,
    location: payload.location,
    lat: payload.lat || 13.0827,
    lng: payload.lng || 80.2707,
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
    amount: financials.amount,
    commissionAmount: financials.commissionAmount,
    workerPayout: financials.workerPayout,
    workersNeeded: Number(payload.workersNeeded || 1),
    bookedWorkers: 0,
    status: 'active',
    providerId: user?.uid || 'demo-provider',
    providerName: user?.name || 'Job Provider',
    trustScore: user?.trustScore || 4.7,
    distanceKm: 1.8
  };

  const cloudJob = await addJobToFirestore(job);
  return cloudJob || job;
}

export async function createBooking(job, user) {
  const financials = calculateMoney(job.amount);
  const booking = {
    id: `booking-${Date.now()}`,
    jobId: job.id,
    title: job.title,
    location: job.location,
    date: job.date,
    startTime: job.startTime,
    endTime: job.endTime,
    amount: financials.amount,
    commissionAmount: financials.commissionAmount,
    workerPayout: financials.workerPayout,
    status: 'upcoming',
    workerId: user?.uid || 'demo-worker',
    workerName: user?.name || 'Naveen',
    providerName: job.providerName,
    category: job.category
  };

  const cloudBooking = await addBookingToFirestore(booking);
  return cloudBooking || booking;
}

export async function markBookingStatus(booking, status) {
  await updateFirestoreDocument('bookings', booking.id, { status });
  return { ...booking, status };
}
