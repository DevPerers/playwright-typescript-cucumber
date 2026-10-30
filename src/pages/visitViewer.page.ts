import { Page, Locator, expect } from '@playwright/test';

const VIEWER_LOADED_ICON = 'ellipsis.icon.svg';

export class VisitViewerPage {
  readonly page: Page;

  // Visit Viewer - comments
  readonly commentOption: Locator;
  readonly commentDialogCard: Locator;
  readonly commentTextArea: Locator;
  readonly commentPostButton: Locator;
  readonly commentPopupCloseOption: Locator;
  readonly commentMessageText: Locator;

  // Visit Viewer - cards / grids
  readonly showButtons: Locator;
  readonly taskFeedbackGrid: Locator;
  readonly contentContainer: Locator;
  readonly sceneCardTitle: Locator;
  readonly sceneCardDetailValues: Locator;
  readonly sceneCardHeaders: Locator;
  readonly surveyMessage: Locator;

  // Visit Viewer - header
  readonly storeLink: Locator;
  readonly storeTooltipText: Locator;
  readonly previousVisitLinks: Locator;
  readonly visitDateTooltip: Locator;
  readonly headerTooltipSpans: Locator;
  readonly headerStoreLink: Locator;

  // Stores page
  readonly storePropertyValues: Locator;

  // Scene Viewer page
  readonly sceneViewerSceneTypeName: Locator;

  // Visits / Scenes page
  readonly visitIdSearchByIdField: Locator;
  readonly visitIdSearchTextbox: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly sceneIdInput: Locator;

  // Reporting Configuration page
  readonly reportingCheckboxes: Locator;
  readonly reportingSaveButton: Locator;
  readonly reportingPopupButton: Locator;

  // Data Collection page
  readonly dataCollectionAppName: Locator;
  readonly dataCollectionTabs: Locator;
  readonly captureTasksMenu: Locator;
  readonly taskSearchInput: Locator;
  readonly taskDisplayNameValue: Locator;
  readonly taskNameValue: Locator;

  constructor(page: Page) {
    this.page = page;

    this.commentOption = page.locator('div[class="explorer-viewer-sub-header-top-actions-container"] > trx-explorer-tooltip:nth-child(3)');
    this.commentDialogCard = page.locator('div[class="comments-dialog-card"]');
    this.commentTextArea = page.locator('textarea[placeholder="Your Message"]');
    this.commentPostButton = page.locator('trx-explorer-async-button > button');
    this.commentPopupCloseOption = page.locator('div.comments-dialog-topbar > span > svg-icon');
    this.commentMessageText = page.locator('.comment-message-text');

    this.showButtons = page.locator('.trax-link.explorer-viewer-card-header-collapse-link');
    this.taskFeedbackGrid = page.locator('div:nth-child(2) > trx-explorer-viewer-card-component > div > div');
    this.contentContainer = page.locator('trx-explorer-viewer-layout > trx-explorer-content-container');
    this.sceneCardTitle = page.locator('span.card-title-center-container');
    this.sceneCardDetailValues = page.locator('.explorer-entity-viewer-card-detail div.explorer-entity-viewer-card-value');
    this.sceneCardHeaders = page.locator('div > .explorer-entity-viewer-card-header');
    this.surveyMessage = page.locator('div.explorer-viewer-card-header-container');

    this.storeLink = page.locator('.trax-tooltip-container > a');
    this.storeTooltipText = page.locator('.trax-tooltip-text div.store-tooltip > span');
    this.previousVisitLinks = page.locator('ul.unordered-list-container li.previous-visit-link a');
    this.visitDateTooltip = page.locator('span:nth-child(1) > trx-explorer-tooltip > div').nth(1);
    this.headerTooltipSpans = page.locator('.explorer-viewer-tooltip-container > span');
    this.headerStoreLink = page.locator('.explorer-viewer-tooltip-container > a[href^="/stores/"]');

    this.storePropertyValues = page.locator('.property__value');

    this.sceneViewerSceneTypeName = page.locator(':nth-child(3) > trx-explorer-tooltip > div');

    this.visitIdSearchByIdField = page.locator('input[placeholder="Visit ID"]');
    this.visitIdSearchTextbox = page.locator('.input-with-icon > .trax-form-control');
    this.fromDateInput = page.locator(':nth-child(3) > .trax-form-control--datepicker-icon-container > .trax-form-control');
    this.toDateInput = page.locator(':nth-child(2) > .trax-form-control--datepicker-icon-container > .trax-form-control');
    this.sceneIdInput = page.locator('input[placeholder="Scene ID"]');

    this.reportingCheckboxes = page.locator('.general_section trax-checkbox');
    this.reportingSaveButton = page.locator('.save-button');
    this.reportingPopupButton = page.locator('.xsuite-popup-button');

    this.dataCollectionAppName = page.locator('.application-name.trax-tst-app-name');
    this.dataCollectionTabs = page.locator('div.scrolled > div > div');
    this.captureTasksMenu = page.locator('div[class="navigation-tab-expansion-title sp-flex-grow"]').filter({ hasText: 'Capture Tasks' });
    this.taskSearchInput = page.locator('input[placeholder="Search..."]');
    this.taskDisplayNameValue = page.locator('[ng-if="ctrl.selectedTask"] > :nth-child(3) > .attribute-value');
    this.taskNameValue = page.locator('[ng-if="ctrl.selectedTask"] > :nth-child(1) > .attribute-value');
  }

