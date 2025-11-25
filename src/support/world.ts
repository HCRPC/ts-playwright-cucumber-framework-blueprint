import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";
import type { EnvConfig } from "../config/env.types";
import { envConfig } from "../config/env";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  envConfig: EnvConfig;
  // generic place to collect test data used during a scenario
  testData: Record<string, any> = {};
  browserType!: string; // Track which browser is being used

  constructor(options: IWorldOptions) {
    super(options);
    this.envConfig = envConfig;
  }

  // Add or merge test data under a key
  addTestData(key: string, value: any) {
    // if value is object and key already exists, merge; otherwise set
    if (this.testData[key] && typeof this.testData[key] === 'object' && typeof value === 'object') {
      this.testData[key] = { ...this.testData[key], ...value };
    } else {
      this.testData[key] = value;
    }
  }

  // Retrieve collected test data
  getTestData() {
    return this.testData;
  }
}

setWorldConstructor(CustomWorld);
