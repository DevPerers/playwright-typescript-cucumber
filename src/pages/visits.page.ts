import { Page, Locator, expect, Download } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { visitsExportsConstants, visitsExportsPageColumnNames } from '../support/visitsConstants';

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export class VisitsPage {

  private readonly page: Page;
  private readonly fromDateInput: Locator;
  private readonly toDateInput: Locator;
  private readonly showColumnNameOption: Locator;
  private readonly columnSearchInput: Locator;
  private readonly columnSelectCheckboxes: Locator;
  private readonly menuOption: Locator;
  private readonly columnHeaders: Locator;
  private readonly filterPanelButton: Locator;
  private readonly filterPanelItems: Locator;
  private readonly applyButton: Locator;
  private readonly visitIdSearchTextbox: Locator;
  private readonly visitsGridDataCount: Locator;
  private readonly exportButton: Locator;
  private readonly exportModalButtons: Locator;
  private readonly exportConfirmationHeader: Locator;
  private readonly imageExportOkButton: Locator;
  private readonly modalBody: Locator;
  private readonly calendar: Locator;
  private readonly highlightedDates: Locator;
  private readonly internalDateFilteringToggle: Locator;
  private readonly ellipsisIconUrl = /\/static\/traxus\/micro-frontends\/web-components-icons\/ellipsis\.icon\.svg/;

  constructor(page: Page) {
    this.page = page;
    this.fromDateInput = page.locator(':nth-child(3) > .trax-form-control--datepicker-icon-container > .trax-form-control').first();
    this.toDateInput = page.locator(':nth-child(2) > .trax-form-control--datepicker-icon-container > .trax-form-control').first();
    this.showColumnNameOption = page.locator('#ag-30-button');
    this.columnSearchInput = page.locator('#ag-37-input');
    this.columnSelectCheckboxes = page.locator('div.ag-virtual-list-container.ag-column-select-virtual-list-container input[type="checkbox"]');
    this.menuOption = page.locator('tx-sidenav-item span');
    this.columnHeaders = page.locator('div[class="ag-header-row ag-header-row-column"]>div');
    this.filterPanelButton = page.locator('#ag-40-button');
    this.filterPanelItems = page.locator('div[class="ag-filter-list-panel"]>div');
    this.applyButton = page.locator('.set-filter-action-buttons-container > :nth-child(1)');
    this.visitIdSearchTextbox = page.locator('.input-with-icon > .trax-form-control');
    this.visitsGridDataCount = page.locator('span.row-count');
    this.exportButton = page.locator('.trax-btn.trax-btn-secondary > span');
    this.exportModalButtons = page.locator('.modal-footer > button');
    this.exportConfirmationHeader = page.locator('.modal-header');
    this.imageExportOkButton = page.locator('.modal-footer > .trax-btn').filter({ hasText: 'OK' });
    this.modalBody = page.locator('.modal-body');
    this.calendar = page.locator('#calendar');
    this.highlightedDates = page.locator('.btn-light.range');
    this.internalDateFilteringToggle = page.locator('label.switch');
  }

  // ---------- Menu / labels ----------

  async selectMenuOption(menuOption: string): Promise<void> {
    await this.menuOption.filter({ hasText: menuOption }).first().click();
  }

  async validatePageTitle(pageTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(pageTitle);
  }

  async verifyDateRangeLabel(dateRangeLabel: string): Promise<void> {
    const label = this.page.locator('div > div:nth-child(1) > label')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(dateRangeLabel)}\\s*$`) });
    await expect(label.first()).toBeVisible();
  }

  async verifyVisitIdLabel(): Promise<void> {
    await expect(this.visitIdSearchTextbox.first()).toBeVisible();
  }

  async verifyVisitsPageLabel(): Promise<void> {
    await expect(this.page.locator('.grid-title').first()).toBeVisible();
  }

  // ---------- Date pickers ----------

  async setToDateAndFromDate(fromDate: string, toDate: string): Promise<void> {
    await this.fromDateInput.fill(fromDate);
    await this.fromDateInput.press('Enter');
    await this.toDateInput.fill(toDate);
    await this.toDateInput.press('Enter');
  }

  async clickFromDatePicker(): Promise<void> {
    await this.calendar.first().click();
  }

  async selectDateOptionFromDatePicker(dateOption: string): Promise<void> {
    await this.page.locator('.trax-btn.trax-btn-small.trax-btn-tertiary').filter({ hasText: dateOption }).first().click();
  }

  async getFromDateValue(): Promise<string> {
    return this.fromDateInput.inputValue();
  }

  async getToDateValue(): Promise<string> {
    return this.toDateInput.inputValue();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  verifyDateRange(dateRange: string, fromDate: string, toDate: string): void {
    const today = new Date();
    let expectedFrom: Date;
    switch (dateRange.toUpperCase()) {
      case 'TODAY':
        expectedFrom = today;
        break;
      case 'THIS WEEK': {
        const dayOfWeek = today.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        expectedFrom = new Date(today);
        expectedFrom.setDate(today.getDate() + diffToMonday);
        break;
      }
      case 'LAST 2 WEEKS':
        expectedFrom = new Date(today);
        expectedFrom.setDate(today.getDate() - 14);
        break;
      case 'THIS MONTH':
        expectedFrom = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      default:
        throw new Error(`Unknown date range: ${dateRange}`);
    }
    expect(fromDate).toBe(this.formatDate(expectedFrom));
    expect(toDate).toBe(this.formatDate(today));
  }

  async verifyHighlightedDateRange(fromDate: string, toDate: string): Promise<void> {
    const fromDay = new Date(fromDate).getDate();
    const toDay = new Date(toDate).getDate();
    await expect(this.highlightedDates.first()).toBeVisible();
    const firstText = await this.highlightedDates.first().textContent();
    expect(Number((firstText ?? '').trim())).toBe(fromDay);
    const lastText = await this.highlightedDates.last().textContent();
    expect(Number((lastText ?? '').trim())).toBe(toDay);
  }

  // ---------- Column selector / grid ----------

  async selectGridColumNameToShow(columnName: string): Promise<void> {
    await this.showColumnNameOption.click();
    await this.columnSearchInput.fill('');
    await this.columnSearchInput.fill(columnName);
    await this.columnSearchInput.press('Enter');
    await this.showColumnNameOption.click();
  }

  async selectColumnNameByName(columnName: string): Promise<void> {
    await this.showColumnNameOption.click();
    await this.columnSearchInput.fill(columnName);
    const checkbox = this.columnSelectCheckboxes.first();
    await checkbox.waitFor({ state: 'attached' });
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }
    await this.showColumnNameOption.click();
  }

  async verifyColumnIsVisibleInTheGrid(columnName: string): Promise<void> {
    await expect(this.columnHeaders.filter({ hasText: columnName }).first()).toBeVisible();
  }

  getCellByRowNumberAndColumnNumber(rowNumber: number, columnNumber: number): Locator {
    return this.page
      .locator('.ag-center-cols-container, .ag1-center-cols-container')
      .locator(`> :nth-child(${rowNumber}) > div:nth-child(${columnNumber})`);
  }

  /** Reads the first-row value of the column whose header contains columnName (numeric). */
  async findColumnValueInFirstRow(columnName: string): Promise<number> {
    await expect(this.columnHeaders.first()).toBeVisible();
    const headers = await this.columnHeaders.allTextContents();
    const index = headers.findIndex(text => text.includes(columnName));
    expect(index, `Column "${columnName}" header should exist`).toBeGreaterThanOrEqual(0);
    const cell = this.getCellByRowNumberAndColumnNumber(1, index + 1);
    await expect(cell).toBeVisible();
    const text = ((await cell.textContent()) ?? '').trim();
    return parseInt(text, 10);
  }

  getColumn(columnName: string): Locator {
    return this.page.locator(`.ag-center-cols-container [col-id="${columnName}"]`);
  }

  async verifyColumn(columnName: string, expectedValue: string): Promise<void> {
    const cells = this.getColumn(columnName);
    await expect(cells.first()).toBeVisible();
    const texts = (await cells.allTextContents()).map(t => t.trim());
    for (const text of texts) {
      expect(text).toBe(expectedValue);
    }
  }

  async verifyAttributeOneColumnName(attributeName: string): Promise<void> {
    const scrollViewport = this.page.locator('div[class="ag-body-horizontal-scroll-viewport"]');
    await expect(scrollViewport).toBeAttached();
    await scrollViewport.evaluate((el) => { el.scrollLeft = 100000; });
    await expect(
      this.page.locator('div.ag-header-row.ag-header-row-column div.ag-header-cell').filter({ hasText: attributeName }).first(),
    ).toBeAttached({ timeout: 10000 });
  }

  // ---------- Filter panel ----------

  async clickOnTheFilterPanel(): Promise<void> {
    await this.filterPanelButton.click();
  }

  async openFilterPanel(): Promise<void> {
    await this.filterPanelButton.click({ force: true });
  }

  async filterByGivenValue(filterOption: string): Promise<void> {
    const option = this.filterPanelItems
      .locator('div')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(filterOption)}\\s*$`) })
      .first();
    await option.click();
  }

  async clickApplyButton(): Promise<void> {
    await this.applyButton.first().click();
    await this.filterPanelButton.click();
  }

  async clickApplyButtonOnly(): Promise<void> {
    await this.applyButton.first().click();
  }

  async selectStatus(status: string): Promise<void> {
    await this.page.locator('#status-minifilter').fill(status);
    await this.page.locator('label[for="status-0-input"]').click();
  }

  async selectStoreStatus(status: string): Promise<void> {
    await this.page.locator('#storeStatus-minifilter').fill(status);
    await this.page.locator('label[for="storeStatus-0-input"]').click();
    await this.applyButton.nth(1).click();
    await this.clickOnTheFilterPanel();
  }

  async setUser(userEmail: string): Promise<void> {
    await this.page.locator('#salesRepName-minifilter').fill(userEmail);
    await this.page.locator('label[for="salesRepName-0-input"]').filter({ hasText: userEmail }).first().click({ force: true });
    await this.applyButton.first().click();
    await this.clickOnTheFilterPanel();
  }

  async selectReviewStatus(reviewStatus: string): Promise<void> {
    await this.page.locator('#qualityReviewStatus-minifilter').fill(reviewStatus);
    await this.page.locator('#qualityReviewStatus-3-label > label').click();
    await this.applyButton.first().click();
    await this.clickOnTheFilterPanel();
  }

  async clickFlaggedFilterOption(): Promise<void> {
    await this.page.locator('.ag-first-group-visible > .ag-group > .ag-group-title-bar').click();
  }

  async selectFlaggedCheckBox(): Promise<void> {
    await this.page.locator('#flagged-0-input').click();
  }

  // ---------- Sorting ----------

  async clickOnDateColumnForAscending(): Promise<void> {
    await this.page.locator('.ag-header-cell-text[aria-colindex="4"]').click({ force: true });
  }

  async clickOnDateColumnDescending(): Promise<void> {
    await this.page.locator('.ag-header-cell-text[aria-colindex="4"]').dblclick({ force: true });
  }

  async verifyDatesSorted(isAscending = true): Promise<void> {
    const dateCells = this.page.locator('.ag-center-cols-container [col-id="visitDate"]');
    await expect(dateCells.first()).toBeVisible();
    const dateValues = await dateCells.allTextContents();
    const actual = dateValues.map(d => new Date(d).getTime());
    const sorted = [...actual].sort((a, b) => (isAscending ? a - b : b - a));
    expect(actual).toEqual(sorted);
  }

  async clickNumberOfScenesColumnForAscending(): Promise<void> {
    await this.page.locator('.ag-header-cell-text[aria-colindex="17"]').click({ force: true });
  }

  async clickNumberOfScenesColumnForDescending(): Promise<void> {
    await this.page.locator('.ag-header-cell-text[aria-colindex="17"]').dblclick({ force: true });
  }

  async verifyNumberOfScenesSorted(isAscending = true): Promise<void> {
    const cells = this.page.locator('.ag-center-cols-container [col-id="actualNumberOfScenes"]');
    await expect(cells.first()).toBeVisible();
    const nums = (await cells.allTextContents()).map(t => parseInt(t.trim(), 10));
    const sorted = [...nums].sort((a, b) => (isAscending ? a - b : b - a));
    expect(nums).toEqual(sorted);
  }

  // ---------- Navigation / search ----------

  async clickOnTab(index: number): Promise<void> {
    await this.page.locator('.nav-item').nth(index).click();
  }

  async searchVisits(id: string | number): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) => this.ellipsisIconUrl.test(response.url()) && response.request().method() === 'GET',
      { timeout: 120000 },
    );
    await this.visitIdSearchTextbox.first().fill('');
    await this.visitIdSearchTextbox.first().fill(String(id));
    await this.visitIdSearchTextbox.first().press('Enter');
    const response = await responsePromise;
    expect(response.status()).toBe(200);
  }

  // Visit Viewer verifications used by this feature
  async verifyVisitIdOnVisitViewer(expectedVisitId: string | number): Promise<void> {
    const title = this.page.locator('.explorer-sub-header-top-title');
    await expect.poll(async () => {
      const text = (await title.textContent()) ?? '';
      const match = text.match(/\d+/);
      return match ? match[0] : null;
    }, { timeout: 30000 }).toBe(String(expectedVisitId));
  }

  async clickBackButton(): Promise<void> {
    await this.page.locator('#back').click();
  }

  async verifySessionUidInUrl(expectedSessionUid: string): Promise<void> {
    await expect.poll(() => {
      const url = this.page.url();
      return url.substring(url.lastIndexOf('/') + 1);
    }, { timeout: 30000 }).toBe(expectedSessionUid);
  }

  async verifyHighlightedFlagIconInVisitViewer(): Promise<void> {
    await expect(this.page.locator('#flag-filled > path')).toBeVisible();
  }

  // ---------- Flagged visits ----------

  async clickFlagIcon(): Promise<void> {
    await this.getCellByRowNumberAndColumnNumber(1, 1).click();
  }

  async getVisitIdOfFlaggedVisit(): Promise<string> {
    const cell = this.getCellByRowNumberAndColumnNumber(1, 2);
    await expect(cell).toBeVisible();
    return ((await cell.textContent()) ?? '').trim();
  }

  async verifyHighlightedFlagIcon(): Promise<void> {
    await expect(this.page.locator('.ag-cell-value.ag-cell-focus').first()).toBeVisible();
  }

  async verifyFilteredVisitIdMatchesFlaggedId(flaggedVisitId: string): Promise<void> {
    const cell = this.getCellByRowNumberAndColumnNumber(1, 2);
    await expect(cell).toBeVisible();
    expect(((await cell.textContent()) ?? '').trim()).toBe(flaggedVisitId);
  }

  async clickFlaggedVisitId(): Promise<void> {
    await this.getCellByRowNumberAndColumnNumber(1, 2).click();
  }

  // ---------- Grid count / export ----------

  async extractVisitsGridCount(): Promise<number> {
    await this.visitsGridDataCount.waitFor({ state: 'visible', timeout: 10000 });
    let count = 0;
    await expect(async () => {
      const text = await this.visitsGridDataCount.textContent();
      const match = text ? text.match(/\d+/) : null;
      expect(match).not.toBeNull();
      count = Number(match![0]);
    }).toPass({ timeout: 10000 });
    return count;
  }

  async clickExportButton(): Promise<void> {
    await this.exportButton.filter({ hasText: 'EXPORT' }).first().click({ force: true });
  }

  async clickExportOption(option: string): Promise<void> {
    await this.exportModalButtons.filter({ hasText: option }).first().click();
  }

  async verifyExportConfirmationDialogBoxHeader(): Promise<void> {
    await expect(this.exportConfirmationHeader.filter({ hasText: 'File export task created' }).first()).toBeVisible();
  }

  async verifyImageExportOkButton(): Promise<void> {
    await expect(this.imageExportOkButton.first()).toBeVisible();
    await expect(this.imageExportOkButton.first()).toBeEnabled();
  }

  async clickImageExportOkButton(): Promise<void> {
    await this.verifyImageExportOkButton();
    await this.imageExportOkButton.first().click();
  }

  async extractTaskIdFromExportConfirmationDialog(): Promise<string> {
    const text = await this.modalBody.first().textContent();
    const match = text ? text.match(/Task ID:\s*(\S+)/) : null;
    return match ? match[1] : '';
  }

  // ---------- Internal Date Filtering ----------

  getPrimaryIdCells(): Locator {
    return this.getColumn('primaryId');
  }

  async getPrimaryIdsForArray(): Promise<string[]> {
    await expect(this.getPrimaryIdCells().first()).toBeVisible();
    const texts = await this.getPrimaryIdCells().allTextContents();
    return texts.map(t => t.trim()).filter(t => t.length > 0);
  }

  async clickInternalDateFilteringToggleAndWaitForGridToLoad(): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) => /explorer\/api\/projects\/[^/]+\/visits\/all\?/.test(response.url()) && response.request().method() === 'GET',
      { timeout: 120000 },
    );
    await this.internalDateFilteringToggle.first().click();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    await expect(this.getPrimaryIdCells().first()).toHaveText(/\S/);
  }
}

