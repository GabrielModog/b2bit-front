import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/features/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <Button
              onClick={handleLogout}
              variant="primary"
              className="bg-primary hover:bg-primary/90"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-gray-700">Profile picture</p>
                <div className="flex justify-center">
                  <img
                    src={user.avatar?.high}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                 <Label>
                  Your <b>Name</b>
                </Label>
                <Input
                  value={user.name}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Your <b>E-Email</b>
                </Label>
                <Input
                  value={user.email}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
