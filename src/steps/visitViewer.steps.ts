import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../utils/custom-world';
import { VisitViewerPage } from '../pages/visitViewer.page';
import { HomePage } from '../pages/home.page';
import { config } from '../config/env.config';
import testData from '../fixtures/visitViewerPageTestData.json';
import { visitViewerPageMessages, dataCollectionUrl } from '../support/visitViewerConstants';

When('I go to the visit viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.navigateToVisitViewerPageByID(testData.commentVisitID);
});

When('I enter comment as {string}', async function (this: CustomWorld, commentUserInput: string) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.openCommentPopupWindow();
  this.visitComment = commentUserInput + Date.now();
  await visitViewerPage.addComment(this.visitComment);
  await visitViewerPage.clickPostButton();
});

Then('I can see the entered comment', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyAddedComment(this.visitComment);
});

When('I navigate to the Visit Viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.navigateToVisitViewerPageByID(testData.storeNameVisitId);
});

When('I get the name of the store', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.storeName = await visitViewerPage.getStoreName();
});

When('I get the visit viewer store link tooltip', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.visitTooltipText = await visitViewerPage.getVisitViewerStoreLinkTooltipText();
});

When('I click the store link', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.clickStoreLink();
});

When('I can see the {string} title', async function (this: CustomWorld, pageTitle: string) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.checkPageTitle(pageTitle);
});

When('I verify the name of the store', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyStoreNameOnStorePage(this.storeName);
});

Then('I verify the store link tooltip includes street, city, state, country and store number', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyStoreLinkTooltip('Street', testData.store.street);
  await visitViewerPage.verifyStoreLinkTooltip('City', testData.store.city);
  await visitViewerPage.verifyStoreLinkTooltip('State', testData.store.state);
  await visitViewerPage.verifyStoreLinkTooltip('Store Number', testData.store.storeNumber);
  await visitViewerPage.verifyStoreLinkTooltip('Country', testData.store.country);
});

When('I open the visit viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.navigateToVisitViewerPageByID(testData.storeLinkVisitId);
});

When('I click on one of last visit under the map', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.linkDate = await visitViewerPage.clickOnVisitDate(testData.numberOfVisitInList);
});

Then('I verify the visit was changed to reflect the selected Last Visit', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  const visitDate = await visitViewerPage.extractVisitDateFromTooltip();
  expect(this.linkDate).toBe(visitDate);
});

When('I go to the Reporting Configuration Explorer page', { timeout: 70000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.navigateToPage(config.reportingConfigUrl);
});

When('I enable the Display Task feedback on Session detail page checkbox and save the configuration', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setDisplayTaskFeedbackCheckbox(true);
});

When('I disable the Display Task feedback on Session detail page checkbox and save the configuration', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setDisplayTaskFeedbackCheckbox(false);
});

When('I navigate to the Visit Viewer page to check the task feedback grid', { timeout: 70000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  const visitViewerPage = new VisitViewerPage(this.page!);
  await homePage.navigateToPage(config.visitsUrl);
  await visitViewerPage.navigateToVisitViewerPageByID(testData.displayTaskVisitId);
});

Then('I verify the task feedback grid is available in the visit viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.scrollToBottomOfThePage();
  await visitViewerPage.verifyTaskFeedbackGridIsPresent();
});

Then('I verify the task feedback grid is not available in the Visit Viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.scrollToBottomOfThePage();
  await visitViewerPage.verifyTaskFeedbackGridIsAbsent();
});

When('I enable the option to display the Scene Type Name on the Scene card and Session details page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setSceneTypeDisplayCheckBox(true);
});

When('I disable the option to display the Scene Type Name on the Scene card and Session details page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setSceneTypeDisplayCheckBox(false);
});

When('I go to the Data Collection page', { timeout: 70000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  const visitViewerPage = new VisitViewerPage(this.page!);
  await homePage.navigateToPage(dataCollectionUrl);
  await visitViewerPage.verifyDataCollectionPageLoaded();
});

When('I click on the Task Management Tab', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.clickTaskManagementTab();
});

When('I click on the Capture Task Page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.navigateToCaptureTaskPage();
  await visitViewerPage.verifyDataCollectionPageLoaded();
});

When('I get the Display Name of {string} task', async function (this: CustomWorld, captureTask: string) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.selectCaptureTask(captureTask);
  this.displayNameInTheTask = await visitViewerPage.getDisplayName();
});

