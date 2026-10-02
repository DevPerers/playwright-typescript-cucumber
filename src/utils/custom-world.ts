import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  // Custom scenario state variables
  postedComment?: string;

  // Index signature allows dynamically attaching custom state properties in step definitions
  [key: string]: any;
}

export class CustomWorldClass extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  // Custom scenario state variables
  postedComment?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorldClass);
