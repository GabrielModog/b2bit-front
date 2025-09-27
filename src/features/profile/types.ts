import type { Avatar, User } from "@/features/auth";

export interface ProfileResponse {
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

export interface ProfileRepository {
  getProfile(): Promise<User>
}