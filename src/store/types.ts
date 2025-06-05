import { User } from 'firebase/auth';

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface Meal {
  id: string;
  meal: string;
  price: number;
  img: string;
  description?: string;
  instructions?: string;
  category: string;
}

export interface MealsState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
} 