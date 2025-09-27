import { ApiService } from "@/api/api";
import type { AuthRepository, LoginCredentials, LoginResponse, User } from "./types";

export class ApiAuthRepository implements AuthRepository {
  private apiService: ApiService;
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user_data';

  constructor() {
    this.apiService = new ApiService();
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.apiService.post<LoginResponse>('/auth/login/', {
        email: credentials.email,
        password: credentials.password,
      });

      const { tokens, user } = response.data;

      localStorage.setItem(this.TOKEN_KEY, tokens.access);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'error: cannot not log in';
      throw new Error(errorMessage);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiService.post('/auth/logout/');
    } catch (error) {
      console.warn('error: cannot logout:', error);
    } finally {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const userData = localStorage.getItem(this.USER_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }
}
