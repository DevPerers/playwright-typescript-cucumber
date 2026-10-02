import { When, Then } from '@cucumber/cucumber';
import { ImagePage } from '../pages/image.page';
import { ImageViewerPage } from '../pages/imageViewer.page';
import { CustomWorld } from '../utils/custom-world';
import testData from '../fixtures/imagePageTestData.json';

When('I navigate to the Explorer Image Viewer page by providing an image ID', async function (this: CustomWorld) {
  const imagePage = new ImagePage(this.page!);
  await imagePage.navigateToImageViewerPage(testData.productImageId);
});

Then('I see that the correct image viewer page has loaded', async function (this: CustomWorld) {
  const imageViewerPage = new ImageViewerPage(this.page!);
  await imageViewerPage.verifyImageId(testData.productImageId);
});

When('I add a comment as {string}', async function (this: CustomWorld, commentUserInput: string) {
  const imageViewerPage = new ImageViewerPage(this.page!);
  await imageViewerPage.openCommentPopupWindow();

  const commentToPost = `${commentUserInput} ${Date.now()}`;
  this.postedComment = commentToPost; // Store in Cucumber World context instead of alias
  await this.page!.waitForTimeout(2000);
  await imageViewerPage.addComment(commentToPost);
  await this.page!.waitForTimeout(2000);
  await imageViewerPage.clickPostButton();
  // Pause for 2 seconds before moving to the next step
  await this.page!.waitForTimeout(2000);
});

Then('I see entered comment', async function (this: CustomWorld) {
  const imageViewerPage = new ImageViewerPage(this.page!);
  await imageViewerPage.verifyAddedComment(this.postedComment!);
});

When('I click on a tag on the Image viewer page', async function (this: CustomWorld) {
  const imageViewerPage = new ImageViewerPage(this.page!);
  await imageViewerPage.clickArrowIconOfProductPalette();
  await imageViewerPage.waitForSkuImageToLoad(5);
  await imageViewerPage.clickOnTag(5);
});

Then('I see the correct sku name is highlighted on the product palette', async function (this: CustomWorld) {
  const imageViewerPage = new ImageViewerPage(this.page!);
  await imageViewerPage.verifyProductAndSkuNameMatch();
});
