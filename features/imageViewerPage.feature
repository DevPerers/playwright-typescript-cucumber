Feature: Image Viewer feature

This contains the Image Viewer Page Feature

    Background: User login and navigate to explore image page
        Given I login to Trax successfully
        And   I navigate to Explorer Images page

    Scenario: Navigate to the correct viewer page with a valid image ID
        When  I navigate to the Explorer Image Viewer page by providing an image ID
        Then  I see that the correct image viewer page has loaded

    Scenario: Add a comment on the image viewer page
        When  I navigate to the Explorer Image Viewer page by providing an image ID
        And   I add a comment as "Test comment"
        Then  I see entered comment

    Scenario: Verify SKU highlight when selecting a tag on the image viewer page
        When  I navigate to the Explorer Image Viewer page by providing an image ID
        And   I click on a tag on the Image viewer page
        Then  I see the correct sku name is highlighted on the product palette
