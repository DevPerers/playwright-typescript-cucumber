import { Page, Locator, Download, expect } from '@playwright/test';
import * as fs from 'fs';
import { userManagementRolePermissionOptions, viewerPageExportPlanogramOptions } from '../support/userManagementConstants';

export class UserManagementPage {
  private readonly page: Page;
  private readonly searchTextBox: Locator;
  private readonly role: Locator;
  private readonly dropDownIconInPermission: Locator;
  private readonly crossIconInAllowedActions: Locator;
  private readonly saveButton: Locator;
  private readonly crossMarkOfRoles: Locator;
  private readonly searchBoxInUserRoles: Locator;
  private readonly activePointer: Locator;
  private readonly saveRolesButton: Locator;
  private readonly pageBody: Locator;
  private readonly activeUserRoleName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTextBox = page.locator('.xsuite-list-search-input');
    this.role = page.locator('.xsuite-list-pinned-selection > .roles-list-item > .sp-flex-column');
    this.dropDownIconInPermission = page.locator('div.xsuite-dropdown-selections-button span');
    this.crossIconInAllowedActions = page.locator('.trax-icons.trax-icons-close.pointer');
    this.saveButton = page.locator('.save-button > xsuite-button');
    this.crossMarkOfRoles = page.locator('#close-small');
    this.searchBoxInUserRoles = page.locator('span > div > input[type=text]');
    this.activePointer = page.locator('.item.pointer.active');
    this.saveRolesButton = page.locator('span.save-roles-container > xsuite-button > div > div');
    this.pageBody = page.locator('body');
    this.activeUserRoleName = page.locator('.item.pointer.active trax-checkbox .name');
  }

  getTab(tabName: string): Locator {
    return this.page.locator('div.tab-name').filter({ hasText: tabName }).first();
  }

  async clickTab(tabName: string): Promise<void> {
    await this.getTab(tabName).click();
  }

  async typeInSearchBox(value: string): Promise<void> {
    await this.searchTextBox.click();
    await this.searchTextBox.pressSequentially(value);
    await this.searchTextBox.press('Enter');
  }

  async clickRole(): Promise<void> {
    await this.role.first().click();
  }

  getExplorerRole(index: number): Locator {
    return this.page.locator(`div:nth-child(${index}) xsuite-table-on-top-cell`).first();
  }

  async verifyExplorerRole(index: number): Promise<void> {
    await expect(this.getExplorerRole(index)).toBeVisible();
  }

  async setRolePermission(index: number): Promise<void> {
    await this.getExplorerRole(index).hover();
    await this.verifyExplorerRole(index);
    await this.getExplorerRole(index).click();
    await this.dropDownIconInPermission.first().click();
  }

  async clickPic2PogViewPermission(): Promise<void> {
    await this.clickDropDownDrawerItem(userManagementRolePermissionOptions.viewPermission);
  }

  async clickConsensusPlanogramViewPermission(): Promise<void> {
    await this.clickDropDownDrawerItem(userManagementRolePermissionOptions.viewPermission);
  }

  async getShowRealTimeDataOption(): Promise<void> {
    await this.clickDropDownDrawerItem(userManagementRolePermissionOptions.allowedRealTimeData);
  }

  private async clickDropDownDrawerItem(name: string): Promise<void> {
    const item = this.page.locator('.xsuite-dropdown-drawer-item-name').filter({ hasText: name }).first();
    await expect(item).toBeVisible();
    await item.click();
  }

  async clickCrossIconInAllowedActions(): Promise<void> {
    await this.crossIconInAllowedActions.first().click();
  }

  async clickSaveButton(): Promise<void> {
    await this.saveButton.click();
  }

  getCellByRowNumberAndColumnNumber(rowNumber: number, columnNumber: number): Locator {
    return this.page.locator(`.ag-center-cols-container > div:nth-child(${rowNumber}) > div:nth-child(${columnNumber})`);
  }

  getAutomationRoleCellValue(): Locator {
    return this.getCellByRowNumberAndColumnNumber(2, 4);
  }

  async clickAutomationRoleCellValue(): Promise<void> {
    await this.getAutomationRoleCellValue().dblclick();
  }

  async removeAllAssignedRoles(): Promise<void> {
    const total = await this.crossMarkOfRoles.count();
    for (let i = 0; i < total; i++) {
      await this.crossMarkOfRoles.first().click({ force: true });
    }
  }

  async typeInSearchBoxInUserRoles(value: string): Promise<void> {
    await this.searchBoxInUserRoles.first().pressSequentially(value);
  }

  async clickActivePointer(): Promise<void> {
    await this.activePointer.first().click({ force: true });
  }

  async clickPageBody(): Promise<void> {
    await this.pageBody.click();
  }

  async clickSaveRolesButton(): Promise<void> {
    await this.saveRolesButton.click();
  }

  async verifyActiveUserRoleName(roleName: string): Promise<void> {
    await expect(this.activeUserRoleName).toHaveCount(1);
    await expect(this.activeUserRoleName).toBeVisible();
    await expect(this.activeUserRoleName).toHaveText(roleName);
  }
}


/**
 * Explorer-side checks used to validate the effect of role permissions
 * (Visits page filters, Visit Viewer / Scene Viewer Export Planogram).
 */
