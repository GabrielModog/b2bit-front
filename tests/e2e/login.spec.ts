import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('shows validation errors and logs in successfully', async ({ page }) => {
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page.getByText(/e-mail is required/i)).toBeVisible();
  await expect(page.getByText(/password is required/i)).toBeVisible();

  await page.getByPlaceholder(/@gmail.com/i).fill('cliente@youdrive.com');
  await page.getByPlaceholder(/\*{12}/).fill('password');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/profile/);
});

test('shows toast on invalid credentials', async ({ page }) => {
  await page.getByPlaceholder(/@gmail.com/i).fill('wrong@example.com');
  await page.getByPlaceholder(/\*{12}/).fill('wrongpw');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.getByRole('button', { name: /sending.../i }).click();

  await expect(page.getByTestId('failed-auth')).toBeVisible();
});


