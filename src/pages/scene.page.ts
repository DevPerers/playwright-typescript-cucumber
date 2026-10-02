import { Page, Locator, expect } from '@playwright/test';

export class ScenePage {

  private readonly page: Page;
  private readonly searchFieldText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFieldText = page.locator('.trax-form-label').nth(0);
  }

}