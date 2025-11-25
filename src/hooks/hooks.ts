import { Before, After } from "@cucumber/cucumber";
import { chromium, firefox } from "playwright";
import type { CustomWorld } from "../support/world";

Before(async function (this: CustomWorld) {
  // Get browser type from BROWSER env var (default: chromium)
  const browserType = process.env.BROWSER || 'chromium';
  this.browserType = browserType;

  // Select browser based on env var
  let browser;
  if (browserType.toLowerCase() === 'firefox') {
    browser = await firefox.launch({ headless: true });
  } else {
    // default to chromium
    browser = await chromium.launch({ headless: true });
  }

  this.browser = browser;
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario: any) {
  try {
    // If scenario failed, capture a screenshot and attach as PNG
    const status = scenario?.result?.status || scenario?.result?.statusName || '';
    const isFailed = String(status).toLowerCase().includes('fail');

    if (isFailed && this.page && !this.page.isClosed()) {
      try {
        const buffer = await this.page.screenshot({ fullPage: true });
        await this.attach(buffer, 'image/png');
      } catch (err) {
        // swallow screenshot errors
      }
    }

    // Attach any collected test data (if present) to the scenario report
    const testData = this.getTestData?.() ?? this.testData ?? {};
    if (testData && Object.keys(testData).length) {
      // include environment name as well
      const payload = {
        env: this.envConfig?.name ?? "",
        testData,
      };
      await this.attach(JSON.stringify(payload, null, 2), "application/json");
    }
  } catch (err) {
    // swallow attach errors so teardown proceeds
  }

  try {
    if (this.page && !this.page.isClosed()) await this.page.close();
  } catch (e) {}
  try {
    if (this.context) await this.context.close();
  } catch (e) {}
  try {
    if (this.browser) await this.browser.close();
  } catch (e) {}
});
