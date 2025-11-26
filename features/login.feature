Feature: Login

  As a user of the demo app
  I want to login with valid and invalid credentials
  So that I can access the products page or see an error message

  @smoke @ui @acceptance
  Scenario: Successful login on STG / PREPROD / PROD
    Given I open the login page
    When I login with valid credentials
    Then I should see the products page

  @negative @smoke
  Scenario: Login fails with invalid credentials
    Given I open the login page
    When I login with username "invalid_user" and password "wrong_password"
    Then I should see a login error message

  @Negative @acceptance
  Scenario: Test should fail to see screenshots
    Given I open the login page
    When I login with username "invalid_user" and password "wrong_password"
    Then I should see the products page
