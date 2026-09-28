Feature: Verify the login page and its functionality

  Background: user navigates to the login page
    Given the user navigates to the login page
    
  Scenario: Verify the login page is accessible
    Then the login page should be visible

  Scenario: Verify the login page UI
    Then the login page UI elements are visible

  Scenario: User sees an error message on login page
    When clicks the login button
    Then the user should see the error message as "Please provide a user name"

  Scenario: User logs in with incorrect credentials
    When the user enters invalid credentials
    And clicks the login button
    Then the user should see the error message as "Invalid credentials."

  Scenario: User logs in with correct credentials
    When the user enters valid credentials
    And clicks the login button
    Then user should see OKTA login page
    When the user enters valid OKTA credentials
    Then User should be redirected to the home page
