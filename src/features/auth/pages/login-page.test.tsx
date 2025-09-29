import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, LoginPage } from '@/features/auth';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
}

describe('LoginPage', () => {
  it('renders form and validates inputs', async () => {
    renderWithProviders(<LoginPage />);

    const email = screen.getByPlaceholderText(/@gmail.com/i);
    const password = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*/i);
    const submit = screen.getByRole('button', { name: /sign in/i });

    await userEvent.click(submit);

    // shows yup errors
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Senha is required/i)).toBeInTheDocument();

    await userEvent.type(email, 'invalid');
    await userEvent.click(submit);
    expect(await screen.findByText(/Invalid e-mail/i)).toBeInTheDocument();

    await userEvent.clear(email);
    await userEvent.type(email, 'test@example.com');
    await userEvent.type(password, 'password');
    await userEvent.click(submit);

    // After submit success, token should be persisted
    await waitFor(() => {
      expect(localStorage.getItem('access_token')).toBeTruthy();
    });
  });
});


