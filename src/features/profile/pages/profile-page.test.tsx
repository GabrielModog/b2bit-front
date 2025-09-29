import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/features/auth';
import { ProfilePage } from '@/features/profile';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={['/profile']}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
}

describe('ProfilePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays profile data when user is present', async () => {
    // Simulate persisted login
    localStorage.setItem('access_token', 'mock-access-token');
    localStorage.setItem('user_data', JSON.stringify({
      id: 1,
      name: 'Christine James',
      email: 'christinejames@gmail.com',
      avatar: { high: 'https://example.com/avatar-high.jpg' },
    }));

    renderWithProviders(<ProfilePage />);

    expect(await screen.findByDisplayValue(/christine james/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/christinejames@gmail.com/i)).toBeInTheDocument();
  });
});


