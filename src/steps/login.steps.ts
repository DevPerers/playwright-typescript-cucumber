import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { OKTAPage } from '../pages/okta.page';
import { config } from '../config/env.config';

Given('the user navigates to the login page', { timeout: 70000 }, async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.navigateToLoginPage(config.baseUrl);
});

Then('the login page should be visible', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.verifyLoginPageUserNameElementIsVisible();
});

Then('the login page UI elements are visible', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.verifyLoginPageVisible();
});

When('clicks the login button', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.clickLoginButton();
});

Then('the user should see the error message as {string}', async function (this: CustomWorld,  errorMsg: string) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.verifyErrorMessage(errorMsg);
});  

When('the user enters invalid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.enterCredentials('invalidUser', 'invalidPassword');
});

When('the user enters valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.enterCredentials(config.credentials.standardUser.username, config.credentials.standardUser.password);
});

Then('user should see OKTA login page', { timeout: 70000 }, async function (this: CustomWorld) {
  const oktaPage = new OKTAPage(this.page!);
  await oktaPage.verifyOKTALoginPageUserNameElementIsVisible();
});


When('the user enters valid OKTA credentials', async function (this: CustomWorld) {
  const oktaPage = new OKTAPage(this.page!);
  await oktaPage.login(config.credentials.standardUser.username, config.credentials.standardUser.oktaPassword);
});

Then('User should be redirected to the home page', { timeout: 70000 }, async function (this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.verifyHomePageLoaded();
});
