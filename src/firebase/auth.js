import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const updateProfile = (config) => {
  return auth.currentUser.updateProfile(config);
};

// Sign out
export const doSignOut = () => {
  return auth.signOut();
}