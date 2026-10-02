import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';
import { CustomWorld } from '../utils/custom-world';
// Set global timeout to 60 seconds for all Cucumber steps
setDefaultTimeout(60 * 1000);
// 2. Playwright assertion timeout for all expect() calls
expect.configure({ timeout: 60000 });

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000,
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, 'image/png');
  }

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});