  // ---------- Generic helpers ----------

  private waitForViewerLoaded(): Promise<unknown> {
    return this.page.waitForResponse(
      (response) => response.url().includes(VIEWER_LOADED_ICON) && response.status() === 200,
      { timeout: 120000 },
    );
  }

  private async textOf(locator: Locator): Promise<string> {
    return ((await locator.textContent()) || '').trim();
  }

  // ---------- Visits page ----------

  async navigateToVisitViewerPageByID(visitId: string): Promise<void> {
    const loaded = this.waitForViewerLoaded();
    await this.visitIdSearchByIdField.fill(visitId);
    await this.visitIdSearchByIdField.press('Enter');
    await loaded;
  }

  async searchVisits(visitId: string | number): Promise<void> {
    const loaded = this.waitForViewerLoaded();
    await this.visitIdSearchTextbox.clear();
    await this.visitIdSearchTextbox.fill(String(visitId));
    await this.visitIdSearchTextbox.press('Enter');
    await loaded;
  }

  async setToDateAndFromDate(fromDate: string, toDate: string): Promise<void> {
    await this.fromDateInput.fill(fromDate);
    await this.fromDateInput.press('Enter');
    await this.toDateInput.fill(toDate);
    await this.toDateInput.press('Enter');
  }

  private gridCell(row: number, col: number): Locator {
    return this.page.locator(`div[class="ag-center-cols-container"] > div:nth-child(${row}) > div:nth-child(${col})`);
  }

  async getVisitsGridCellText(row: number, col: number): Promise<string> {
    const cell = this.gridCell(row, col);
    await expect(cell).toBeVisible();
    return this.textOf(cell);
  }

  async clickVisitsGridCell(row: number, col: number): Promise<void> {
    await this.gridCell(row, col).click();
  }

  // ---------- Comments ----------

  async openCommentPopupWindow(): Promise<void> {
    await this.commentOption.click();
    await expect(this.commentDialogCard).toBeVisible();
  }

  async addComment(commentText: string): Promise<void> {
    await this.commentTextArea.fill(commentText);
  }

  async clickPostButton(): Promise<void> {
    await this.commentPostButton.click();
  }

  async verifyAddedComment(commentText: string): Promise<void> {
    await expect(this.commentMessageText.filter({ hasText: commentText }).first()).toBeVisible();
    await this.commentPopupCloseOption.click();
  }

  // ---------- Store link ----------

  async getStoreName(): Promise<string> {
    await expect(this.storeLink).toBeVisible();
    return this.textOf(this.storeLink);
  }

  async getVisitViewerStoreLinkTooltipText(): Promise<string> {
    await this.storeLink.hover();
    await expect(this.storeTooltipText.first()).toBeVisible();
    return (await this.storeTooltipText.allTextContents()).join('');
  }

