import { Page, Locator, expect } from '@playwright/test';

export class ScenePage {

  private readonly page: Page;
  private readonly searchFieldText: Locator;
  private readonly fromDateInput: Locator;
  private readonly toDateInput: Locator;
  private readonly sceneGridDataCountLocator: Locator;
  private readonly filterPanelButton: Locator;
  private readonly filterPanelElements: Locator;
  private readonly applyButtonFilterPanel: Locator;
  private readonly clearFilterButton: Locator;
  private readonly exportButton: Locator;
  private readonly exportOptionsButton: Locator;
  private readonly modalBody: Locator;
  private readonly imageExportOkButton: Locator;
  private readonly exportConfirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFieldText = page.locator('.trax-form-label').nth(0);
    this.fromDateInput = page.locator('.trax-form-control').nth(2);
    this.toDateInput = page.locator('.trax-form-control').nth(3);
    this.sceneGridDataCountLocator = page.locator('span.row-count');
    this.filterPanelButton = page.locator('div.ag-side-buttons > div:nth-child(2) > button');
    this.filterPanelElements = page.locator('.ag-filter-list-panel, .ag-tool-panel-wrapper');
    this.applyButtonFilterPanel = page.locator('.set-filter-action-buttons-container > :nth-child(1)');
    this.clearFilterButton = page.locator('button.trax-btn.trax-btn-tertiary');
    this.exportButton = page.locator('.trax-btn.trax-btn-secondary > span');
    this.exportOptionsButton = page.locator('.modal-footer > button');
    this.exportConfirmationHeader = page.locator('.modal-header');
    this.modalBody = page.locator('.modal-body');
    this.imageExportOkButton = page.locator('.modal-footer > button').filter({ hasText: 'OK' });
  }

    async selectDateRange(startDate: string, endDate: string): Promise<void> {
    await this.fromDateInput.fill(startDate);
    await this.fromDateInput.press('Enter');
    await this.toDateInput.fill(endDate);
    await this.toDateInput.press('Enter');
  }

  getSceneGridDataCount(): Locator {
    return this.sceneGridDataCountLocator;
  }

  async extractSceneGridCount(): Promise<number> {
    const locator = this.getSceneGridDataCount();
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    let count = 0;
    await expect(async () => {
      const text = await locator.textContent();
      const match = text ? text.match(/\d+/) : null;
      expect(match).not.toBeNull();
      count = Number(match![0]);
    }).toPass({ timeout: 10000 });
    return count;
  }

  getFilterPanel(): Locator {
    return this.filterPanelButton;
  }

  async clickOnFilterPanel(): Promise<void> {
    await this.getFilterPanel().click();
  }

  getFilterPanelElement(): Locator {
    return this.filterPanelElements;
  }

  getApplyButtonFilterPanel(): Locator {
    return this.applyButtonFilterPanel;
  }

  async selectFilterOptionFromPanel(filterOption: string): Promise<void> {
    // Locate element inside panel matching the exact text string
    const optionLocator = this.getFilterPanelElement()
      .getByText(filterOption, { exact: true })
      .first();

    // Ensure element is visible before clicking
    await expect(optionLocator).toBeVisible({ timeout: 10000 });
    await optionLocator.click();
  }

  async clickApplyButtonFilterPanelIfVisible(): Promise<void> {
    const applyButton = this.getApplyButtonFilterPanel();
    await expect(applyButton).toBeVisible();
    await applyButton.click();
  }

  async selectFilteredByGivenOption(filterOption: string, status: string): Promise<void> {
    await this.selectFilterOptionFromPanel(filterOption);

    switch (filterOption) {
      case 'Status': {
        await this.page.locator('#status-minifilter').fill(status);
        await this.page.locator('div#status-1-label > label').click();
        await this.clickApplyButtonFilterPanelIfVisible();
        await this.selectFilterOptionFromPanel(filterOption);
        break;
      }
      case 'Store Status': {
        await this.page.locator('#storeStatus-minifilter').fill(status);
        await this.page.locator('#storeStatus-0-label > label').click();
        await this.clickApplyButtonFilterPanelIfVisible();
        await this.selectFilterOptionFromPanel(filterOption);
        break;
      }
      default: {
        await this.page.locator('#qualityReviewStatus-minifilter').fill(status);
        await this.page.locator('#qualityReviewStatus-3-label > label').click();
        await this.clickApplyButtonFilterPanelIfVisible();
        await this.selectFilterOptionFromPanel(filterOption);
        break;
      }
    }
  }

  getClearFilterButton(clearAllbuttonText: string): Locator {
    // Locates button with class matching 'button.trax-btn.trax-btn-tertiary' containing the button text
    return this.clearFilterButton.filter({ hasText: clearAllbuttonText });
  }

  async clickClearFilterButton(clearAllbuttonText: string): Promise<void> {
    await this.getClearFilterButton(clearAllbuttonText).click();
  }

  async verifySceneGridCountAfterClearingFilters(expectedCount: number): Promise<void> {
    const locator = this.getSceneGridDataCount();
    await expect.poll(async () => {
      const text = await locator.textContent();
      const match = text ? text.match(/\d+/) : null;
      return match ? Number(match[0]) : null;
    }, {
      message: `Expected grid row count to revert to ${expectedCount}`,
      timeout: 10000,
    }).toBe(expectedCount);
  }

  getExportButton(): Locator {
    return this.exportButton.filter({ hasText: 'EXPORT' });
  }

  async clickExportButton(): Promise<void> {
    await this.getExportButton().click({ force: true });
  }

  getExportOptionsButton(imageExportOption: string): Locator {
    return this.exportOptionsButton.filter({ hasText: imageExportOption });
  }

  async clickExportOptionsButton(imageExportOption: string): Promise<void> {
    await this.getExportOptionsButton(imageExportOption).click();
  }

  getExportConfirmationHeader(): Locator {
    return this.exportConfirmationHeader;
  }

  getImageExportOkButton(): Locator {
    return this.imageExportOkButton;
  }

  async verifyExportConfirmationHeader(): Promise<void> {
    const header = this.getExportConfirmationHeader().filter({ hasText: 'File export task created' });
    await expect(header).toBeVisible();
  }

  async extractTaskIdFromExportConfirmationDialog(): Promise<string> {
    const text = await this.modalBody.textContent();
    const match = text ? text.match(/Task ID:\s*(\S+)/) : null;
    return match ? match[1] : '';
  }

  async verifyImageExportOkButtonIsDisplayed(): Promise<void> {
    const okButton = this.getImageExportOkButton();
    await expect(okButton).toBeVisible();
    await expect(okButton).toBeEnabled();
  }

  async clickImageExportOkButton(): Promise<void> {
    await this.verifyImageExportOkButtonIsDisplayed();
    await this.getImageExportOkButton().click();
  }

}