When('I get the Task Name of {string} task', async function (this: CustomWorld, captureTask: string) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.selectCaptureTask(captureTask);
  this.taskNameInTheTask = await visitViewerPage.getTaskName();
});

When('I navigate to Explorer visits viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.navigateToVisitViewerPageByID(testData.sceneTypeDisplayNameVisitId);
  await visitViewerPage.scrollToSceneCardTitle();
});

When('I verify that the Scene Type Display Name on the Scene card is equal to the Display Name of the selected Task on the Data Collection page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifySceneCardValue(this.displayNameInTheTask, 1);
});

When('I verify that the Task Name on the Scene card is equal to the Task Name of the selected Task on the Data Collection page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifySceneCardValue(this.taskNameInTheTask, 0);
});

When('I navigate to the scene page', { timeout: 70000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.navigateToPage(config.sceneUrl);
});

When('I navigate to the scene viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.goToSceneViewerPageByID(testData.sceneTypeDisplayNameSceneId);
});

Then('I verify the Scene Type Display Name in the scene details section is equal to the Display Name of the selected Task on the Data Collection page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifySceneViewerSceneTypeName(this.displayNameInTheTask);
});

Then('I verify the Scene Type Name in the scene details section is equal to the Task Name of the selected Task on the Data Collection page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifySceneViewerSceneTypeName(this.taskNameInTheTask);
});

When('I select a date from the date picker', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setToDateAndFromDate(testData.fromDateVerifySceneCount, testData.toDateVerifySceneCount);
});

When('I select a visit and get the scene count column value from the Visits grid', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.sceneCount = await visitViewerPage.getVisitsGridCellText(1, 17);
});

When('I click on the visit ID', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.clickVisitsGridCell(1, 2);
});

When('I retrieve the scene count on the Visit Viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.elementCount = await visitViewerPage.getSceneCardCount();
});

Then('I verify that the scene count on the Visits grid matches the scene count on the Visit Viewer page', async function (this: CustomWorld) {
  expect(Number(this.sceneCount)).toBe(Number(this.elementCount));
});

When('I apply date range to filter the data', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setToDateAndFromDate(testData.visitDetailsFromDate, testData.visitDetailsToDate);
});

When('I capture visit details for a specific visit', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.visitDate = await visitViewerPage.getVisitsGridCellText(1, 4);
  this.region = await visitViewerPage.getVisitsGridCellText(1, 5);
  this.storeName = await visitViewerPage.getVisitsGridCellText(1, 9);
  this.userName = await visitViewerPage.getVisitsGridCellText(1, 14);
  this.status = await visitViewerPage.getVisitsGridCellText(1, 23);
});

When('I navigate to visit Viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.clickVisitsGridCell(1, 2);
});

Then('I verify the visit details for a specific visit', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyHeaderVisitDate(this.visitDate);
  await visitViewerPage.verifyHeaderRegion(this.region);
  await visitViewerPage.verifyHeaderStoreName(this.storeName);
  await visitViewerPage.verifyHeaderUser(this.userName);
  await visitViewerPage.verifyHeaderStatus(this.status);
});

When('I search for a visit that does not contain any survey questions', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.searchVisits(testData.visitIdForWithoutSurveyQuestion);
});

Then('I can see the message as No survey for this visit', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyNoSurveyMessage(visitViewerPageMessages.noSurveyMessage);
});

When('I disable the Hide price for Other products from Products table checkbox and save the configuration', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setHidePriceCheckbox(false);
});

When('I enable the Hide price for Other products from Products table checkbox and save the configuration', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.setHidePriceCheckbox(true);
});

When('I enter visit ID in the search box and open the visit viewer page', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.searchVisits(testData.VisitIdForHidePrice);
});

When('I click on the show button on product table', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.openProductGrid();
});

When('I get price for Colgate Toothbrush Other in product grid', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  this.productPrice = await visitViewerPage.getTheCellValue(testData.rowIdForProductGrid, testData.columnNameForProductGrid);
});

Then('I verify that price value is present in the product grid', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyPriceIsVisible(testData.rowIdForProductGrid, testData.columnNameForProductGrid);
});

Then('I verify that price value is absence in the product grid', async function (this: CustomWorld) {
  const visitViewerPage = new VisitViewerPage(this.page!);
  await visitViewerPage.verifyPriceIsHidden(testData.rowIdForProductGrid, testData.columnNameForProductGrid);
});
