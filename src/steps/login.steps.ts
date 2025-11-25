import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "expect";
import { LoginPage } from "../pages/LoginPage";
import type { CustomWorld } from "../support/world";
import { loginWithValidUser } from "../utils/helpers";

let loginPage: LoginPage;

Given("I open the login page", async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.open(this.envConfig.baseUrl);
});

When("I login with valid credentials", async function (this: CustomWorld) {
  // Record environment-specific test data in the world's generic testData store
  this.addTestData("credentials", {
    env: this.envConfig.name,
    validUser: this.envConfig.validUser,
    validPassword: this.envConfig.validPassword,
  });

  await loginWithValidUser(this.page, this.envConfig);
});

When(
  "I login with username {string} and password {string}",
  async function (this: CustomWorld, username: string, password: string) {
    // Record the actual credentials used for this step (plus env)
    this.addTestData("credentials", {
      env: this.envConfig.name,
      username,
      password,
    });

    loginPage = new LoginPage(this.page);
    await loginPage.open(this.envConfig.baseUrl);
    await loginPage.login(username, password);
  }
);

Then("I should see the products page", async function () {
  const isOnProducts = await loginPage.isOnProductsPage();
  expect(isOnProducts).toBe(true);
});

Then("I should see a login error message", async function () {
  const error = await loginPage.getErrorMessage();
  expect(error).not.toBeNull();
});
