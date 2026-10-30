import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../utils/custom-world';
import { VisitsPage, VisitsStoresHelper, VisitsExportsHelper } from '../pages/visits.page';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { OKTAPage } from '../pages/okta.page';
import { config } from '../config/env.config';
import testData from '../fixtures/visitsPageTestData.json';
import {
  visitsPageLabels,
  visitsPageColumnNames,
  visitsExportAllowedStatuses,
  visitsExportsOptions,
  visitsExportsConstants,
  visitsExportsPageColumnNames,
} from '../support/visitsConstants';

// NOTE: Steps for 'I clear the values in From/To field', 'I see the red border around the from/to field',
// 'I set the date range', 'I expand the visit status drop down' (userPermission.steps.ts),
// 'I navigate to Explorer Visits page' and 'I navigate to the Explorer Exports page' are already defined
// in image.steps.ts / common.steps.ts and are reused by features/visitsPage.feature.


Given('I login to Trax successfully through Okta', { timeout: 70000 }, async function (this: CustomWorld) {
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

When('I select {string}', async function (this: CustomWorld, menuOption: string) {
  await new VisitsPage(this.page!).selectMenuOption(menuOption);
});

Then('I see the page title as {string}', async function (this: CustomWorld, pageTitle: string) {
  await new VisitsPage(this.page!).validatePageTitle(pageTitle);
});

Then('I see Date Range label', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyDateRangeLabel(visitsPageLabels.fromDateField);
});

Then('I see Visit ID label', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyVisitIdLabel();
});

Then('I see Visits label', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyVisitsPageLabel();
});

When('I select state column from column selector', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).selectColumnNameByName(visitsPageColumnNames.state);
});

Then('I see the state column on the visits grid', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyColumnIsVisibleInTheGrid(visitsPageColumnNames.state);
});

When('I select Number of Surveys column from column selector', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.setToDateAndFromDate(testData.fromDate, testData.toDate);
  await visitsPage.selectColumnNameByName(visitsPageColumnNames.numberOfSurveys);
});

Then('I find the Number of Surveys column value', async function (this: CustomWorld) {
  this.surveyCount = await new VisitsPage(this.page!).findColumnValueInFirstRow(visitsPageColumnNames.numberOfSurveys);
});

When('I select the Review Status column from the column selector', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.setToDateAndFromDate(testData.fromDate, testData.toDate);
  await visitsPage.selectColumnNameByName(visitsPageColumnNames.status);
});

Then('I can see the Review Status column in the Visits grid', async function (this: CustomWorld) {
  this.surveyCount = await new VisitsPage(this.page!).findColumnValueInFirstRow(visitsPageColumnNames.status);
});

When('I click the filter panel', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.setToDateAndFromDate(testData.fromDate, testData.toDate);
  await visitsPage.clickOnTheFilterPanel();
});

When('I type {string} as the Visit status', async function (this: CustomWorld, status: string) {
  await new VisitsPage(this.page!).selectStatus(status);
});

When('I click on the Apply Button', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickApplyButton();
});

Then('I can see all the data in the grid belongs to the {string} status', async function (this: CustomWorld, expectedStatus: string) {
  await new VisitsPage(this.page!).verifyColumn('status', expectedStatus);
});

When('I click on the filter panel', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickOnTheFilterPanel();
});

When('I expand the Filter By drop down', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).filterByGivenValue('Review Status');
});

When('I select {string} as Review Status', async function (this: CustomWorld, reviewStatus: string) {
  await new VisitsPage(this.page!).selectReviewStatus(reviewStatus);
});

Then('I can see the data in the grid belongs to the {string} status', async function (this: CustomWorld, expectedStatus: string) {
  await new VisitsPage(this.page!).verifyColumn('qualityReviewStatus', expectedStatus);
});

When('I select date range from date picker', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).setToDateAndFromDate(testData.sortFromDate, testData.sortToDate);
});

When('I click on the arrow to sort the date to ascending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickOnDateColumnForAscending();
});