/** Entities Management (Stores app) interactions used by the additional-attribute rename scenario. */
export class VisitsStoresHelper {
  private readonly page: Page;
  private readonly entitiesManagementTab: Locator;
  private readonly entityManagementPageName: Locator;
  private readonly searchTextBox: Locator;
  private readonly editButton: Locator;
  private readonly editAttributeTextBox: Locator;
  private readonly applyButton: Locator;
  private readonly attributeName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.entitiesManagementTab = page.locator('[data-cy="side-nav-entities-management"]');
    this.entityManagementPageName = page.locator('.second-title');
    this.searchTextBox = page.locator('input[placeholder="Search"]');
    this.editButton = page.locator('div[class="item pointer selected"] div[class="buttons"]');
    this.editAttributeTextBox = page.locator('.input').nth(1);
    this.applyButton = page.locator('.footer > :nth-child(2)');
    this.attributeName = page.locator('div[class="sections"] section app-entities-settings h5');
  }

  async navigateToStores(storesUrl: string): Promise<void> {
    await this.page.goto(storesUrl, { waitUntil: 'domcontentloaded', timeout: 70000 });
  }

  async clickEntitiesManagementTab(): Promise<void> {
    await this.entitiesManagementTab.click();
    await expect(this.entityManagementPageName.first()).toBeVisible();
  }

  async searchFor(text: string): Promise<void> {
    await this.searchTextBox.click({ force: true });
    await this.searchTextBox.fill(text);
  }

  async renameSelectedAttribute(newName: string): Promise<void> {
    await this.editButton.click();
    await this.editAttributeTextBox.fill('');
    await this.editAttributeTextBox.fill(newName);
    await this.applyButton.click();
  }

  async verifyAttributeName(pageHeader: string): Promise<void> {
    await expect(this.attributeName).toHaveText(pageHeader);
  }
}

