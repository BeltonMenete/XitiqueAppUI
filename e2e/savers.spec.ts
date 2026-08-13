import { test, expect } from '@playwright/test';

test.describe('Savers Management', () => {
  test('should load savers page', async ({ page }) => {
    await page.goto('/dashboard/savers');
    await expect(page).toHaveURL(/.*savers/);
  });

  test('should display page content', async ({ page }) => {
    await page.goto('/dashboard/savers');
    // Check that page has loaded with some content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText?.length).toBeGreaterThan(0);
  });
});
