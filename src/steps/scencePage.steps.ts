import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { ScenePage } from '../pages/scene.page';
import { exportsOptions } from 'src/support/explorerConstants';

When('I select the {string} date range from the date picker', async function (this: CustomWorld, dataKeyPrefix: string) {
    const scenePage = new ScenePage(this.page!);
    // Dynamically construct keys (e.g., 'ClearAll' -> 'fromDateClearAll', 'toDateClearAll')
    const fromDateKey = `fromDate${dataKeyPrefix}` as keyof typeof this.testData;
    const toDateKey = `toDate${dataKeyPrefix}` as keyof typeof this.testData;
    const fromDate = this.testData[fromDateKey];
    const toDate = this.testData[toDateKey];
    await scenePage.selectDateRange(fromDate, toDate);
    await this.page!.waitForTimeout(2000);
  }
);

When('I get the scene grid data count', async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);
  const count = await scenePage.extractSceneGridCount();
  this.sceneGridItemCount = count;
  console.log(`Scene grid data count at first: ${count}`);
});

// Matches both "I get the scene grid data count" and "I get the Scenes grid count"
When(/^I get the (?:scene|Scenes) grid (?:data )?count$/, async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);
  const count = await scenePage.extractSceneGridCount();
  this.sceneGridItemCount = count;
  console.log(`Scene grid data count at first: ${count}`);
});

When('I open the filter panel', async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);
  await scenePage.clickOnFilterPanel();
});

When('I select {string} filter option, select the {string} value', async function (this: CustomWorld, filterOption: string, filterValue: string) {
    const scenePage = new ScenePage(this.page!);
    await scenePage.selectFilteredByGivenOption(filterOption, filterValue);
  });

When('I close the filter panel', async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);
  await scenePage.clickOnFilterPanel();
});

When('I click on {string} button', async function (this: CustomWorld, clearAllbuttonText: string) {
  const scenePage = new ScenePage(this.page!);
  await scenePage.clickClearFilterButton(clearAllbuttonText);
});

Then('I see that the grid row count reverts to the original count before filters are applied', async function (this: CustomWorld) {
  if (this.sceneGridItemCount === undefined) {
    throw new Error('Scene grid data count was not captured before applying filters');
  }

  const scenePage = new ScenePage(this.page!);
  await scenePage.verifySceneGridCountAfterClearingFilters(this.sceneGridItemCount);
});

When('I click the Export button', async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);
  await scenePage.clickExportButton();
});

When('I click on the Stitched Images Export option', async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);
  await scenePage.clickExportOptionsButton(exportsOptions.stitchedImageExportOption);
});

When('I capture the Task ID from the Scenes page', async function (this: CustomWorld) {
  const scenePage = new ScenePage(this.page!);

  await scenePage.verifyExportConfirmationHeader();

  // Extract Task ID and store it in CustomWorld (replaces cy.wrap().as('taskId'))
  const taskId = await scenePage.extractTaskIdFromExportConfirmationDialog();
  this.taskId = taskId;

  await scenePage.verifyImageExportOkButtonIsDisplayed();
  await scenePage.clickImageExportOkButton();
});
