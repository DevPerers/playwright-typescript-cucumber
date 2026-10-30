import { When, Then } from '@cucumber/cucumber';
import { SceneViewerPage } from '../pages/sceneViewer.page';
import { CustomWorld } from '../utils/custom-world';
import testData from '../fixtures/scenesPageTestData.json';
import testDataSceneViewer from '../fixtures/sceneViewerTestData.json';
import { scenesPageColumnNames, productPaletteLabels } from '../support/sceneViewerConstants';

When('I go to the Scene viewer page', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.goToSceneViewerPageByID(testData.commentSceneId);
});

When('I add comment as {string}', async function (this: CustomWorld, commentUserInput: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.openCommentPopupWindow();
  const commentToPost = `${commentUserInput}${Date.now()}`;
  this.postedComment = commentToPost; // Store in Cucumber World instead of Cypress alias
  await sceneViewerPage.addComment(commentToPost);
  await sceneViewerPage.clickPostButton();
});

Then('I see the entered comment', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyAddedComment(this.postedComment!);
  await sceneViewerPage.closeCommentPopUp();
});

When('I navigate to the Scene Viewer page', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.goToSceneViewerPageByID(testData.sceneIdForStoreLink);
});

When('I get the store name', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  this.storeName = await sceneViewerPage.getSceneViewerStoreName();
});

When('I get the Scene Viewer store link tooltip', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  this.sceneTooltipText = await sceneViewerPage.getSceneViewerStoreLinkTooltipText();
});

When('I click on the store link', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickSceneViewerStoreLink();
});

When('I see the {string} title', async function (this: CustomWorld, pageTitle: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.checkPageTitleContains(pageTitle);
});

When('I verify the store name', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyStoreNameOnStoresPage(this.storeName);
});

Then('I verify the store link tooltip includes street, city, state and country', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  const store = testDataSceneViewer.store;
  await sceneViewerPage.verifyStoreLinkTooltip('street_Scene', store.street_Scene);
  await sceneViewerPage.verifyStoreLinkTooltip('city_Scene', store.city_Scene);
  await sceneViewerPage.verifyStoreLinkTooltip('state', store.state);
  await sceneViewerPage.verifyStoreLinkTooltip('Country', store.Country);
});

When('I check {string} checkbox if it is unchecked & save the changes', async function (this: CustomWorld, checkboxName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.setSceneProductsCheckboxes(checkboxName, true);
});

Then('I verify {string} checkbox is checked', async function (this: CustomWorld, checkboxName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifySceneProductsCheckboxIsChecked(checkboxName);
});

When('I navigate to Explorer Scenes Viewer page', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.goToSceneViewerPageByID(testData.sceneIdForProductGrid);
});

Then('I verify the {string} filter is visible when the checkbox is checked', async function (this: CustomWorld, filterName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyProductToggleIsVisible(filterName);
});

When('I uncheck {string} checkbox if it is checked & save the changes', async function (this: CustomWorld, checkboxName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.setSceneProductsCheckboxes(checkboxName, false);
});

Then('I verify {string} checkbox is unchecked', async function (this: CustomWorld, checkboxName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifySceneProductsCheckboxIsUnchecked(checkboxName);
});

Then('I verify the {string} filters are not visible when all the checkboxes are unchecked', async function (this: CustomWorld, filterName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyProductToggleIsNotExist(filterName);
});

Then('I verify the {string} filters are visible when all the checkboxes are unchecked', async function (this: CustomWorld, filterName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyProductToggleIsVisible(filterName);
});

When('I navigate to the Scene Viewer page to see the product table', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.goToSceneViewerPageByID(testData.sceneIdForProductTable);
});

When('I click on the Show button on the top right corner on the product table', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.openTheProductGrid();
});

When('I click on the select Grid Columns', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickGridColumnsSelector();
});

Then('I verify that all the columns are selected to the product table by default', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyAllColumnsAreSelected();
});

When('I deselect {string} Column from the grid', async function (this: CustomWorld, columnName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.deselectColumnByName(columnName);
});

Then('I cannot see the {string} column in the product grid', async function (this: CustomWorld, columnName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyColumnDeselected(columnName);
});

When('I add Number-of-Survey column to the scene grid', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.setToDateAndFromDate(testData.surveyFromDate, testData.surveyToDate);
  await sceneViewerPage.selectColumnByName(scenesPageColumnNames.numberOfSurveys);
});

