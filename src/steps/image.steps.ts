import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { ImagePage } from '../pages/image.page';
import testData from '../fixtures/imagePageTestData.json';
import imagePageLabels from '../fixtures/explorerConstants.json';
import { time } from 'console';

Then('I see Search field, FromDate field, ToDate field labels', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifySearchFieldText(imagePageLabels.searchField);
  await imagePage.verifyFromDateFieldText(imagePageLabels.fromDateField);
  await imagePage.verifyToDateFieldText(imagePageLabels.toDateField);
});

Then('I see Image label', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyImageLabel(imagePageLabels.images);
});

Then('I see the column with Image title', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyImageIdColumn(imagePageLabels.image);
});

When('I clear the values in From field', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.clearFromField();
});

Then('I see the red border around the from field', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyRedBorder('from');
});

When('I clear the values in To field', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.clearToField();
});

Then('I see the red border around the to field', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyRedBorder('to');
});

When('I type an image id in the imageId Text Box', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.navigateToImageViewerPage(testData.imageId);
});

Then('I see that the correct image viewer page has been loaded', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyImageId(testData.imageId);
});

When('I set a date range from the date picker', async function (this: CustomWorld) {
const imagePage = new ImagePage(this.page!);
  await imagePage.setToDateAndFromDate(testData.fromDate, testData.toDate,);
  // Pause for 2 seconds before moving to the next step
  await this.page!.waitForTimeout(2000);
});

When('I click filter panel', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.clickFilterPanel();
  // Pause for 2 seconds before moving to the next step
  await this.page!.waitForTimeout(2000);
});

When('I expand the image status drop down', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.filterByGivenFilterOption('Status');
  // Pause for 2 seconds before moving to the next step
  await this.page!.waitForTimeout(2000);
});

When('I type {string} as the image status', async function (this: CustomWorld, status: string) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.selectStatusFromDropdown(status);
  // Pause for 2 seconds before moving to the next step
  await this.page!.waitForTimeout(2000);
});

When('I click Apply Button', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.clickApplyButton();
  await imagePage.clickFilterPanel();
  // Pause for 2 seconds before moving to the next step
  await this.page!.waitForTimeout(2000);
});

Then('I can see that the grid shows that the data is in the {string} status', async function (this: CustomWorld, expectedStatus: string) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyColumnValues('status', expectedStatus);
});

When('I select the Apply All checkbox', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.clickApplyAllCheckBox();
});

Then('I can see that the grid shows that the data is in the All status', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.verifyColumnValues('status', ['New', 'Processed', 'Validated', 'Deleted']);
});
