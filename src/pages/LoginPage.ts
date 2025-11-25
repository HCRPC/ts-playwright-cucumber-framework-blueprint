import type { Page } from "playwright";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private usernameInput = "#user-name";
  private passwordInput = "#password";
  private loginButton = "#login-button";
  private errorMessage = "[data-test='error']";
  private productsTitle = ".title";

  constructor(page: Page) {
    super(page);
  }

  async open(baseUrl: string): Promise<void> {
    await this.goto(baseUrl);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string | null> {
    const locator = this.page.locator(this.errorMessage);
    if (await locator.isVisible()) {
      return await locator.textContent();
    }
    return null;
  }

  async isOnProductsPage(): Promise<boolean> {
    const locator = this.page.locator(this.productsTitle);
    if (await locator.isVisible()) {
      const text = await locator.textContent();
      return (text || "").includes("Products");
    }
    return false;
  }
}
