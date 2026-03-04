import { test, expect } from '@playwright/test';

test.describe('Route smoke tests', () => {
  test('Home (/) loads and shows hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Pastor Abraham/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Activating Faith')).toBeVisible();
  });

  test('/about loads and shows split hero heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /About Pastor Abraham/i })).toBeVisible();
  });

  test('/media loads and shows sermons heading', async ({ page }) => {
    await page.goto('/media');
    await expect(page.getByRole('heading', { name: /Sermons & Media/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Latest Sermons/i })).toBeVisible();
  });

  test('/invite loads and shows invite heading', async ({ page }) => {
    await page.goto('/invite');
    await expect(page.getByRole('heading', { name: /Invite Me to Speak/i })).toBeVisible();
  });

  test('tagline strip is visible on home', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Leadership. Discipleship. Impact')).toBeVisible();
  });

  test('sticky header is present on all routes', async ({ page }) => {
    for (const route of ['/', '/about', '/media', '/invite']) {
      await page.goto(route);
      const header = page.locator('header');
      await expect(header).toBeVisible();
      await expect(header).toHaveClass(/sticky/);
    }
  });

  test('nav contains 4 links on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav.getByRole('link', { name: /^home$/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /sermons/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /invite/i })).toBeVisible();
  });
});
