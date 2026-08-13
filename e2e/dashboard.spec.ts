import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Xitique/);
  });

  test('should navigate to savers page directly', async ({ page }) => {
    await page.goto('/dashboard/savers');
    await expect(page).toHaveURL(/.*savers/);
  });

  test('should navigate to collectors page directly', async ({ page }) => {
    await page.goto('/dashboard/collectors');
    await expect(page).toHaveURL(/.*collectors/);
  });

  test('should navigate to reports page directly', async ({ page }) => {
    await page.goto('/dashboard/reports');
    await expect(page).toHaveURL(/.*reports/);
  });
});
