import { Page, Locator, expect } from '@playwright/test';
import { sceneViewerPageMessages } from '../support/sceneViewerConstants';

export class SceneViewerPage {
  readonly page: Page;

  // Scenes page (grid / search)
  readonly sceneIdSearchInput: Locator;
  readonly sceneIdTextBox: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly selectGridColumnsButton: Locator;
  readonly columnSelectSearchInput: Locator;
  readonly columnSelectCheckboxes: Locator;
  readonly horizontalScrollBar: Locator;
  readonly columnHeaders: Locator;

  // Scene viewer: comments
  readonly commentButton: Locator;
  readonly commentTextArea: Locator;
  readonly submitCommentButton: Locator;
  readonly commentPopUpCloseOption: Locator;

  // Scene viewer: header details
  readonly sceneViewerStoreLink: Locator;
  readonly sceneViewerStoreLinkTooltip: Locator;
  readonly sceneTitle: Locator;
  readonly tooltipContainerSpans: Locator;
  readonly dateTooltipSpans: Locator;
  readonly tooltipStoreLink: Locator;

  // Scene viewer: product grid / palette
  readonly productGroupByOption: Locator;
  readonly collapseLinks: Locator;
  readonly gridColumnsSelector: Locator;
  readonly columnSelectorCheckbox: Locator;
  readonly columnSelectorColumn: Locator;
  readonly productGridHeaderContainer: Locator;
  readonly surveyRows: Locator;
  readonly cardHeaderContainers: Locator;
  readonly generalSection: Locator;
  readonly productDetails: Locator;
  readonly productPaletteIcon: Locator;
  readonly productPaletteTitle: Locator;
  readonly skuFilterInput: Locator;
  readonly copySkuUrlButton: Locator;
  readonly copiedText: Locator;
  readonly filterProductName: Locator;
  readonly brandExpandArrows: Locator;
  readonly skuNameAndTagCount: Locator;
  readonly highlightedTags: Locator;
  readonly removeSkuFilterIcons: Locator;

  // Stores page
  readonly storePropertyValues: Locator;

  // Reporting configuration page
  readonly reportingCheckboxes: Locator;
  readonly saveButton: Locator;
  readonly popupButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sceneIdSearchInput = page.locator('input[placeholder="Scene ID"]');
    this.sceneIdTextBox = page.locator('trx-explorer-jump-to-detail-page > div > div > input');
    this.fromDateInput = page.locator('.trax-form-control').nth(2);
    this.toDateInput = page.locator('.trax-form-control').nth(3);
    this.selectGridColumnsButton = page.locator('div[class="ag-side-buttons"]>div:nth-child(1)>button');
    this.columnSelectSearchInput = page.locator('div[class="ag-column-select-header-filter-wrapper ag-labeled ag-label-align-left ag-text-field ag-input-field"]>div:nth-child(2)>input');
    this.columnSelectCheckboxes = page.locator('div.ag-virtual-list-container.ag-column-select-virtual-list-container input[type="checkbox"]');
    this.horizontalScrollBar = page.locator('div[class="ag-body-horizontal-scroll-viewport"]');
    this.columnHeaders = page.locator('div[class="ag-header-row ag-header-row-column"] span[class="ag-header-cell-text"]');

    this.commentButton = page.locator('div.explorer-viewer-sub-header-top-actions-container > trx-explorer-tooltip:nth-child(3)');
    this.commentTextArea = page.locator('textarea');
    this.submitCommentButton = page.locator('trx-explorer-async-button');
    this.commentPopUpCloseOption = page.locator('#close-medium');

    this.sceneViewerStoreLink = page.locator('div.explorer-viewer-sub-header-bottom-left span:nth-child(5) a');
    this.sceneViewerStoreLinkTooltip = page.locator('div.explorer-viewer-sub-header-bottom-left span:nth-child(5) span');
    this.sceneTitle = page.locator('.explorer-sub-header-top-title');
    this.tooltipContainerSpans = page.locator('.explorer-viewer-tooltip-container > span');
    this.dateTooltipSpans = page.locator('.trax-tooltip-container > span');
    this.tooltipStoreLink = page.locator('.explorer-viewer-tooltip-container > a[href^="/stores/"]');

