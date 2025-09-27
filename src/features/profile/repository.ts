import { ApiService } from "@/api/api";
import type { ProfileRepository } from "./types";
import type { User } from "@/features/auth";

export class ApiProfileRepository implements ProfileRepository {
  private apiService: ApiService;
  private readonly USER_KEY = 'user_data';

  constructor() {
    this.apiService = new ApiService();
  }
    
  async getProfile(): Promise<User> {
    try {
      const response = await this.apiService.get<User>('/auth/profile/');
      const user = response.data;
      
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error: cannot find profile';
      throw new Error(errorMessage);
    }
  }  
}
