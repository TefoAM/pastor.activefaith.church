import { test, expect } from '@playwright/test';

test.describe('Invite form validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/invite');
    await expect(page.getByRole('heading', { name: /Invite Me to Speak/i })).toBeVisible();
  });

  test('submit empty form shows required field errors', async ({ page }) => {
    await page.getByRole('button', { name: /Submit Invitation Request/i }).click();

    // Core required fields must show errors
    await expect(page.getByText('Full name is required.')).toBeVisible();
    await expect(page.getByText('Role is required.')).toBeVisible();
    await expect(page.getByText('Organization is required.')).toBeVisible();
    await expect(page.getByText('Email is required.')).toBeVisible();
    await expect(page.getByText('Phone number is required.')).toBeVisible();
    await expect(page.getByText('Event name is required.')).toBeVisible();
    await expect(page.getByText('City is required.')).toBeVisible();
    await expect(page.getByText('Proposed dates are required.')).toBeVisible();
    await expect(page.getByText('Please describe the event theme.')).toBeVisible();
    await expect(page.getByText('You must consent to proceed.')).toBeVisible();
  });

  test('email format error appears for invalid email', async ({ page }) => {
    await page.getByLabel('Email *').fill('not-an-email');
    await page.getByLabel('Email *').blur();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  });

  test('errors clear when valid values are entered', async ({ page }) => {
    await page.getByRole('button', { name: /Submit Invitation Request/i }).click();
    await expect(page.getByText('Full name is required.')).toBeVisible();

    await page.getByLabel('Full Name *').fill('John Doe');
    await page.getByLabel('Full Name *').blur();
    await expect(page.getByText('Full name is required.')).not.toBeVisible();
  });

  test('consent checkbox error shown when unchecked on submit', async ({ page }) => {
    await page.getByRole('button', { name: /Submit Invitation Request/i }).click();
    await expect(page.getByText('You must consent to proceed.')).toBeVisible();
  });
});
