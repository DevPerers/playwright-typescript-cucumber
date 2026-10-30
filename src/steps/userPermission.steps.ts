import { Given, When, Then } from '@cucumber/cucumber';
import { Download } from '@playwright/test';
import { CustomWorld } from '../utils/custom-world';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { OKTAPage } from '../pages/okta.page';
import { UserManagementPage, ExplorerPermissionPage } from '../pages/userManagement.page';
import { config } from '../config/env.config';
import { explorerRoleGrid, userPermissionTestData } from '../support/userManagementConstants';

// 'I set the date range' and 'I expand the visit status drop down' are defined here (visits.steps.ts defers to this file).
Given('I login to Trax successfully through Okta without Session', { timeout: 70000 }, async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const oktaPage = new OKTAPage(this.page!);
  const homePage = new HomePage(this.page!);
  await loginPage.navigateToLoginPage(config.baseUrl);
  await loginPage.enterCredentials(config.credentials.standardUser.username, config.credentials.standardUser.password);
  await loginPage.clickLoginButton();
  await oktaPage.verifyOKTALoginPageUserNameElementIsVisible();
  await oktaPage.login(config.credentials.standardUser.username, config.credentials.standardUser.oktaPassword);
  await homePage.verifyHomePageLoaded();
});

When('I navigate to the {string} tab', async function (this: CustomWorld, tabName: string) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickTab(tabName);
});

Then('I search for the {string} role', async function (this: CustomWorld, roleName: string) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.typeInSearchBox(roleName);
});

Then('I edit the TestExplorer role to enable the Show Real-Time Data permission', async function (this: CustomWorld) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickRole();
  await userManagementPage.setRolePermission(explorerRoleGrid.indexEnableShowRealTimeData);
  await userManagementPage.getShowRealTimeDataOption();
  await userManagementPage.clickSaveButton();
});

When('I edit the automation test user and assign the {string} role', async function (this: CustomWorld, roleName: string) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickAutomationRoleCellValue();
  await userManagementPage.removeAllAssignedRoles();
  await userManagementPage.typeInSearchBoxInUserRoles(roleName);
  await userManagementPage.verifyActiveUserRoleName(roleName);
  await userManagementPage.clickActivePointer();
  await userManagementPage.clickPageBody();
  await userManagementPage.clickSaveRolesButton();
});

Then('I log out from the application', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.logOutFromTrax();
});

When('I set the date range', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.setToDateAndFromDate(userPermissionTestData.fromDateMay, userPermissionTestData.toDate);
});

When('I expand the visit status drop down', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.filterByGivenValue('Status');
});

Then('I can see {string} filter options under Visit Status', async function (this: CustomWorld, optionsString: string) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  const options = permissionPage.parseExpectedFilterOptions(optionsString);
  await permissionPage.verifyVisitStatusFilterOptions(options);
});

Then('I edit the TestExplorer role to disable the Show Real-Time Data permission', async function (this: CustomWorld) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickRole();
  await userManagementPage.setRolePermission(explorerRoleGrid.indexDisableShowRealTimeData);
  await userManagementPage.clickCrossIconInAllowedActions();
  await userManagementPage.clickSaveButton();
});

Then('I edited the Pic2Pog role to enable the pic2pog permission', async function (this: CustomWorld) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickRole();
  await userManagementPage.setRolePermission(explorerRoleGrid.indexEnablePic2Pog);
  await userManagementPage.clickPic2PogViewPermission();
  await userManagementPage.clickSaveButton();
});

Then('I can see that the Export Planogram button is available on the Visits Viewer page', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.verifyExportPlanogramButtonIsVisible();
});

When('I click on the scene ID on the scene card', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.scrollToSceneCardTitle();
  await permissionPage.clickSceneIdOnSceneCard();
});

Then('I can see that the Export Planogram button is available on the Scene Viewer page', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.verifyExportPlanogramButtonIsVisible();
});

Then('I edited the Pic2Pog role to disable the pic2pog permission', async function (this: CustomWorld) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickRole();
  await userManagementPage.setRolePermission(explorerRoleGrid.indexDisablePic2Pog);
  await userManagementPage.clickCrossIconInAllowedActions();
  await userManagementPage.clickSaveButton();
});

When('I cannot see the Export Planogram button on the Visits Viewer page', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.verifyExportPlanogramButtonDoesNotExist();
});

Then('I cannot see the Export Planogram button on the Scene Viewer page', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.verifyExportPlanogramButtonDoesNotExist();
});

When('I click on the Export Planogram button', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  // Equivalent of the Cypress 'clearDownloads' task: start a fresh list of captured downloads
  const downloads: Download[] = [];
  this.psaDownloads = downloads;
  this.page!.on('download', (download: Download) => downloads.push(download));
  await permissionPage.clickExportPlanogramButton();
});

When('I click on the Scene Level PSA option', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.clickSceneLevelPsaOption();
  await permissionPage.verifyHeaderOfPSADialogBox();
  await permissionPage.clickDownloadButtonOfPSADialogBox();
  await permissionPage.clickCrossMarkOfPSADialogBox();
});

Then('I can see the PSA file has been downloaded successfully', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.verifyPSAFileIsDownloaded(this.psaDownloads ?? []);
});

When('I enter a Visit ID in the search bar', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.typeVisitId(userPermissionTestData.visitIdForPic2Pog);
});

Then('I edited the Pic2Pog role to enable the consensus planogram permission', async function (this: CustomWorld) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickRole();
  await userManagementPage.setRolePermission(explorerRoleGrid.indexEnableConsensusPlanogram);
  await userManagementPage.clickConsensusPlanogramViewPermission();
  await userManagementPage.clickSaveButton();
});

Then('I can see that the consensus planogram option is available', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.verifyConsensusPlanogramOptionVisibility(true);
});

When('I enter a Visit ID for which the consensus planogram is available', async function (this: CustomWorld) {
  const permissionPage = new ExplorerPermissionPage(this.page!);
  await permissionPage.typeVisitId(userPermissionTestData.visitIdForConsensusPlanogram);
});

Then('I edited the Pic2Pog role to disable the consensus planogram permission', async function (this: CustomWorld) {
  const userManagementPage = new UserManagementPage(this.page!);
  await userManagementPage.clickRole();
  await userManagementPage.setRolePermission(explorerRoleGrid.indexDisableConsensusPlanogram);
  await userManagementPage.clickCrossIconInAllowedActions();
  await userManagementPage.clickSaveButton();
});