/** Exports grid interactions used by the visits export scenarios. */
export class VisitsExportsHelper {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getColumnValuesOfExportsGrid(columnName: string, rowIndex: number = visitsExportsConstants.firstRowIndex): Locator {
    return this.page.locator(`div[row-index="${rowIndex}"] [col-id="${columnName}"]`);
  }

  async getFirstCellCount(columnName: string): Promise<number> {
    const cell = this.getColumnValuesOfExportsGrid(columnName).first();
    await expect(cell).toBeVisible();
    return Number(((await cell.textContent()) ?? '').split('/')[0]);
  }

  async verifyProcessedItemGridCount(columnName: string, expectedCount: number): Promise<void> {
    await expect.poll(() => this.getFirstCellCount(columnName), {
      message: `Expected first-row ${columnName} to equal ${expectedCount}`,
      timeout: 30000,
    }).toBe(expectedCount);
  }

  async verifyFirstRowValues(expectedValues: Record<string, string>): Promise<void> {
    for (const [columnName, expectedValue] of Object.entries(expectedValues)) {
      await expect(this.getColumnValuesOfExportsGrid(columnName).first()).toHaveText(expectedValue);
    }
  }

  async verifyStatus(expectedStatuses: string[]): Promise<void> {
    const normalizedExpected = expectedStatuses.map(s => s.toLowerCase());
    const cell = this.getColumnValuesOfExportsGrid(visitsExportsPageColumnNames.status).first();
    await expect(cell).toBeVisible();
    const actual = ((await cell.textContent()) ?? '').trim().toLowerCase();
    expect(normalizedExpected).toContain(actual);
  }

