import { test, expect } from '@playwright/test';

// Visual sanity checks — baseline screenshots for Home, Media, Invite.
// First run creates the baseline in e2e/screenshots/.
// Subsequent runs compare against stored snapshots.

test.describe('Visual snapshots', () => {
  test('Home page — full viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    // Wait for images and fonts to settle
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-desktop.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('Home page — mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home-mobile.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('Media page — full viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/media');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('media-desktop.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('Invite page — full viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/invite');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('invite-desktop.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });
});