Then('I can see the dates displayed in ascending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyDatesSorted(true);
});

When('I click on the arrow to sort the date to descending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickOnDateColumnDescending();
});

Then('I can see the dates displayed in descending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyDatesSorted(false);
});

When('I expand the Store Status drop down', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).filterByGivenValue('Store Status');
});

When('I type {string} as the Store Status', async function (this: CustomWorld, storeStatus: string) {
  await new VisitsPage(this.page!).selectStoreStatus(storeStatus);
});

When('I select {string} from the drop down and select {string} as User', async function (this: CustomWorld, user: string, userName: string) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.filterByGivenValue(user);
  await visitsPage.setUser(userName);
});

Then('I can see all the data in the visit grid for store status is {string}', async function (this: CustomWorld, expectedStatus: string) {
  await new VisitsPage(this.page!).verifyColumn('storeStatus', expectedStatus);
});

Then('I see the {string} user is displayed in the visit grid', async function (this: CustomWorld, expectedUser: string) {
  await new VisitsPage(this.page!).verifyColumn('salesRepName', expectedUser);
});

Then('I go to the scenes page', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickOnTab(testData.scenesTabIndex);
});

Then('I go to the visits page', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickOnTab(testData.visitTabIndex);
});

Then('I can see all the data in the grid belongs to the {string} and {string} status', async function (this: CustomWorld, expectedStatus: string, expectedStoreStatus: string) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.verifyColumn('status', expectedStatus);
  await visitsPage.verifyColumn('storeStatus', expectedStoreStatus);
});

When('I change the date range', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).setToDateAndFromDate(testData.sortFromDate, testData.sortToDate);
});

// ---------- Stores / Entities Management ----------

Given('I navigate to stores page', { timeout: 70000 }, async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).navigateToStores(config.storesUrl);
});

When('I click on the Entities Management Tab', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).clickEntitiesManagementTab();
});

When('I search for additional attribute in the textbox', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).searchFor(testData.FormerAdditionalAttribute1);
});

When('I rename the additional attribute in to testvalue', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).renameSelectedAttribute(testData.RenameAdditionalAttribute1);
});

Then('I verify the testvalue name in the Entities Management page', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).verifyAttributeName(testData.RenameAdditionalAttribute1);
});

When('I type testvalue in the textbox in the select grid columns', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.setToDateAndFromDate(testData.sortFromDate, testData.sortToDate);
  await visitsPage.selectGridColumNameToShow(testData.RenameAdditionalAttribute1);
});

When('I verify the testvalue in the visit Grid', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyAttributeOneColumnName(testData.RenameAdditionalAttribute1);
});

When('I search for testvalue in the textbox', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).searchFor(testData.RenameAdditionalAttribute1);
});

When('I rename the testvalue in to additional attribute', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).renameSelectedAttribute(testData.FormerAdditionalAttribute1);
});

Then('I can see the additional attribute as a header on the page', async function (this: CustomWorld) {
  await new VisitsStoresHelper(this.page!).verifyAttributeName(testData.FormerAdditionalAttribute1);
});

// ---------- Date picker ----------

When('I select the date range from the date picker', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).setToDateAndFromDate(testData.fromDate, testData.toDate);
});

When('I select {string} option from the date picker', async function (this: CustomWorld, dateOption: string) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.clickFromDatePicker();
  await visitsPage.selectDateOptionFromDatePicker(dateOption);
});

Then('I can see the From and To fields and calendar highlights have the {string} date range', async function (this: CustomWorld, dateRange: string) {
  const visitsPage = new VisitsPage(this.page!);
  this.fromDateValue = await visitsPage.getFromDateValue();
  this.toDateValue = await visitsPage.getToDateValue();
  visitsPage.verifyDateRange(dateRange, this.fromDateValue, this.toDateValue);
  await visitsPage.clickFromDatePicker();
  await visitsPage.verifyHighlightedDateRange(this.fromDateValue, this.toDateValue);
  await visitsPage.clickFromDatePicker();
});

