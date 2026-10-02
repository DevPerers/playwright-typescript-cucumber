import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly titleHeader: Locator;
  private readonly appNameLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleHeader = page.locator('.title');
    this.appNameLocator = page.locator('span.trax-tst-app-name');
  }

  async verifyHomePageLoaded(): Promise<void> {
    // Wait until the URL changes to the homepage URL or pattern
    await this.page.waitForURL('**/homepage**', { timeout: 70000 });
    // Now verify element visibility
    await expect(this.appNameLocator).toBeVisible({ timeout: 70000 });
    await expect(this.appNameLocator).toHaveText('Homepage', { timeout: 70000 });
  }

  async navigateToPage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' , timeout: 70000 });
  }

}