  async clickStoreLink(): Promise<void> {
    const href = await this.storeLink.getAttribute('href');
    expect(href).toBeTruthy();
    await this.page.goto(new URL(href!, this.page.url()).toString(), { waitUntil: 'domcontentloaded' });
  }

  async checkPageTitle(pageTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(pageTitle);
  }

  async verifyStoreNameOnStorePage(storeName: string): Promise<void> {
    await expect(this.storePropertyValues.first()).toHaveText(storeName);
  }

  async verifyStoreLinkTooltip(property: string, value: string): Promise<void> {
    await expect(this.storePropertyValues.first()).toBeVisible();
    const count = await this.storePropertyValues.count();
    for (let i = 0; i < count; i++) {
      const element = this.storePropertyValues.nth(i);
      if ((await element.textContent()) === `${property}:`) {
        await expect(element.locator('xpath=..').locator('.property__value').last()).toHaveText(value);
      }
    }
  }

  // ---------- Last visits under the map ----------

  async clickOnVisitDate(index: number): Promise<string> {
    const link = this.previousVisitLinks.nth(index);
    await expect(link).toBeVisible();
    const linkDate = await this.textOf(link);
    await link.click();
    return linkDate;
  }

  async extractVisitDateFromTooltip(): Promise<string> {
    await this.visitDateTooltip.hover();
    const span = this.visitDateTooltip.locator('span');
    await expect(span.first()).toBeVisible();
    const tooltipText = (await span.allTextContents()).join('');
    const match = tooltipText.match(/Start:\s*(.*?)\s*End:/);
    return match ? match[1].trim() : '';
  }

  // ---------- Task feedback grid ----------

  async scrollToBottomOfThePage(): Promise<void> {
    await this.contentContainer.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
  }

  async verifyTaskFeedbackGridIsPresent(): Promise<void> {
    await expect(this.taskFeedbackGrid.first()).toBeAttached();
  }

  async verifyTaskFeedbackGridIsAbsent(): Promise<void> {
    await expect(this.taskFeedbackGrid).toHaveCount(0);
  }

  // ---------- Scene card ----------

  async scrollToSceneCardTitle(): Promise<void> {
    await this.sceneCardTitle.first().scrollIntoViewIfNeeded();
  }

  async verifySceneCardValue(expected: string, index: number): Promise<void> {
    await expect(this.sceneCardDetailValues.nth(index)).toHaveText(expected.trim());
  }

  async getSceneCardCount(): Promise<number> {
    await expect(this.sceneCardHeaders.first()).toBeVisible();
    return this.sceneCardHeaders.count();
  }

  // ---------- Scenes page / Scene Viewer ----------

  async goToSceneViewerPageByID(sceneId: string): Promise<void> {
    const loaded = this.page.waitForResponse(
      (response) => response.url().includes('copy.icon.svg') && response.status() === 200,
      { timeout: 120000 },
    );
    await this.sceneIdInput.click();
    await this.sceneIdInput.fill(sceneId);
    await this.sceneIdInput.press('Enter');
    await loaded;
  }

  async verifySceneViewerSceneTypeName(expected: string): Promise<void> {
    const element = this.sceneViewerSceneTypeName.first();
    await expect(element).toBeVisible();
    await expect(async () => {
      // Direct text nodes only, as in the Cypress implementation
      const text = await element.evaluate((el) =>
        Array.from(el.childNodes)
          .filter((node) => node.nodeType === 3)
          .map((node) => node.textContent || '')
          .join('')
          .trim(),
      );
      expect(text).toBe(expected);
    }).toPass();
  }

  // ---------- Visit header details ----------

  private async headerValueBefore(label: string | RegExp, splitOn: string): Promise<string> {
    const span = this.headerTooltipSpans.filter({ hasText: label }).first();
    await expect(span).toBeVisible();
    const parentText = (await span.locator('xpath=..').textContent()) || '';
    return parentText.split(splitOn)[0].trim();
  }

  async verifyHeaderVisitDate(expected: string): Promise<void> {
    await expect(async () => {
      expect(await this.headerValueBefore(/start:/i, 'Start:')).toBe(expected);
    }).toPass();
  }

