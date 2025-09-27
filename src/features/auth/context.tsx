import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from './types';
import { ApiAuthRepository } from './repository';
import { ApiProfileRepository } from '@/features/profile';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authRepository = new ApiAuthRepository()
  const profileRepository = new ApiProfileRepository()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authRepository.getCurrentUser();
        try {
          const profile = await profileRepository.getProfile();
          setUser(profile);
        } catch (profileError) {
          console.warn('Failed to fetch profile on load, using cached data:', profileError);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await authRepository.login({ email, password });
      try {
        const profile = await profileRepository.getProfile();
        setUser(profile);
      } catch (profileError) {
        console.warn('Failed to fetch profile, using login data:', profileError);
        setUser(loginResponse.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await profileRepository.getProfile();;
      setUser(profile);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const logout = async () => {
    try {
      await authRepository.logout()
      setUser(null)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