When('I get the value that include in the Number-of-Survey column for the specific scene', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  this.surveyCount = await sceneViewerPage.findNumberOfSurveyColumnValue(scenesPageColumnNames.numberOfSurveys);
});

When('I click on the scene Id', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickSceneId();
});

Then('I verify the survey questions count', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.openSurveyGrid();
  await sceneViewerPage.verifySurveyQuestionCount(this.surveyCount);
  await sceneViewerPage.verifySurveyGridTitleCount(this.surveyCount);
});

When('I apply a date range to filter the data to capture scene details', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.setToDateAndFromDate(testData.fromDateToVisitDetailTest, testData.toDateToVisitDetailTest);
});

When('I capture scene details for a specific scene', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  this.sceneId = await sceneViewerPage.getSceneIdFromScenesGrid();
  this.sceneDate = await sceneViewerPage.getSceneDateFromScenesGrid();
  this.storeName = await sceneViewerPage.getStoreNameFromScenesGrid();
  this.userName = await sceneViewerPage.getUserNameFromScenesGrid();
  this.sceneType = await sceneViewerPage.getSceneTypeFromScenesGrid();
  this.status = await sceneViewerPage.getStatusFromScenesGrid();
});

When('I navigate to Scene Viewer page', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickSceneId();
});

Then('I verify the scene details for a specific scene', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifySceneId(this.sceneId);
  await sceneViewerPage.verifySceneDate(this.sceneDate);
  await sceneViewerPage.verifyStoreName(this.storeName);
  await sceneViewerPage.verifyUser(this.userName);
  await sceneViewerPage.verifyTaskName(this.sceneType);
  await sceneViewerPage.verifyStatus(this.status);
});

When('I select the By {string} checkbox under the allow filtering scene products by section', async function (this: CustomWorld, checkBoxName: string) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.setByBrandCheckBox(checkBoxName);
});

When('I save the changes', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickOnSaveButton();
  await sceneViewerPage.clickOnPopupBtn();
});

When('I search by scene ID', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.searchSceneId(testData.sceneIdForProductTable);
});

When('I click on the one of the brand name and expand it', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickGeneralSection();
  this.productDetailsArray = await sceneViewerPage.captureProductDetailsToArray();
});

Then('I can see the products are displayed in ascending order', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  sceneViewerPage.verifyProductDetailsAscendingOrder(this.productDetailsArray);
});

When('I can see the toggle product view Icon', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyProductPaletteIcon();
});

When('I can see the product palette expanded', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyProductPalette(productPaletteLabels.product, true);
});

When('I click on the toggle product view icon', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickProductPalette();
});

Then('I can see the product palette is collapsed', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyProductPalette(productPaletteLabels.product, false);
});

When('I enter a scene ID in the search box', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.searchSceneId(testData.sceneIdForSkuHighlighting);
});

When('I enter a product name in the SKU search box and press enter', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.searchBySku(testDataSceneViewer.productNameOneForSkuHighlighting);
});

When('I copy the highlighted SKU URL', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickHighlightedSkuUrlButton();
});

Then('I can see the clipboard update to copied, the filter section include the product names, and the product count match the highlighted tags', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyCopiedClipboardText();
  await sceneViewerPage.verifyHighlightedTagsProductName(testDataSceneViewer.productNameOneForSkuHighlighting);
  await sceneViewerPage.expandBrandOption(testDataSceneViewer.brandIndexForActoner);
  await sceneViewerPage.verifyHighlightedTagsCountMatch(testDataSceneViewer.skuIndexForActoner);
});

When('I search for a scene that does not contain any survey questions', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.searchSceneId(testData.sceneIdForWithoutSurveyQuestion);
});

Then('I can see the message as No survey for this scene', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.verifyNoSurveyMessage();
});

Then('I select multiple product names from the product list', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.searchBySku([
    testDataSceneViewer.productNameOneForSkuHighlighting,
    testDataSceneViewer.productNameTwoForSkuHighlighting,
  ]);
});

Then('I remove one of the selected product names by clicking on the x icon from the SKU Filters for Tag Highlighting', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.clickRemoveSkuFilter();
});

Then('I can see that the highlighted tags count match the selected product count', async function (this: CustomWorld) {
  const sceneViewerPage = new SceneViewerPage(this.page!);
  await sceneViewerPage.expandBrandOption(testDataSceneViewer.brandIndexForColgate);
  await sceneViewerPage.verifyHighlightedTagsCountMatch(testDataSceneViewer.skuIndexForColgate);
});
