import { Page, Locator, expect } from '@playwright/test';

export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

export async function waitForElement(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout: 30000 });
}

export async function waitForDropDownOptions(locator: Locator, count: number): Promise<void> {
  await expect(locator).toHaveCount(count, { timeout: 5000 });
}

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `screenshots/${name}.png` });
}