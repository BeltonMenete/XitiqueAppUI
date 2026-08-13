import { test, expect } from '@playwright/test';

test.describe('Collectors Management', () => {
  test('should load collectors page', async ({ page }) => {
    await page.goto('/dashboard/collectors');
    await expect(page).toHaveURL(/.*collectors/);
  });

  test('should display page content', async ({ page }) => {
    await page.goto('/dashboard/collectors');
    // Check that page has loaded with some content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText?.length).toBeGreaterThan(0);
  });
});
