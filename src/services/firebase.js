import { Platform } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
);

let app = null;
let auth = null;
let db = null;

if (firebaseReady) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };

function publicUser(user, role = 'worker') {
  return {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email,
    role,
    location: 'Chennai, Tamil Nadu',
    bio: 'Ready to work with verified tasks and secure payments.',
    interests: ['construction', 'delivery'],
    trustScore: 4.7
  };
}

export async function registerWithEmail({ name, email, password, role }) {
  if (!firebaseReady) {
    return {
      uid: 'demo-user',
      name: name || 'Naveen',
      email: email || 'demo@pathways.app',
      role,
      location: 'Chennai, Tamil Nadu',
      bio: role === 'provider' ? 'Posting local jobs for verified workers.' : 'Experienced worker with skills in shifting, construction and delivery.',
      interests: ['construction', 'delivery'],
      trustScore: 4.7
    };
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  const userData = publicUser({ ...credential.user, displayName: name }, role);
  await setDoc(doc(db, 'users', credential.user.uid), {
    ...userData,
    createdAt: serverTimestamp()
  });
  return userData;
}

export async function loginWithEmail({ email, password, role }) {
  if (!firebaseReady) {
    return {
      uid: 'demo-user',
      name: role === 'provider' ? 'John Doe' : 'Naveen',
      email: email || 'demo@pathways.app',
      role,
      location: 'Chennai, Tamil Nadu',
      bio: role === 'provider' ? 'Trusted job provider for shifting, delivery and cleaning jobs.' : 'Experienced worker with skills in construction and delivery.',
      interests: ['construction', 'delivery', 'shifting'],
      trustScore: 4.8
    };
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  return publicUser(credential.user, role);
}

export async function socialLogin(providerName, role) {
  if (!firebaseReady) {
    return registerWithEmail({ name: providerName === 'google' ? 'Google User' : 'GitHub User', email: `${providerName}@demo.app`, password: 'demo1234', role });
  }
  if (Platform.OS !== 'web') {
    throw new Error('Google/GitHub popup login is enabled for the website build. For APK/native app, configure native OAuth with Expo AuthSession.');
  }

  const provider = providerName === 'github' ? new GithubAuthProvider() : new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const userData = publicUser(credential.user, role);
  await setDoc(doc(db, 'users', credential.user.uid), {
    ...userData,
    updatedAt: serverTimestamp()
  }, { merge: true });
  return userData;
}

export async function logoutFirebase() {
  if (firebaseReady && auth?.currentUser) {
    await signOut(auth);
  }
}

export async function loadJobsFromFirestore() {
  if (!firebaseReady) return null;
  const snapshot = await getDocs(collection(db, 'jobs'));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function addJobToFirestore(job) {
  if (!firebaseReady) return null;
  const ref = await addDoc(collection(db, 'jobs'), {
    ...job,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { id: ref.id, ...job };
}

export async function addBookingToFirestore(booking) {
  if (!firebaseReady) return null;
  const ref = await addDoc(collection(db, 'bookings'), {
    ...booking,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { id: ref.id, ...booking };
}

export async function updateFirestoreDocument(collectionName, id, payload) {
  if (!firebaseReady) return null;
  await updateDoc(doc(db, collectionName, id), {
    ...payload,
    updatedAt: serverTimestamp()
  });
  return true;
}