  async verifyYourFiles(columnName: string, expectedTemplate: string): Promise<void> {
    const prefix = expectedTemplate.split('(')[0].trim();
    const expectedText = new RegExp(`^${escapeRegExp(prefix)}\\s*\\([0-9]+\\)$`);
    const cell = this.getColumnValuesOfExportsGrid(columnName).first();
    await expect(cell).toBeVisible();
    await expect.poll(async () => ((await cell.textContent()) ?? '').replace(/ /g, ' ').trim()).toMatch(expectedText);
  }

  async getTaskIdFromGrid(): Promise<string> {
    const cell = this.getColumnValuesOfExportsGrid('Task ID').first();
    await expect(cell).toBeVisible();
    return ((await cell.textContent()) ?? '').trim();
  }

  async verifyTaskIdInGrid(expectedTaskId: string): Promise<void> {
    expect((await this.getTaskIdFromGrid())).toBe(expectedTaskId);
  }

  async clickOnYourFilesLink(columnName: string): Promise<void> {
    await this.getColumnValuesOfExportsGrid(columnName)
      .first()
      .locator('trx-explorer-ag-link-array-cell-renderer div .trax-link')
      .first()
      .click();
  }

  /** Clicks the zip link and saves the resulting download under downloads/. */
  async clickOnZipFileLinkAndDownload(downloadsFolder = 'downloads'): Promise<{ filePath: string; suggestedFilename: string }> {
    const [download]: [Download, void] = await Promise.all([
      this.page.waitForEvent('download', { timeout: 60000 }),
      this.page.locator('div.links-container > div > span').first().click(),
    ]);
    fs.mkdirSync(downloadsFolder, { recursive: true });
    const suggestedFilename = download.suggestedFilename();
    const filePath = path.resolve(downloadsFolder, suggestedFilename);
    await download.saveAs(filePath);
    return { filePath, suggestedFilename };
  }

  async clickOnCloseMarkFilesDialogBox(): Promise<void> {
    await this.page.locator('#close-medium').click();
  }

  /** Counts entries in a zip by reading the End Of Central Directory record (no external dependency). */
  getZipEntryCount(zipFilePath: string): number {
    const buffer = fs.readFileSync(zipFilePath);
    for (let i = buffer.length - 22; i >= 0; i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) {
        return buffer.readUInt16LE(i + 10);
      }
    }
    throw new Error(`Not a valid zip file: ${zipFilePath}`);
  }
}
