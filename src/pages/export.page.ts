import { Page, Locator, expect } from '@playwright/test';
import { title } from 'process';

export class ExportsPage {
  private readonly page: Page;
  private readonly exportGridTitle: Locator;
  private readonly exportGridColumnNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.exportGridTitle = page.locator('span.grid-title');
    this.exportGridColumnNames = page.locator('.ag-header-cell.ag-focus-managed');
  }

  async verifyExportsTitle(title:string) {
    await expect(this.exportGridTitle.filter({ hasText: title })).toBeVisible();
  }

  getExportsGridColumnNames(): Locator {
    return this.exportGridColumnNames;
  }

  async verifyColumnNames(expectedColumnNames: string[]): Promise<void> {
    const columnsLocator = this.getExportsGridColumnNames();

    // Verify count/length
    await expect(columnsLocator).toHaveCount(expectedColumnNames.length);

    // Verify exact text contents (allTextContents extracts and trims text)
    const actual = await columnsLocator.allTextContents();
    const trimmedActual = actual.map(text => text.trim());

    expect(trimmedActual).toEqual(expectedColumnNames);
  }
}

