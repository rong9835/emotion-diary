import { test, expect } from '@playwright/test';

test.describe('Pictures Component - Filter Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });
  });

  test('should display filter select with correct options', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter-select"]');
    await expect(filterSelect).toBeVisible();

    await filterSelect.click();

    const basicOption = page.getByRole('option', { name: '기본' });
    const landscapeOption = page.getByRole('option', { name: '가로형' });
    const portraitOption = page.getByRole('option', { name: '세로형' });

    await expect(basicOption).toBeVisible();
    await expect(landscapeOption).toBeVisible();
    await expect(portraitOption).toBeVisible();
  });

  test('should apply 640x640 size with default filter on initial load', async ({ page }) => {
    const firstPictureItem = page.locator('[data-testid="picture-item-0"]');
    await expect(firstPictureItem).toBeVisible();

    const boundingBox = await firstPictureItem.boundingBox();
    expect(boundingBox?.width).toBe(640);
    expect(boundingBox?.height).toBe(640);
  });

  test('should apply 640x480 size when landscape filter is selected', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter-select"]');
    await filterSelect.click();

    const landscapeOption = page.locator('text=가로형');
    await landscapeOption.click();

    await page.waitForTimeout(100);

    const firstPictureItem = page.locator('[data-testid="picture-item-0"]');
    const boundingBox = await firstPictureItem.boundingBox();
    expect(boundingBox?.width).toBe(640);
    expect(boundingBox?.height).toBe(480);
  });

  test('should apply 480x640 size when portrait filter is selected', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter-select"]');
    await filterSelect.click();

    const portraitOption = page.locator('text=세로형');
    await portraitOption.click();

    await page.waitForTimeout(100);

    const firstPictureItem = page.locator('[data-testid="picture-item-0"]');
    const boundingBox = await firstPictureItem.boundingBox();
    expect(boundingBox?.width).toBe(480);
    expect(boundingBox?.height).toBe(640);
  });

  test('should apply same size to all picture items when filter changes', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter-select"]');
    await filterSelect.click();

    const landscapeOption = page.locator('text=가로형');
    await landscapeOption.click();

    await page.waitForTimeout(100);

    const pictureItems = page.locator('[data-testid^="picture-item-"]');
    const count = await pictureItems.count();

    for (let i = 0; i < count; i++) {
      const item = pictureItems.nth(i);
      const boundingBox = await item.boundingBox();
      expect(boundingBox?.width).toBe(640);
      expect(boundingBox?.height).toBe(480);
    }
  });

  test('should work correctly when filter is changed multiple times', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter-select"]');
    const firstPictureItem = page.locator('[data-testid="picture-item-0"]');

    await filterSelect.click();
    await page.locator('text=가로형').click();
    await page.waitForTimeout(100);

    let boundingBox = await firstPictureItem.boundingBox();
    expect(boundingBox?.width).toBe(640);
    expect(boundingBox?.height).toBe(480);

    await filterSelect.click();
    await page.locator('text=세로형').click();
    await page.waitForTimeout(100);

    boundingBox = await firstPictureItem.boundingBox();
    expect(boundingBox?.width).toBe(480);
    expect(boundingBox?.height).toBe(640);

    await filterSelect.click();
    await page.locator('text=기본').click();
    await page.waitForTimeout(100);

    boundingBox = await firstPictureItem.boundingBox();
    expect(boundingBox?.width).toBe(640);
    expect(boundingBox?.height).toBe(640);
  });
});
