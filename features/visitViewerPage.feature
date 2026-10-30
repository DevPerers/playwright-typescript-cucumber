Feature: Visit Viewer feature

  This contains the Visit Viewer page Feature

    Background: User login and navigate to explorer visit page
        Given I login to Trax successfully
        And   I navigate to Explorer Visits page

    Scenario: Verify the Last Visit under the map
        When  I open the visit viewer page
        And   I click on one of last visit under the map
        Then  I verify the visit was changed to reflect the selected Last Visit

    Scenario: Enable the Scene Type Display Name in the Reporting Configuration Explorer Page, and verify that it is displayed task display name on the Scene Card in the Visit Viewer Page
        When  I navigate to Reporting Configuration Explorer page
        And   I enable the option to display the Scene Type Name on the Scene card and Session details page
        And   I go to the Data Collection page
        And   I click on the Task Management Tab
        And   I click on the Capture Task Page
        And   I get the Display Name of "Oral Health Main Shelf" task
        And   I navigate to Explorer Visits page
        And   I navigate to Explorer visits viewer page
        And   I verify that the Scene Type Display Name on the Scene card is equal to the Display Name of the selected Task on the Data Collection page
        And   I navigate to the scene page
        And   I navigate to the scene viewer page
        Then  I verify the Scene Type Display Name in the scene details section is equal to the Display Name of the selected Task on the Data Collection page

    Scenario: Disable the Scene Type Display Name Checkbox and Verify It for a Selected Task on the Data Collection Page and Scene Card
        When  I navigate to Reporting Configuration Explorer page
        And   I disable the option to display the Scene Type Name on the Scene card and Session details page
        And   I go to the Data Collection page
        And   I click on the Task Management Tab
        And   I click on the Capture Task Page
        And   I get the Task Name of "Oral Health Main Shelf" task
        And   I navigate to Explorer Visits page
        And   I navigate to Explorer visits viewer page
        And   I verify that the Task Name on the Scene card is equal to the Task Name of the selected Task on the Data Collection page
        And   I navigate to the scene page
        And   I navigate to the scene viewer page
        Then  I verify the Scene Type Name in the scene details section is equal to the Task Name of the selected Task on the Data Collection page

    Scenario: Go to the visit viewer page and add comment to the visit
        When  I go to the visit viewer page
        And   I enter comment as "test"
        Then  I can see the entered comment

    Scenario: Navigate to Explorer Visit Viewer Page and verify the store link
        When  I navigate to the Visit Viewer page
        And   I get the name of the store
        And   I get the visit viewer store link tooltip
        And   I click the store link
        And   I can see the "Stores" title
        And   I verify the name of the store
        Then  I verify the store link tooltip includes street, city, state, country and store number

    Scenario: Disable the Display Task feedback on Session detail page checkbox and verify the absence of the task feedback grid
        When  I go to the Reporting Configuration Explorer page
        And   I disable the Display Task feedback on Session detail page checkbox and save the configuration
        And   I navigate to the Visit Viewer page to check the task feedback grid
        Then  I verify the task feedback grid is not available in the Visit Viewer page

    Scenario: Enable the Display Task feedback on Session detail page checkbox and verify the task feedback grid
        When  I go to the Reporting Configuration Explorer page
        And   I enable the Display Task feedback on Session detail page checkbox and save the configuration
        And   I navigate to the Visit Viewer page to check the task feedback grid
        Then  I verify the task feedback grid is available in the visit viewer page

    Scenario: Verify Scene Count and Scene ID Consistency
        When  I select a date from the date picker
        And   I select a visit and get the scene count column value from the Visits grid
        And   I click on the visit ID
        And   I retrieve the scene count on the Visit Viewer page
        Then  I verify that the scene count on the Visits grid matches the scene count on the Visit Viewer page

    Scenario: Verify the visit detail  with visit Grid and visitViewer page
        When  I apply date range to filter the data
        And   I capture visit details for a specific visit
        And   I navigate to visit Viewer page
        Then  I verify the visit details for a specific visit

    Scenario: Verify Survey Questions grid behavior when no survey questions exist
        When  I navigate to Explorer Visits page
        And   I search for a visit that does not contain any survey questions
        Then  I can see the message as No survey for this visit

    Scenario: Disable the Hide price for Other products from Products table checkbox and verify price value is present in the product grid
        When  I go to the Reporting Configuration Explorer page
        And   I disable the Hide price for Other products from Products table checkbox and save the configuration
        And   I navigate to Explorer Visits page
        And   I enter visit ID in the search box and open the visit viewer page
        And   I click on the show button on product table
        And   I get price for Colgate Toothbrush Other in product grid
        Then  I verify that price value is present in the product grid

    Scenario: Enable the Hide price for Other products from Products table checkbox and verify price value is absence in the product grid
        When  I go to the Reporting Configuration Explorer page
        And   I enable the Hide price for Other products from Products table checkbox and save the configuration
        And   I navigate to Explorer Visits page
        And   I enter visit ID in the search box and open the visit viewer page
        And   I click on the show button on product table
        And   I get price for Colgate Toothbrush Other in product grid
        Then  I verify that price value is absence in the product grid
