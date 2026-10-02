Feature: Image feature

  This contains the Image page Feature

  Background: User login and navigate to explore image page
    Given I login to Trax successfully
    And I navigate to Explorer Images page

  Scenario: Verify the labels on the Explorer Images page
    Then I see Search field, FromDate field, ToDate field labels
    And I see Image label
    And I see the column with Image title

  Scenario: Verify "From" behaviour when the from field is empty in the date picker
    When I clear the values in From field
    Then I see the red border around the from field

  Scenario: Verify "To" behaviour when the to field is empty in the date picker
    When I clear the values in To field
    Then I see the red border around the to field

  Scenario: Verify that entering an image ID directs to the correct viewer page.
    When I type an image id in the imageId Text Box
    Then I see that the correct image viewer page has been loaded

  Scenario Outline: Verify that applying filters for different statuses displays correct data in the grid
    When I navigate to Explorer Images page
    And I set a date range from the date picker
    And I click filter panel
    And I expand the image status drop down
    And I type "<status>" as the image status
    And I click Apply Button
    Then I can see that the grid shows that the data is in the "<status>" status

    Examples:
      | status    |
      | New       |
      | Validated |
      | Processed |