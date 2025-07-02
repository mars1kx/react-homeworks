import { User } from 'firebase/auth';

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
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

export interface CartItem {
  product: {
    id: string;
    meal: string;
    price: number;
    img: string;
    description?: string;
  };
  count: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface ApiResponse {
  url: string;
  options: {
    method: string;
    headers?: Record<string, string>;
    body?: string;
  };
}

export interface Order {
  mealId: string;
  count: number;
  date: string;
  id?: string;
}

export interface LogEntry {
  url: string;
  method: string;
  payload: any | null;
  status: number;
  timestamp: string;
} 