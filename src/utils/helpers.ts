import type { Page } from "playwright";
import { LoginPage } from "../pages/LoginPage";
import type { EnvConfig } from "../config/env.types";

export async function loginWithValidUser(page: Page, envConfig: EnvConfig): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.open(envConfig.baseUrl);
  await loginPage.login(envConfig.validUser, envConfig.validPassword);
}
