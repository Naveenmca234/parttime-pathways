import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { t } from '../i18n';
import { initialJobs, initialBookings, createJob, createBooking, markBookingStatus } from '../services/store';
import { firebaseReady, loginWithEmail, registerWithEmail, socialLogin, logoutFirebase } from '../services/firebase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('welcome');
  const [tab, setTab] = useState('home');
  const [role, setRole] = useState('worker');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initialJobs().then(setJobs);
    setBookings(initialBookings());
  }, []);

  const translate = (key) => t(lang, key);

  async function login({ email, password, chosenRole = role }) {
    setLoading(true);
    try {
      const nextUser = await loginWithEmail({ email, password, role: chosenRole });
      setUser(nextUser);
      setRole(chosenRole);
      setScreen('app');
      setTab('home');
    } catch (error) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function register({ name, email, password, chosenRole = role }) {
    setLoading(true);
    try {
      const nextUser = await registerWithEmail({ name, email, password, role: chosenRole });
      setUser(nextUser);
      setRole(chosenRole);
      setScreen('app');
      setTab('home');
    } catch (error) {
      Alert.alert('Register failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loginSocial(providerName) {
    setLoading(true);
    try {
      const nextUser = await socialLogin(providerName, role);
      setUser(nextUser);
      setScreen('app');
      setTab('home');
    } catch (error) {
      Alert.alert('Social login', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await logoutFirebase();
    setUser(null);
    setScreen('welcome');
    setTab('home');
  }

  async function addJob(payload) {
    const job = await createJob(payload, user);
    setJobs((prev) => [job, ...prev]);
    setTab('home');
    return job;
  }

  async function bookJob(job) {
    const booking = await createBooking(job, user);
    setBookings((prev) => [booking, ...prev]);
    setJobs((prev) => prev.map((item) => item.id === job.id ? { ...item, bookedWorkers: (item.bookedWorkers || 0) + 1 } : item));
    setTab('bookings');
    return booking;
  }

  async function updateBooking(booking, status) {
    const next = await markBookingStatus(booking, status);
    setBookings((prev) => prev.map((item) => item.id === booking.id ? next : item));
  }

  const metrics = useMemo(() => {
    const activeJobs = jobs.filter((job) => job.status === 'active').length;
    const totalBookings = bookings.length;
    const earnings = bookings.reduce((sum, item) => sum + Number(item.workerPayout || 0), 0);
    const spent = jobs.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const commission = bookings.reduce((sum, item) => sum + Number(item.commissionAmount || 0), 0);
    return { activeJobs, totalBookings, earnings, spent, commission };
  }, [jobs, bookings]);

  const value = {
    lang,
    setLang,
    t: translate,
    screen,
    setScreen,
    tab,
    setTab,
    role,
    setRole,
    user,
    jobs,
    bookings,
    loading,
    login,
    register,
    loginSocial,
    logout,
    addJob,
    bookJob,
    updateBooking,
    metrics,
    firebaseReady
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
