export interface Avatar {
  id: number;
  high: string;
  medium: string;
  low: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: Avatar;
  type: string;
  created: string;
  modified: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  tokens: AuthToken;
  user: User;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): boolean;
}