  async verifyHeaderRegion(expected: string): Promise<void> {
    await expect(async () => {
      expect(await this.headerValueBefore('Region', 'Region')).toBe(expected);
    }).toPass();
  }

  async verifyHeaderStoreName(expected: string): Promise<void> {
    await expect(this.headerStoreLink.first()).toHaveText(expected);
  }

  async verifyHeaderUser(expected: string): Promise<void> {
    await expect(async () => {
      expect(await this.headerValueBefore('Mobile User', 'Mobile User')).toBe(expected);
    }).toPass();
  }

  async verifyHeaderStatus(expected: string): Promise<void> {
    await expect(async () => {
      expect(await this.headerValueBefore('Status', 'Status')).toBe(expected);
    }).toPass();
  }

  // ---------- Survey ----------

  async verifyNoSurveyMessage(message: string): Promise<void> {
    await expect(this.surveyMessage.nth(1)).toContainText(message);
  }

  // ---------- Product grid ----------

  async openProductGrid(): Promise<void> {
    await this.showButtons.nth(1).filter({ hasText: 'SHOW' }).click();
  }

  private productGridCell(rowId: number, colId: string): Locator {
    return this.page.locator(`div.ag-row[row-id="${rowId}"] div[col-id="${colId}"]`);
  }

  async getTheCellValue(rowId: number, colId: string): Promise<string> {
    const cell = this.productGridCell(rowId, colId);
    await expect(cell).toBeAttached();
    return this.textOf(cell);
  }

  async verifyPriceIsVisible(rowId: number, colId: string): Promise<void> {
    const value = await this.getTheCellValue(rowId, colId);
    expect(value, `Cell ${colId} in row ${rowId} should have a value`).not.toBe('');
  }

  async verifyPriceIsHidden(rowId: number, colId: string): Promise<void> {
    const value = await this.getTheCellValue(rowId, colId);
    expect(value, `Cell ${colId} in row ${rowId} should be empty`).toBe('');
  }

  // ---------- Reporting Configuration ----------

  private async setCheckbox(index: number, shouldBeChecked: boolean): Promise<void> {
    const checkbox = this.reportingCheckboxes.nth(index);
    await expect(checkbox).toBeVisible();
    // Cypress read the custom element's `checked` attribute / property
    const isChecked = await checkbox.evaluate(
      (el) => el.getAttribute('checked') === 'checked' || (el as unknown as { checked?: boolean }).checked === true,
    );
    if (isChecked !== shouldBeChecked) {
      await checkbox.click();
      await this.reportingSaveButton.click();
      await this.reportingPopupButton.click();
    }
  }

  async setHidePriceCheckbox(shouldBeChecked: boolean): Promise<void> {
    await this.setCheckbox(1, shouldBeChecked);
  }

  async setDisplayTaskFeedbackCheckbox(shouldBeChecked: boolean): Promise<void> {
    await this.setCheckbox(2, shouldBeChecked);
  }

  async setSceneTypeDisplayCheckBox(shouldBeChecked: boolean): Promise<void> {
    await this.setCheckbox(3, shouldBeChecked);
  }

  // ---------- Data Collection ----------

  async verifyDataCollectionPageLoaded(): Promise<void> {
    await expect(this.dataCollectionAppName).toBeVisible();
  }

  async clickTaskManagementTab(): Promise<void> {
    await this.dataCollectionTabs.nth(2).click();
  }

  async navigateToCaptureTaskPage(): Promise<void> {
    await this.captureTasksMenu.click();
  }

  async selectCaptureTask(taskName: string): Promise<void> {
    await this.taskSearchInput.fill(taskName);
    const item = this.page.locator('.tasks-list-item-name').filter({ hasText: taskName }).first();
    await expect(item).toBeVisible();
    await item.click({ force: true });
  }

  async getDisplayName(): Promise<string> {
    await expect(this.taskDisplayNameValue).toBeVisible();
    return this.textOf(this.taskDisplayNameValue);
  }

  async getTaskName(): Promise<string> {
    await expect(this.taskNameValue).toBeVisible();
    return this.textOf(this.taskNameValue);
  }
}