    this.productGroupByOption = page.locator('.group-by-options-container');
    this.collapseLinks = page.locator('.explorer-viewer-card-header-collapse-link');
    this.gridColumnsSelector = page.locator('.ag-icon-columns');
    this.columnSelectorCheckbox = page.locator('.ag-column-select-checkbox > div');
    this.columnSelectorColumn = page.locator('.ag-column-select-column');
    this.productGridHeaderContainer = page.locator('.ag-header');
    this.surveyRows = page.locator('.ag-center-cols-container [row-id]');
    this.cardHeaderContainers = page.locator('.explorer-viewer-card-header-container');
    this.generalSection = page.locator('.tree-item > .trax-link > svg-icon');
    this.productDetails = page.locator('.leaf-item > span');
    this.productPaletteIcon = page.locator('.handle-vertical > .trax-icon-ellipsis');
    this.productPaletteTitle = page.locator('span.list-panel-header-title');
    this.skuFilterInput = page.locator('#sku-filter-input');
    this.copySkuUrlButton = page.locator('.trax-btn.trax-btn-small.trax-btn-secondary.copy-url-with-sku-filters-button');
    this.copiedText = page.locator('span.sku-filter-text');
    this.filterProductName = page.locator('.tagged-product-selected-filters-item-container > .trax-btn > span');
    this.brandExpandArrows = page.locator('svg#arrow-small-right');
    this.skuNameAndTagCount = page.locator('.tree-item.leaf-item > span > span');
    this.highlightedTags = page.locator('.tag-container > img.tag-default[src$="tag-yellow.png"]');
    this.removeSkuFilterIcons = page.locator('#close-medium');

    this.storePropertyValues = page.locator('.property__value');

