import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import logger from '../utils/logger';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  function login(email: string, password: string): Promise<UserCredential> {
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
          code: (error as { code: string }).code, 
          message: (error as Error).message 
        });
        throw error;
      });
  }

  function logout(): Promise<void> {
    logger.auth('Logout attempt');
    return signOut(auth)
      .then(() => {
        logger.auth('Logout successful');
      })
      .catch(error => {
        logger.error('Logout failed', { 
          code: (error as { code: string }).code, 
          message: (error as Error).message 
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

  const value: AuthContextType = {
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