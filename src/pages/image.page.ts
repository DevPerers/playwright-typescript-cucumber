import { Page, Locator, expect } from '@playwright/test';

export class ImagePage {
  private readonly page: Page;
  private readonly searchFieldText: Locator;
  private readonly fromDateFieldText: Locator;
  private readonly toDateFieldText: Locator;
  private readonly imageLabel: Locator;
  private readonly imageIdColumn: Locator;
  private readonly imageIdTextBox: Locator;
  private readonly imageHeaderTitle: Locator;
  private readonly fromDateInput: Locator;
  private readonly toDateInput: Locator;
  private readonly filterPanelButton: Locator;
  private readonly filterPanelOptions: Locator;
  private readonly statusMinifilterInput: Locator;
  private readonly applyButton: Locator;
  private readonly applyAllCheckBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFieldText = page.locator('.trax-form-label').nth(0);
    this.fromDateFieldText = page.locator('trx-explorer-date-range-picker > div > div:nth-child(1) > label');
    this.toDateFieldText = page.locator('trx-explorer-date-range-picker > div > div:nth-child(2) > label');
    this.imageLabel = page.locator('span[class="grid-title"]');
    this.imageIdColumn = page.locator('div[class="ag-header-row ag-header-row-column"]>div:nth-child(2)');
    this.imageIdTextBox = page.locator('.input-with-icon > .trax-form-control');
    this.imageHeaderTitle = page.locator('.explorer-sub-header-top-title');
    this.fromDateInput = page.locator('.trax-form-control').nth(2);
    this.toDateInput = page.locator('.trax-form-control').nth(3);
    this.filterPanelButton = page.locator('div[class="ag-side-buttons"] div:nth-child(2) button');
    this.filterPanelOptions = page.locator('div[class="ag-filter-list-panel"] div');
    this.statusMinifilterInput = page.locator('#status-minifilter');
    this.applyButton = page.locator('.set-filter-action-buttons-container > :nth-child(1)');
    this.applyAllCheckBox = page.locator('#status-selectAll');
  }

  async verifySearchFieldText(verifyText: string): Promise<void> {
    await expect(this.searchFieldText).toContainText(verifyText);
  }

  async verifyFromDateFieldText(verifyText: string): Promise<void> {
    await expect(this.fromDateFieldText).toHaveText(verifyText);
  }

  async verifyToDateFieldText(verifyText: string): Promise<void> {
    await expect(this.toDateFieldText).toHaveText(verifyText);
  }

  async verifyImageLabel(label: string): Promise<void> {
    await expect(this.imageLabel).toHaveText(label);
  }

  async verifyImageIdColumn(imageIdLabel: string): Promise<void> {
    await expect(this.imageIdColumn).toHaveText(new RegExp(imageIdLabel.trim(), 'i'));
  }

  async navigateToImageViewerPage(imageId: string): Promise<void> {
    await this.imageIdTextBox.fill(imageId);
    await this.imageIdTextBox.press('Enter');
  }
  
  async verifyImageId(expectedImageId: string): Promise<void> {
    const text = await this.imageHeaderTitle.innerText();
    const match = text.match(/Image\s*(\d+)/);
    const actualImageId = match ? match[1] : '';
    expect(actualImageId).toBe(expectedImageId);
  }

  async setToDateAndFromDate(fromDate: string, toDate: string): Promise<void> {
    await this.fromDateInput.fill(fromDate);
    await this.fromDateInput.press('Enter');
    await this.toDateInput.fill(toDate);
    await this.toDateInput.press('Enter');
  }

  async clearFromField(): Promise<void> {
    await this.fromDateInput.clear();
  }

  async clearToField(): Promise<void> {
    await this.toDateInput.clear();
  }

  async verifyRedBorder(field: 'from' | 'to'): Promise<void> {
    const targetField = field === 'from' ? this.fromDateInput : this.toDateInput;
    // Accepts standard red (rgb(255, 0, 0)) or the Trax red brand shade (rgb(179, 18, 37))
    const redColorRegex = /rgb\((255,\s*0,\s*0|179,\s*18,\s*37)\)|red/;
    await expect(targetField).toHaveCSS('border-color', redColorRegex);
  }

  async clickFilterPanel(): Promise<void> {
    await this.filterPanelButton.click();
  }

  async filterByGivenFilterOption(filterOption: string): Promise<void> {
    await this.filterPanelOptions.filter({ hasText: new RegExp(filterOption, 'i') }).first().click();
  }

  async selectStatusFromDropdown(status: string): Promise<void> {
    await this.statusMinifilterInput.fill(status);
    await this.statusMinifilterInput.press('Space');
    await this.statusMinifilterInput.press('Backspace');
    const statusOption = this.page.locator('label[for="status-0-input"]', { hasText: status });
    await statusOption.click({ force: true });
  }

  async clickApplyButton(): Promise<void> {
    await this.applyButton.click();
  }

  getColumn(columnName: string): Locator {
    return this.page.locator(`.ag-center-cols-container [col-id="${columnName}"]`);
  }

  async verifyColumnValues(columnName: string, expected: string | string[]): Promise<void> {
    const cells = this.getColumn(columnName);
    const count = await cells.count();
    expect(count).toBeGreaterThan(0);

    const cellTexts = await cells.allInnerTexts();

    for (const text of cellTexts) {
      const actual = text.trim();
      if (Array.isArray(expected)) {
        const allowedLower = expected.map(s => s.toLowerCase());
        const cleanedActual = actual.replace(/\s+/g, ' ').toLowerCase();
        expect(allowedLower).toContain(cleanedActual);
      } else {
        expect(actual).toBe(expected);
      }
    }
  }

  async clickApplyAllCheckBox(): Promise<void> {
    await this.applyAllCheckBox.click();
  }

  async getImageId(): Promise<string> {
    const text = (await this.imageHeaderTitle.textContent()) || '';
    const match = text.match(/Image\s*(\d+)/);
    return match ? match[1] : '';
  }

  async verifyStatusColumnValuesAllowed(): Promise<void> {
    const allowed = ['New', 'Processed', 'Validated', 'Deleted'];
    await this.verifyColumnValues('status', allowed);
  }
}