    this.reportingCheckboxes = page.locator('trax-checkbox');
    this.saveButton = page.locator('.save-button');
    this.popupButton = page.locator('.xsuite-popup-button');
  }

  // ---------- Scenes page ----------

  async goToSceneViewerPageByID(sceneId: string): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/static/traxus/micro-frontends/web-components-icons/copy.icon.svg') &&
        [200, 304].includes(response.status()),
      { timeout: 120000 }
    );
    await this.sceneIdSearchInput.click();
    await this.sceneIdSearchInput.fill(sceneId);
    await this.sceneIdSearchInput.press('Enter');
    await responsePromise;
  }

  async searchSceneId(sceneId: string): Promise<void> {
    await this.sceneIdTextBox.clear();
    await this.sceneIdTextBox.fill(sceneId);
    await this.sceneIdTextBox.press('Enter');
  }

  async setToDateAndFromDate(fromDate: string, toDate: string): Promise<void> {
    await this.fromDateInput.fill(fromDate);
    await this.fromDateInput.press('Enter');
    await this.toDateInput.fill(toDate);
    await this.toDateInput.press('Enter');
  }

  async selectColumnByName(columnName: string): Promise<void> {
    await this.selectGridColumnsButton.click();
    await this.columnSelectSearchInput.fill(columnName);
    const checkbox = this.columnSelectCheckboxes.first();
    await expect(checkbox).toBeAttached();
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }
    await this.selectGridColumnsButton.click();
  }

  getCellValue(rowIndex: number, columnNumber: number): Locator {
    return this.page.locator(`.ag-center-cols-container > div [aria-colindex="${columnNumber}"]`).nth(rowIndex);
  }

  async getCellText(rowIndex: number, columnNumber: number): Promise<string> {
    const cell = this.getCellValue(rowIndex, columnNumber);
    await expect(cell).toBeAttached();
    return (await cell.textContent()) || '';
  }

  async findNumberOfSurveyColumnValue(columnName: string): Promise<number> {
    await expect(this.columnHeaders.filter({ hasText: columnName }).first()).toBeAttached();
    await this.horizontalScrollBar.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });
    const text = await this.getCellText(0, 27);
    return parseInt(text, 10);
  }

  async clickSceneId(): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/static/traxus/micro-frontends/web-components-icons/ellipsis.icon.svg') &&
        [200, 304].includes(response.status()),
      { timeout: 120000 }
    );
    await this.getCellValue(0, 4).click();
    await responsePromise;
  }

  async getSceneIdFromScenesGrid(): Promise<string> {
    return this.getCellText(0, 4);
  }

  async getSceneDateFromScenesGrid(): Promise<string> {
    return this.getCellText(0, 6);
  }

  async getStoreNameFromScenesGrid(): Promise<string> {
    return this.getCellText(0, 9);
  }

  async getUserNameFromScenesGrid(): Promise<string> {
    return this.getCellText(0, 16);
  }

  async getSceneTypeFromScenesGrid(): Promise<string> {
    return this.getCellText(0, 17);
  }

  async getStatusFromScenesGrid(): Promise<string> {
    return this.getCellText(0, 23);
  }

  // ---------- Scene viewer: comments ----------

  async openCommentPopupWindow(): Promise<void> {
    const sceneId = this.page.url().split('scenes')[1];
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url().includes('/explorer/api/projects/') &&
        response.url().includes(`/scene${sceneId}/comments`),
      { timeout: 60000 }
    );
    await this.commentButton.click();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
  }

  async addComment(commentText: string): Promise<void> {
    await this.commentTextArea.pressSequentially(commentText);
  }

  async clickPostButton(): Promise<void> {
    await this.submitCommentButton.click();
  }

  async verifyAddedComment(commentText: string): Promise<void> {
    await expect(this.commentTextArea).toBeVisible();
    await expect(this.commentTextArea).toHaveValue(new RegExp(commentText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  async closeCommentPopUp(): Promise<void> {
    await this.commentPopUpCloseOption.click();
  }

  // ---------- Scene viewer: store link ----------

  async getSceneViewerStoreName(): Promise<string> {
    await expect(this.sceneViewerStoreLink).toBeVisible();
    return ((await this.sceneViewerStoreLink.textContent()) || '').trim();
  }

  async getSceneViewerStoreLinkTooltipText(): Promise<string> {
    return (await this.sceneViewerStoreLinkTooltip.first().getAttribute('sp-tooltip')) || '';
  }

  async clickSceneViewerStoreLink(): Promise<void> {
    // Remove target so the store page opens in the same tab
    await this.sceneViewerStoreLink.evaluate((el) => el.removeAttribute('target'));
    await this.sceneViewerStoreLink.click();
  }

  // ---------- Stores page ----------

  async checkPageTitleContains(pageTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(pageTitle);
  }

  async verifyStoreNameOnStoresPage(storeName: string): Promise<void> {
    await expect(this.storePropertyValues.first()).toHaveText(storeName);
  }

  async verifyStoreLinkTooltip(property: string, value: string): Promise<void> {
    const label = this.storePropertyValues.filter({ hasText: new RegExp(`^${property}:$`) }).first();
    await expect(label).toBeVisible();
    await expect(label.locator('..').locator('.property__value').last()).toHaveText(value);
  }

  // ---------- Reporting configuration ----------

  async setSceneProductsCheckboxes(checkboxName: string, shouldBeChecked: boolean): Promise<void> {
    const checkbox = this.reportingCheckboxes.filter({ hasText: checkboxName }).first();
    await expect(checkbox).toBeVisible();
    const isChecked = (await checkbox.getAttribute('checked')) === 'checked';
    if (isChecked !== shouldBeChecked) {
      await checkbox.click();
      await this.clickOnSaveButton();
      await this.clickOnPopupBtn();
    }
  }

  async verifySceneProductsCheckboxIsChecked(checkboxName: string): Promise<void> {
    await expect(this.page.locator('trax-checkbox[checked="checked"]').filter({ hasText: checkboxName }).first()).toBeAttached();
  }

  async verifySceneProductsCheckboxIsUnchecked(checkboxName: string): Promise<void> {
    const checkbox = this.reportingCheckboxes.filter({ hasText: checkboxName }).first();
    await expect(checkbox).not.toHaveAttribute('checked', /.*/);
  }

  async setByBrandCheckBox(checkBoxName: string): Promise<void> {
    const checkbox = this.reportingCheckboxes.filter({ hasText: checkBoxName }).first();
    await expect(checkbox).toBeVisible();
    if ((await checkbox.getAttribute('checked')) !== 'checked') {
      await checkbox.click();
    }
  }

  async clickOnSaveButton(): Promise<void> {
    await this.saveButton.click();
  }

  async clickOnPopupBtn(): Promise<void> {
    await this.popupButton.click();
  }

  // ---------- Product group-by filters ----------

  async verifyProductToggleIsVisible(filterName: string): Promise<void> {
    await expect(this.productGroupByOption.getByText(filterName).first()).toBeVisible();
  }

  async verifyProductToggleIsNotExist(filterName: string): Promise<void> {
    await expect(this.productGroupByOption.getByText(filterName)).toHaveCount(0);
  }

  // ---------- Product grid ----------

  async openTheProductGrid(): Promise<void> {
    await this.collapseLinks.filter({ hasText: 'SHOW' }).first().click();
  }

  async clickGridColumnsSelector(): Promise<void> {
    await this.gridColumnsSelector.click();
  }

  async verifyAllColumnsAreSelected(): Promise<void> {
    await expect(this.columnSelectorCheckbox.first()).toBeVisible();
    const count = await this.columnSelectorCheckbox.count();
    for (let i = 0; i < count; i++) {
      await expect(this.columnSelectorCheckbox.nth(i)).toHaveClass(/ag-checked/);
    }
  }

  async deselectColumnByName(columnName: string): Promise<void> {
    await this.columnSelectorColumn.filter({ hasText: columnName }).first().click({ force: true });
  }

  async verifyColumnDeselected(columnName: string): Promise<void> {
    await expect(this.productGridHeaderContainer).not.toContainText(columnName);
  }

  // ---------- Survey grid ----------

  async openSurveyGrid(): Promise<void> {
    await this.collapseLinks.filter({ hasText: 'SHOW' }).first().click();
  }

  async scrollToEndOfColsContainer(): Promise<void> {
    let lastRowId = -1;
    while (true) {
      const lastRow = this.surveyRows.last();
      await expect(lastRow).toBeAttached();
      const currentRowId = Number(await lastRow.getAttribute('row-id'));
      if (currentRowId <= lastRowId) {
        break;
      }
      lastRowId = currentRowId;
      await lastRow.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
    }
  }

  async verifySurveyQuestionCount(surveyCount: number): Promise<void> {
    await this.scrollToEndOfColsContainer();
    const rowIds = await this.surveyRows.evaluateAll((rows) => rows.map((row) => Number(row.getAttribute('row-id'))));
    const totalRows = Math.max(...rowIds) + 1;
    expect(totalRows).toBe(surveyCount);
  }

  async verifySurveyGridTitleCount(surveyCount: number): Promise<void> {
    const title = this.cardHeaderContainers.filter({ hasText: 'Survey Questions' }).first();
    await expect(title).toBeVisible();
    const displayCount = (await title.textContent()) || '';
    const numericValue = Number(displayCount.split('Survey Questions ')[1].split('HIDE')[0].replace(/[()]/g, ''));
    expect(numericValue).toBe(surveyCount);
  }

  async verifyNoSurveyMessage(): Promise<void> {
    await expect(this.cardHeaderContainers.nth(0)).toContainText(sceneViewerPageMessages.noSurveyMessage);
  }

  // ---------- Scene details ----------

  async getSceneId(): Promise<string> {
    const title = this.sceneTitle.filter({ hasText: 'Scene' }).first();
    await expect(title).toBeVisible();
    const text = (await title.textContent()) || '';
    return text.split('Scene')[1].trim();
  }

  async verifySceneId(expectedSceneId: string): Promise<void> {
    expect(await this.getSceneId()).toBe(expectedSceneId);
  }

  private async getTooltipValue(label: string): Promise<string> {
    const labelSpan = this.tooltipContainerSpans.filter({ hasText: label }).first();
    await expect(labelSpan).toBeAttached();
    const text = (await labelSpan.locator('..').textContent()) || '';
    return text.split(label)[0].trim();
  }

  async getSceneDate(): Promise<string> {
    const labelSpan = this.dateTooltipSpans.filter({ hasText: 'Date' }).first();
    await expect(labelSpan).toBeAttached();
    const text = (await labelSpan.locator('..').textContent()) || '';
    return text.split('Date')[0].trim();
  }

  async verifySceneDate(expectedDate: string): Promise<void> {
    expect(await this.getSceneDate()).toBe(expectedDate);
  }

  async getStoreName(): Promise<string> {
    await expect(this.tooltipStoreLink.first()).toBeAttached();
    return ((await this.tooltipStoreLink.first().textContent()) || '').trim();
  }

  async verifyStoreName(expectedStoreName: string): Promise<void> {
    expect(await this.getStoreName()).toBe(expectedStoreName);
  }

  async verifyUser(expectedUser: string): Promise<void> {
    expect(await this.getTooltipValue('Mobile User')).toBe(expectedUser);
  }

  async verifyStatus(expectedStatus: string): Promise<void> {
    expect(await this.getTooltipValue('Scene status')).toBe(expectedStatus);
  }

  async verifyTaskName(expectedSceneType: string): Promise<void> {
    expect(await this.getTooltipValue('Scene Type')).toBe(expectedSceneType);
  }

  // ---------- Product palette ----------

  async clickGeneralSection(): Promise<void> {
    await this.generalSection.nth(2).click({ force: true });
  }

  async captureProductDetailsToArray(): Promise<string[]> {
    await expect(this.productDetails.first()).toBeAttached();
    return this.productDetails.allTextContents();
  }

  verifyProductDetailsAscendingOrder(productDetails: string[]): void {
    let isAscending = true;
    for (let i = 0; i < productDetails.length - 1; i++) {
      if (productDetails[i] > productDetails[i + 1]) {
        isAscending = false;
        break;
      }
    }
    expect(isAscending, 'Product details are in ascending order').toBe(true);
  }

  async verifyProductPaletteIcon(): Promise<void> {
    await expect(this.productPaletteIcon).toBeVisible();
  }

  async clickProductPalette(): Promise<void> {
    await this.productPaletteIcon.click();
  }

  async verifyProductPalette(productPaletteName: string, shouldBeVisible: boolean): Promise<void> {
    const title = this.productPaletteTitle.filter({ hasText: productPaletteName }).first();
    if (shouldBeVisible) {
      await expect(title).toBeVisible();
    } else {
      await expect(title).toBeHidden();
    }
  }

  // ---------- SKU highlighting ----------

  async searchBySku(productName: string | string[]): Promise<void> {
    const productNames = Array.isArray(productName) ? productName : [productName];
    await this.skuFilterInput.click();
    await this.skuFilterInput.clear();
    for (const name of productNames) {
      await this.skuFilterInput.pressSequentially(name);
      await this.skuFilterInput.press('Enter');
    }
  }

  async clickHighlightedSkuUrlButton(): Promise<void> {
    await this.copySkuUrlButton.click();
  }

  async verifyCopiedClipboardText(): Promise<void> {
    await expect(this.copiedText.filter({ hasText: 'Copied!' }).first()).toBeVisible();
  }

  async verifyHighlightedTagsProductName(productName: string): Promise<void> {
    await expect(this.filterProductName.first()).toContainText(productName);
  }

  async expandBrandOption(index: number): Promise<void> {
    await this.brandExpandArrows.nth(index).click({ force: true });
  }

  async getTagCount(index: number): Promise<number> {
    const item = this.skuNameAndTagCount.nth(index);
    await expect(item).toBeAttached();
    const text = (await item.textContent()) || '';
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async verifyHighlightedTagsCountMatch(index: number): Promise<void> {
    const tagCount = await this.getTagCount(index);
    await expect(this.highlightedTags).toHaveCount(tagCount);
  }

  async clickRemoveSkuFilter(): Promise<void> {
    await this.removeSkuFilterIcons.nth(0).click({ force: true });
  }
}
