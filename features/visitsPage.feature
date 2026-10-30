Feature: Visits feature

This contains the Visits page Feature

    Background: User login and navigate to Explorer visit page
        Given I login to Trax successfully through Okta
        And   I navigate to Explorer Visits page
    
    Scenario Outline: Verify Explorer page titles
        When I select <menuOption>
        Then I see the page title as <pageTitle>
            Examples:
                | menuOption | pageTitle         |
                | "Visits"   |"Explorer - Visits"|
                | "Scenes"   |"Explorer - Scenes"|
                | "Images"   |"Explorer - Images"|

    Scenario: Verify the labels on the visits page
        Then I see Date Range label
        And  I see Visit ID label
        And  I see Visits label 

    Scenario: Verify "From" behaviour when the from field is empty in the date picker
        When I clear the values in From field
        Then I see the red border around the from field

    Scenario: Verify "To" behaviour when the to field is empty in the date picker
        When I clear the values in To field
        Then I see the red border around the to field

    Scenario: Add State column into the visits grid
        When I select state column from column selector
        Then I see the state column on the visits grid
       
    Scenario: Verify the Number of Surveys column value 
        When I select Number of Surveys column from column selector
        Then I find the Number of Surveys column value  

    Scenario: Add Review Status column into the visits grid
        When I select the Review Status column from the column selector
        Then I can see the Review Status column in the Visits grid

    Scenario: Verify that after applying filters for the status, the grid displays data based on the selected filters
        When I click the filter panel
        And  I expand the visit status drop down
        And  I type "Completed" as the Visit status
        And  I click on the Apply Button
        Then I can see all the data in the grid belongs to the "Completed" status
    
    Scenario: Verify that after applying filters for the Review Status, the grid displays data based on the selected filters
        When I select the Review Status column from the column selector
        And  I click the filter panel
        And  I expand the Filter By drop down
        And  I select "Automatically Reviewed" as Review Status
        Then I can see the data in the grid belongs to the "Automatically Reviewed" status

    Scenario: Verify dates are displayed in ascending order when click on sorting arrow in Date Column
        When  I select date range from date picker
        And   I click on the arrow to sort the date to ascending order
        Then  I can see the dates displayed in ascending order

    Scenario: Verify dates are displayed in descending order when click on sorting arrow in Date Column
        When  I select date range from date picker
        And   I click on the arrow to sort the date to descending order
        Then  I can see the dates displayed in descending order

    Scenario: Verify filters remain intact when navigating between Visits and Scenes pages
        When I select the date range from the date picker
        And  I click on the filter panel
        And  I select "User" from the drop down and select "prasangi.ponnamperuma@traxretail.com" as User
        And  I click on the filter panel
        And  I expand the Store Status drop down
        And  I type "Active" as the Store Status
        Then I can see all the data in the visit grid for store status is "Active"
        And  I see the "prasangi.ponnamperuma@traxretail.com" user is displayed in the visit grid
        And  I go to the scenes page
        And  I go to the visits page
        Then I see the "prasangi.ponnamperuma@traxretail.com" user is displayed in the visit grid
        Then I can see all the data in the visit grid for store status is "Active"

    Scenario: Verify Filter Behavior with Date Range Adjustment
        When I click on the filter panel
        And  I select the date range from the date picker
        And  I expand the visit status drop down
        And  I type "Completed" as the Visit status
        And  I click on the Apply Button
        And  I click the filter panel
        And  I expand the Store Status drop down
        And  I type "Active" as the Store Status
        And  I can see all the data in the grid belongs to the "Completed" and "Active" status
        And  I change the date range
        Then I can see all the data in the grid belongs to the "Completed" and "Active" status

    Scenario: Verify the store AdditionalAttribute Rename in the visit and scene page
        When I navigate to stores page
        And  I click on the Entities Management Tab
        And  I search for additional attribute in the textbox
        And  I rename the additional attribute in to testvalue
        Then I verify the testvalue name in the Entities Management page
        When I navigate to Explorer Visits page
        And  I type testvalue in the textbox in the select grid columns
        And  I verify the testvalue in the visit Grid
        And  I navigate to stores page
        And  I click on the Entities Management Tab
        And  I search for testvalue in the textbox
        And  I rename the testvalue in to additional attribute
        Then I can see the additional attribute as a header on the page

    Scenario: Verify the filter data for date options in the date picker
        When  I select "TODAY" option from the date picker
        Then  I can see the From and To fields and calendar highlights have the "TODAY" date range
        When  I select "THIS WEEK" option from the date picker
        Then  I can see the From and To fields and calendar highlights have the "THIS WEEK" date range
        When  I select "LAST 2 WEEKS" option from the date picker
        Then  I can see the From and To fields and calendar highlights have the "LAST 2 WEEKS" date range
        When  I select "THIS MONTH" option from the date picker
        Then  I can see the From and To fields and calendar highlights have the "THIS MONTH" date range

    Scenario: Verify a visit can be searched using the Primary ID and the Session ID
        When I set the date range
        And  I enter the Primary ID and press Enter
        Then I can see the entered Visit ID on the Visit Viewer page
        And  I click the back icon to return to the Visit page
        And  I enter the Session UID and press Enter
        Then I can see the Session UID in the URL

    @flaky
    Scenario: Verify Flagged Icon Highlighting Functionality
        When  I set the date range
        And   I click on the flagged Icon of a visit
        And   I get the Visit Id of the flagged visit
        And   I open the Filter Panel
        And   I select the Flagged option
        Then  I can see the flagged icon is highlighted in the grid, the corresponding visit viewer page and the filtered visit ID matches the flagged visit ID

    Scenario: Verify Number of Scenes are displayed in ascending order when click on sorting arrow in Number of Scenes Column
        When  I select date range
        And   I click on the arrow to sort the Number of Scenes to ascending order
        Then  I can see the Number of Scenes displayed in ascending order

    Scenario: Verify Number of Scenes are displayed in descending order when click on sorting arrow in Number of Scenes Column
        When  I select date range
        And   I click on the arrow to sort the Number of Scenes to descending order
        Then  I can see the Number of Scenes displayed in descending order

    Scenario: Verify that the exported processed items count matches the completed visits in the grid
        When  I set the date range
        And   I click the filter panel
        And   I expand the visit status drop down
        And   I type "Completed" as the Visit status
        And   I click on the Apply Button
        And   I get the completed visits count
        And   I click on the Export button
        And   I select Stitched Images Export option
        And   I navigate to the Explorer Exports page
        Then  I can see that the completed visits count matches the exported processed item count

    Scenario: Verify Original Images export, ZIP item count, Resource Type, Data Type, and Status
        When  I set date range from the date picker
        And   I click on the Export button
        And   I select Original Images Export option
        And   I navigate to the Explorer Exports page
        And   I click on the Your Files tab
        And   I click on the zip file
        And   I open the downloaded zip file and get the count of the images in the zip file
        Then  I can see that the original processed item count matches the count of images in the downloaded zip file and validate Resource Type, Data Type, Status columns

    Scenario: Verify the Internal Date Filtering toggle button functionality
        When  I set the date range using the date picker
        And   I get the grid data count
        And   I get the primary IDs from the grid when Internal Date Filtering is disabled
        And   I enable the Internal Date Filtering toggle button
        And   I get the grid data count
        And   I get the primary IDs from the grid when Internal Date Filtering is enabled
        Then  I can verify that exactly one primary ID is different and that it matches the expected visit ID
