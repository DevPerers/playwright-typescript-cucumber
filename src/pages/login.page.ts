import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#input-userName');
    this.passwordInput = page.locator('#input-password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('#error-message');
  }

  async navigateToLoginPage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async verifyLoginPageUserNameElementIsVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
  }

  async verifyLoginPageVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async clickLoginButton(): Promise<void> {
    // First click to submit the initial form / trigger redirect
    await this.loginButton.click();
    try {
      // Wait for the auth redirect URL pattern (up to 60s)
      await this.page.waitForURL('**/auth/v4.2/authentication-code**', { timeout: 60000 });
      // Perform the second click on the secondary auth form
      await this.loginButton.click();
    } catch (error) {
      // Ignore timeout if the redirect doesn't occur (e.g., in scenarios where it lands directly)
    }
  }

  async verifyErrorMessage(errorMsg: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(errorMsg);  
  }
  
  async enterCredentials(username: string, pass: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
  }

  async login(username: string, pass: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}