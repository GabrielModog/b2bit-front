import { test, expect } from '@playwright/test';

test('unauthenticated access to protected route goes to login', async ({ page }) => {
  await page.goto('/profile');
  await expect(page).toHaveURL(/\/login/);
});

test('authenticated user visiting login is redirected to profile', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder(/@gmail.com/i).fill('cliente@youdrive.com');
  await page.getByPlaceholder(/\*{12}/).fill('password');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/profile/);

  await page.goto('/login');
  await expect(page).toHaveURL(/\/profile/);
});

test('authenticated user visiting unknown route redirects to profile', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder(/@gmail.com/i).fill('cliente@youdrive.com');
  await page.getByPlaceholder(/\*{12}/).fill('password');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/profile/);

  await page.goto('/some-unknown');
  await expect(page).toHaveURL(/\/profile/);
});