// ---------- Search ----------

Then('I enter the Primary ID and press Enter', { timeout: 130000 }, async function (this: CustomWorld) {
  await new VisitsPage(this.page!).searchVisits(testData.searchVisitId);
});

Then('I can see the entered Visit ID on the Visit Viewer page', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyVisitIdOnVisitViewer(testData.searchVisitId);
});

Then('I click the back icon to return to the Visit page', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickBackButton();
});

Then('I enter the Session UID and press Enter', { timeout: 130000 }, async function (this: CustomWorld) {
  await new VisitsPage(this.page!).searchVisits(testData.sessionUid);
});

Then('I can see the Session UID in the URL', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifySessionUidInUrl(testData.sessionUid);
});

// ---------- Flagged ----------

Then('I click on the flagged Icon of a visit', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickFlagIcon();
});

Then('I get the Visit Id of the flagged visit', async function (this: CustomWorld) {
  this.flaggedVisitId = await new VisitsPage(this.page!).getVisitIdOfFlaggedVisit();
});

Then('I open the Filter Panel', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).openFilterPanel();
});

Then('I select the Flagged option', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.clickFlaggedFilterOption();
  await visitsPage.selectFlaggedCheckBox();
  await visitsPage.clickApplyButton();
});

Then('I can see the flagged icon is highlighted in the grid, the corresponding visit viewer page and the filtered visit ID matches the flagged visit ID', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.verifyHighlightedFlagIcon();
  await visitsPage.verifyFilteredVisitIdMatchesFlaggedId(this.flaggedVisitId);
  await visitsPage.clickFlaggedVisitId();
  await visitsPage.verifyHighlightedFlagIconInVisitViewer();
  await visitsPage.clickBackButton();
  await visitsPage.clickFlagIcon();
});

// ---------- Number of Scenes sorting ----------

When('I select date range', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).setToDateAndFromDate(testData.sortFromDateNumberOfScenes, testData.sortFromDateNumberOfScenes);
});

When('I click on the arrow to sort the Number of Scenes to ascending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickNumberOfScenesColumnForAscending();
});

Then('I can see the Number of Scenes displayed in ascending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyNumberOfScenesSorted(true);
});

When('I click on the arrow to sort the Number of Scenes to descending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickNumberOfScenesColumnForDescending();
});

Then('I can see the Number of Scenes displayed in descending order', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).verifyNumberOfScenesSorted(false);
});

// ---------- Exports ----------

When('I get the completed visits count', async function (this: CustomWorld) {
  this.gridItemCount = await new VisitsPage(this.page!).extractVisitsGridCount();
});

When('I click on the Export button', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickExportButton();
});

When('I select Stitched Images Export option', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.clickExportOption(visitsExportsOptions.stitchedImageExportOption);
  await visitsPage.verifyExportConfirmationDialogBoxHeader();
  await visitsPage.verifyImageExportOkButton();
  await visitsPage.clickImageExportOkButton();
});

Then('I can see that the completed visits count matches the exported processed item count', async function (this: CustomWorld) {
  await new VisitsExportsHelper(this.page!).verifyProcessedItemGridCount(visitsExportsPageColumnNames.processedItems, this.gridItemCount);
});

When('I set date range from the date picker', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.setToDateAndFromDate(testData.fromDateForExportOriginalImage, testData.toDateForExportOriginalImage);
  this.gridItemCount = await visitsPage.extractVisitsGridCount();
});

When('I select Original Images Export option', async function (this: CustomWorld) {
  const visitsPage = new VisitsPage(this.page!);
  await visitsPage.clickExportOption(visitsExportsOptions.originalImageExportOption);
  await visitsPage.verifyExportConfirmationDialogBoxHeader();
  await visitsPage.verifyImageExportOkButton();
  this.taskId = await visitsPage.extractTaskIdFromExportConfirmationDialog();
  await visitsPage.clickImageExportOkButton();
});

