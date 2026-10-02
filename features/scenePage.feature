Feature: Scenes feature

This contains the Scenes page Feature

    Background: User login and navigate to Explorer scenes page
        Given I login to Trax successfully
        And   I navigate to Explorer Scenes page

    Scenario: Verify the functionality of the Clear Filters button
        When  I select a date range from the date picker
        And   I get the scene grid data count
        And   I open the filter panel
        And   I select "Status" filter option, select the "Completed" value
        And   I select "Store Status" filter option, select the "Active" value
        And   I select "Review Status" filter option, select the "Automatically Reviewed" value
        And   I close the filter panel
        And   I click on "CLEAR FILTERS" button
        Then  I see that the grid row count reverts to the original count before filters are applied
    
    Scenario: Verify image export for Stitched Images and validate Resource Type, Data Type, Status columns, and processed items count
        When  I set the date range from the date picker
        And   I open the filter panel
        And   I select "Status" filter option, select the "Completed" value
        And   I get the Scenes grid count
        And   I click the Export button
        And   I click on the Stitched Images Export option
        And   I capture the Task ID from the Scenes page
        And   I navigate to the Explorer Exports page
        Then  I can see the completed scenes count matches the exported processed items count and validate Resource Type, Data Type, Status columns

    Scenario: Verify image export for Original Images and validate Resource Type, Data Type, Status columns, and processed items count
        When  I set the date range from the date picker
        And   I get the Scenes grid count
        And   I click the Export button
        And   I click the Original Images Export option
        And   I capture the Task ID from the Scenes page
        And   I navigate to the Explorer Exports page
        Then  I can see the scenes count matches the exported processed items count and validate Resource Type, Data Type, Status columns