export class ExplorerPermissionPage {
  private readonly page: Page;
  private readonly fromDateInput: Locator;
  private readonly toDateInput: Locator;
  private readonly filterPanelStatusItems: Locator;
  private readonly visitStatusFilterOptions: Locator;
  private readonly visitIdSearchTextbox: Locator;
  private readonly exportPlanogramButton: Locator;
  private readonly sceneIdOnSceneCard: Locator;
  private readonly sceneCardTitle: Locator;
  private readonly sceneLevelPsaOption: Locator;
  private readonly consensusPlanogramOption: Locator;
  private readonly psaDialogHeader: Locator;
  private readonly psaDialogDownloadButton: Locator;
  private readonly psaDialogCloseIcon: Locator;
  private readonly headerUserIcon: Locator;
  private readonly logOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromDateInput = page.locator(':nth-child(3) > .trax-form-control--datepicker-icon-container > .trax-form-control');
    this.toDateInput = page.locator(':nth-child(2) > .trax-form-control--datepicker-icon-container > .trax-form-control');
    this.filterPanelStatusItems = page.locator('div.ag-filter-list-panel > div');
    this.visitStatusFilterOptions =page.locator('.ag-set-filter-item-checkbox > div > label');
    this.visitIdSearchTextbox = page.locator('.input-with-icon > .trax-form-control');
    this.exportPlanogramButton = page.locator('.download-button-label').filter({ hasText: 'EXPORT PLANOGRAM' });
    this.sceneIdOnSceneCard = page.locator('.explorer-entity-viewer-card-header > div > span > a');
    this.sceneCardTitle = page.locator('span.card-title-center-container');
    this.sceneLevelPsaOption = page.locator('.explorer-three-dot-menu-items-wrapper > button').filter({ hasText: 'SCENE LEVEL PSA' });
    this.consensusPlanogramOption = page.locator('.explorer-three-dot-menu-items-wrapper > button').filter({ hasText: viewerPageExportPlanogramOptions.consensusPlanogram });
    this.psaDialogHeader = page.locator('.modal-header').filter({ hasText: /PSA Files \(\d+\)/ });
    this.psaDialogDownloadButton = page.locator('.btn.btn-sm').filter({ hasText: 'Download' });
    this.psaDialogCloseIcon = page.locator('#close-medium');
    this.headerUserIcon = page.locator('.trax-tst-usr-icon');
    this.logOutButton = page.locator('.trax-tst-logout-link');
  }

  async logOutFromTrax(): Promise<void> {
    await this.headerUserIcon.click();
    await this.logOutButton.click();
  }

  async setToDateAndFromDate(fromDate: string, toDate: string): Promise<void> {
    await this.fromDateInput.fill(fromDate);
    await this.fromDateInput.press('Enter');
    await this.toDateInput.fill(toDate);
    await this.toDateInput.press('Enter');
  }

  async filterByGivenValue(filterOption: string): Promise<void> {
    await this.filterPanelStatusItems
      .locator('div')
      .filter({ hasText: new RegExp(`^\\s*${filterOption}\\s*$`) })
      .first()
      .click();
  }

  parseExpectedFilterOptions(optionsString: string): string[] {
    return optionsString
      .split(',')
      .map(opt => opt.trim().replace(/^"|"$/g, ''));
  }

  async verifyVisitStatusFilterOptions(expectedOptions: string[]): Promise<void> {
    await expect(this.visitStatusFilterOptions.first()).toBeVisible();
    await expect(async () => {
      const texts = (await this.visitStatusFilterOptions.allTextContents())
        .map(t => t.trim())
        .filter(t => t.length > 0);
      expect(texts).toHaveLength(expectedOptions.length);
      expect([...texts].sort()).toEqual([...expectedOptions].sort());
    }).toPass({ timeout: 30000 });
  }

  async typeVisitId(id: string | number): Promise<void> {
    await this.visitIdSearchTextbox.fill('');
    await this.visitIdSearchTextbox.fill(`${id}`);
    await this.visitIdSearchTextbox.press('Enter');
  }

  async verifyExportPlanogramButtonIsVisible(): Promise<void> {
    await expect(this.exportPlanogramButton).toBeVisible();
  }

  async verifyExportPlanogramButtonDoesNotExist(): Promise<void> {
    await expect(this.exportPlanogramButton).toHaveCount(0);
  }

  async clickExportPlanogramButton(): Promise<void> {
    await this.exportPlanogramButton.click();
  }

  async scrollToSceneCardTitle(): Promise<void> {
    await this.sceneCardTitle.first().scrollIntoViewIfNeeded();
  }

  async clickSceneIdOnSceneCard(): Promise<void> {
    await this.sceneIdOnSceneCard.first().click({ force: true });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSceneLevelPsaOption(): Promise<void> {
    await this.sceneLevelPsaOption.click();
  }

  async verifyHeaderOfPSADialogBox(): Promise<void> {
    await expect(this.psaDialogHeader).toBeVisible();
  }

  async clickDownloadButtonOfPSADialogBox(): Promise<void> {
    await this.psaDialogDownloadButton.first().click();
  }

  async clickCrossMarkOfPSADialogBox(): Promise<void> {
    await this.psaDialogCloseIcon.click();
  }

  async verifyConsensusPlanogramOptionVisibility(isVisible: boolean): Promise<void> {
    if (isVisible) {
      await expect(this.consensusPlanogramOption).toBeVisible();
    } else {
      await expect(this.consensusPlanogramOption).toHaveCount(0);
    }
  }

  async verifyPSAFileIsDownloaded(downloads: Download[]): Promise<void> {
    const psaFileNamePattern = /^scene-\d+-[^/]+-\d{4}-\d{2}-\d{2}\.psa$/;
    await expect.poll(
      () => downloads.filter(d => psaFileNamePattern.test(d.suggestedFilename())).length,
      { timeout: 60000 },
    ).toBe(1);
    const filePath = await downloads[0].path();
    expect(fs.statSync(filePath).size).toBeGreaterThan(0);
  }
}
