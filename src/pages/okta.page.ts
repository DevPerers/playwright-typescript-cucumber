import { Page, Locator, expect } from '@playwright/test';

export class OKTAPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#okta-signin-username');
    this.passwordInput = page.locator('#okta-signin-password');
    this.loginButton = page.locator('#okta-signin-submit');
  }

  async verifyOKTALoginPageUserNameElementIsVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username: string, pass: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}