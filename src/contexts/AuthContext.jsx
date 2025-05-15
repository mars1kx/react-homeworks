import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import logger from '../utils/logger';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  function login(email, password) {
    logger.auth('Login attempt', { email });
    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        logger.auth('Login successful', { 
          uid: userCredential.user.uid,
          email: userCredential.user.email 
        });
        return userCredential;
      })
      .catch(error => {
        logger.error('Login failed', { 
          code: error.code, 
          message: error.message 
        });
        throw error;
      });
  }

  function logout() {
    logger.auth('Logout attempt');
    return signOut(auth)
      .then(() => {
        logger.auth('Logout successful');
      })
      .catch(error => {
        logger.error('Logout failed', { 
          code: error.code, 
          message: error.message 
        });
        throw error;
      });
  }

  useEffect(() => {
    logger.auth('Setting up auth state observer');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        logger.auth('User state changed', { 
          uid: user.uid, 
          email: user.email,
          state: 'signed in' 
        });
      } else {
        logger.auth('User state changed', { state: 'signed out' });
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      logger.auth('Auth state observer removed');
      unsubscribe();
    };
  }, [auth]);

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 