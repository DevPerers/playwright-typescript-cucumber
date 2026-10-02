import { Page, Locator, expect } from '@playwright/test';

export class ImageViewerPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly commentOption: Locator;
  readonly commentTextArea: Locator;
  readonly commentPostButton: Locator;
  readonly commentPopupCloseOption: Locator;
  readonly commentDialogCard: Locator;
  readonly commentMessageText: Locator;
  readonly productPaletteArrowIcon: Locator;
  readonly tags: Locator;
  readonly productNameHeader: Locator;
  readonly selectedSkuProductElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.explorer-sub-header-top-title');
    this.commentOption = page.locator('div[class="explorer-viewer-sub-header-top-actions-container"] > trx-explorer-tooltip:nth-child(3)');
    this.commentTextArea = page.locator('textarea[placeholder="Your Message"]');
    this.commentPostButton = page.locator('trx-explorer-async-button > button');
    this.commentPopupCloseOption = page.locator('div.comments-dialog-topbar > span > svg-icon');
    this.commentDialogCard = page.locator('div[class="comments-dialog-card"]');
    this.commentMessageText = page.locator('.comment-message-text');
    this.productPaletteArrowIcon = page.locator('.handle > svg-icon.trax-icon');
    this.tags = page.locator('trx-explorer-item-tag > .tag-container > .tag-default');
    this.productNameHeader = page.locator('.item-details-local-name-header');
    this.selectedSkuProductElement = page.locator('.tagged-products-palette-product-element.selected');
  }

  async getImageId(): Promise<string> {
    const text = (await this.headerTitle.textContent()) || '';
    const match = text.match(/\d+/);
    return match ? match[0] : '';
  }

  async verifyImageId(expectedId: string): Promise<void> {
    const id = await this.getImageId();
    expect(id).toBe(expectedId);
  }

  async openCommentPopupWindow(): Promise<void> {
    await this.commentOption.click();
    await expect(this.commentDialogCard).toBeVisible();
  }

  async addComment(commentText: string): Promise<void> {
    await this.commentTextArea.fill(commentText);
    await this.page!.waitForTimeout(2000);
    await this.commentTextArea.press('Space');
    await this.page!.waitForTimeout(2000);
    //await this.commentTextArea.press('Backspace');
  }

  async clickPostButton(): Promise<void> {
    await this.commentPostButton.click();
  }

  async verifyAddedComment(commentText: string): Promise<void> {
    // Target the specific comment element that contains the newly posted text
    const addedCommentLocator = this.commentMessageText.filter({ hasText: commentText });
    // Assert that this specific comment is visible and contains the text
    await expect(addedCommentLocator).toBeVisible();
    await expect(addedCommentLocator).toContainText(commentText);
    // Close the popup window
  await this.commentPopupCloseOption.click();
  }

  async clickArrowIconOfProductPalette(): Promise<void> {
    await this.productPaletteArrowIcon.click();
  }

  async getTag(index: number): Promise<Locator> {
    const tag = this.tags.nth(index);
    await expect(tag).toBeVisible();
    return tag;
  }

  async clickOnTag(index: number): Promise<void> {
    const tag = await this.getTag(index);
    await tag.dblclick({ force: true });
  }

  async waitForSkuImageToLoad(index: number): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/explorer/assets/img/tag-yellow.png') &&
        [200, 304].includes(response.status()),
      { timeout: 120000 }
    );
    await this.clickOnTag(index);
    await responsePromise;
  }

  async getProductName(): Promise<string> {
    const text = (await this.productNameHeader.textContent()) || '';
    return text.trim();
  }

  async getSkuName(): Promise<string> {
    const title = (await this.selectedSkuProductElement.getAttribute('title')) || '';
    return title.trim();
  }

  async verifyProductAndSkuNameMatch(): Promise<void> {
    const productName = await this.getProductName();
    const skuName = await this.getSkuName();
    expect(skuName).toBe(productName);
  }
}
