import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import testData from '../fixtures/scenesPageTestData.json';

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  // Custom scenario state variables
  postedComment?: string;
  sceneGridItemCount?: number;

  // Index signature allows dynamically attaching custom state properties in step definitions
  [key: string]: any;
}

export class CustomWorldClass extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  testData = testData; // Attach fixture data to World instance

  // Custom scenario state variables
  postedComment?: string;
  sceneGridItemCount?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorldClass);
