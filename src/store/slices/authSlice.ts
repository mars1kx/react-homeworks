import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import logger from '../../utils/logger';
import { AuthState } from '../types';

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      logger.auth('Login attempt', { email });
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      logger.auth('Login successful', { 
        uid: userCredential.user.uid,
        email: userCredential.user.email 
      });
      return userCredential.user;
    } catch (error) {
      logger.error('Login failed', { 
        code: (error as { code: string }).code, 
        message: (error as Error).message 
      });
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      logger.auth('Logout attempt');
      const auth = getAuth();
      await signOut(auth);
      logger.auth('Logout successful');
      return null;
    } catch (error) {
      logger.error('Logout failed', { 
        code: (error as { code: string }).code, 
        message: (error as Error).message 
      });
      return rejectWithValue((error as Error).message);
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { dispatch }) => {
    return new Promise<User | null>((resolve) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          logger.auth('User state changed', { 
            uid: user.uid, 
            email: user.email,
            state: 'signed in' 
          });
          resolve(user);
        } else {
          logger.auth('User state changed', { state: 'signed out' });
          resolve(null);
        }
        unsubscribe();
      });
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer; 