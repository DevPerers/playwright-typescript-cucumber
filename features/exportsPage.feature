Feature: Exports feature

This contains the Exports page Feature

    Background: User login and navigate to Explorer Exports page
        Given I login to Trax successfully
        And   I navigate to the Explorer Exports page
        Then  I see the "Exports" Title
    
    Scenario: Verify the columns on the Explorer Exports Grid
        Then I see the following columns
          | Task ID           |
          | Resource Type     |
          | Data Type         |
          | Status            |
          | Processed Items   |
          | Progress          |
          | Expected End Time |
          | (EET) Accuracy    |
          | Your Downloads    |
          | Created At        |
          | Started At        |
          | Updated At        |
