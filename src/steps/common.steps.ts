import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { OKTAPage } from '../pages/okta.page';
import { ImagePage } from '../pages/image.page';
import { config } from '../config/env.config';

Given('I login to Trax successfully', { timeout: 70000 }, async function (this: CustomWorld) {
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

Given('I navigate to the Explorer Exports page', { timeout: 70000 }, async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.navigateToPage( config.explorerUrl);
});

Given('I navigate to Explorer Images page', { timeout: 70000 }, async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.navigateToPage( config.imageUrl);
});

Given('I navigate to Explorer Scenes page', { timeout: 70000 }, async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.navigateToPage( config.sceneUrl);
});