When('I click on the Your Files tab', async function (this: CustomWorld) {
  await new VisitsExportsHelper(this.page!).clickOnYourFilesLink(visitsExportsPageColumnNames.yourDownloads);
});

When('I click on the zip file', async function (this: CustomWorld) {
  const exportsHelper = new VisitsExportsHelper(this.page!);
  const { filePath, suggestedFilename } = await exportsHelper.clickOnZipFileLinkAndDownload();
  this.downloadedZipPath = filePath;
  this.downloadedZipName = suggestedFilename;
  await exportsHelper.clickOnCloseMarkFilesDialogBox();
});

When('I open the downloaded zip file and get the count of the images in the zip file', async function (this: CustomWorld) {
  const exportsHelper = new VisitsExportsHelper(this.page!);
  const taskId = await exportsHelper.getTaskIdFromGrid();
  expect(this.downloadedZipName).toBe(`${taskId}-1.zip`);
  this.zipEntryCount = exportsHelper.getZipEntryCount(this.downloadedZipPath);
});

Then('I can see that the original processed item count matches the count of images in the downloaded zip file and validate Resource Type, Data Type, Status columns', async function (this: CustomWorld) {
  const exportsHelper = new VisitsExportsHelper(this.page!);
  const processedItems = await exportsHelper.getFirstCellCount(visitsExportsPageColumnNames.processedItems);
  expect(Number(this.zipEntryCount)).toBe(processedItems);

  await exportsHelper.verifyFirstRowValues({
    [visitsExportsPageColumnNames.resourceType]: visitsExportsConstants.resourceTypeForVisits,
    [visitsExportsPageColumnNames.type]: visitsExportsOptions.originalImageExportOption,
  });
  await exportsHelper.verifyStatus([
    visitsExportAllowedStatuses.statusForExportedScenesOne,
    visitsExportAllowedStatuses.statusForExportedScenesTwo,
  ]);
  await exportsHelper.verifyYourFiles(visitsExportsPageColumnNames.uploadedFileUrls, 'Your Files()');
  await exportsHelper.verifyProcessedItemGridCount(visitsExportsPageColumnNames.processedItems, this.gridItemCount);
  await exportsHelper.verifyTaskIdInGrid(this.taskId);
});

// ---------- Internal Date Filtering ----------

When('I set the date range using the date picker', async function (this: CustomWorld) {
  await new VisitsPage(this.page!).setToDateAndFromDate(testData.dateForInternalDateFiltering, testData.dateForInternalDateFiltering);
});

When('I get the grid data count', async function (this: CustomWorld) {
  this.gridItemCount = await new VisitsPage(this.page!).extractVisitsGridCount();
});

When('I get the primary IDs from the grid when Internal Date Filtering is disabled', async function (this: CustomWorld) {
  this.disableFilteringIds = await new VisitsPage(this.page!).getPrimaryIdsForArray();
});

When('I enable the Internal Date Filtering toggle button', { timeout: 130000 }, async function (this: CustomWorld) {
  await new VisitsPage(this.page!).clickInternalDateFilteringToggleAndWaitForGridToLoad();
});

When('I get the primary IDs from the grid when Internal Date Filtering is enabled', async function (this: CustomWorld) {
  this.enableFilteringIds = await new VisitsPage(this.page!).getPrimaryIdsForArray();
});

Then('I can verify that exactly one primary ID is different and that it matches the expected visit ID', async function (this: CustomWorld) {
  const withoutSet = new Set<string>(this.disableFilteringIds);
  const withSet = new Set<string>(this.enableFilteringIds);

  const differentPrimaryIds = [
    ...[...withoutSet].filter((id) => !withSet.has(id)),
    ...[...withSet].filter((id) => !withoutSet.has(id)),
  ];

  expect(differentPrimaryIds, 'Primary IDs difference between both states').toHaveLength(1);
  expect(differentPrimaryIds[0]).toBe(testData.visitIdForInternalDateFiltering);
});
