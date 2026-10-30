Feature: Scene Viewer feature

This contains the Scenes Viewer page Feature

    Background: User login and navigate to explorer scene viewer page
        Given I login to Trax successfully through Okta
        And   I navigate to Explorer Scenes page

    Scenario: Go to the Scene viewer page and add comment to the Scene
        When  I go to the Scene viewer page
        And   I add comment as "test"
        Then  I see the entered comment

    Scenario: Navigate to Explorer Scene Viewer Page and verify the store link
        When  I navigate to the Scene Viewer page 
        And   I get the store name
        And   I get the Scene Viewer store link tooltip
        And   I click on the store link
        And   I see the "Stores" title
        And   I verify the store name
        Then  I verify the store link tooltip includes street, city, state and country
    
    Scenario Outline: Check the checkboxes and verify whether they are checked
        When  I navigate to Reporting Configuration Explorer page 
        And   I check <checkboxName> checkbox if it is unchecked & save the changes
        Then  I verify <checkboxName> checkbox is checked
            Examples:
                | checkboxName   |
                | "Brand"        |
                | "Category"     |
                | "Manufacturer" |
                | "SubCategory"  |

    Scenario Outline: Navigate to Explorer Scene Viewer Page and validate the products grid filters' visibility
        When  I navigate to Explorer Scenes Viewer page
        Then  I verify the <filterName> filter is visible when the checkbox is checked
            Examples:
                | filterName        |
                | "By Brand"        |
                | "By Categories"   |
                | "By Manufacturer" |
                | "By SubCategory"  |

    Scenario Outline: Navigate to Reporting Configurations Explorer page & Uncheck the checkboxes and verify whether they are unchecked
        When  I navigate to Reporting Configuration Explorer page 
        And   I uncheck <checkboxName> checkbox if it is checked & save the changes
        Then  I verify <checkboxName> checkbox is unchecked
            Examples:
                | checkboxName   |
                | "Brand"        |
                | "Category"     |
                | "Manufacturer" |
                | "SubCategory"  |

    Scenario: Navigate to Explorer Scene Viewer Page & Validate the products grid filters' non-existance
        When  I navigate to Explorer Scenes Viewer page
        And   I verify the <filterName> filters are not visible when all the checkboxes are unchecked
            Examples:
                | filterName        |
                | "By Manufacturer" |
                | "By SubCategory"  |
    
    Scenario: Navigate to Explorer Scene Viewer Page & Validate the products grid filters' existance
        When  I navigate to Explorer Scenes Viewer page
        Then  I verify the <filterName> filters are visible when all the checkboxes are unchecked
            Examples:
                | filterName        |
                | "By Brand"        |
                | "By Categories"   |

    Scenario: Navigate to Explorer Scene Viewer Page and add Category column to the product table
        When  I navigate to the Scene Viewer page to see the product table 
        And   I click on the Show button on the top right corner on the product table
        And   I click on the select Grid Columns
        Then  I verify that all the columns are selected to the product table by default
        And   I deselect "Category" Column from the grid
        Then  I cannot see the "Category" column in the product grid

    Scenario: Verify survey question count on the survey grid in scene viewer page
        When  I navigate to Explorer Scenes page
        And   I add Number-of-Survey column to the scene grid
        And   I get the value that include in the Number-of-Survey column for the specific scene   
        And   I click on the scene Id
        Then  I verify the survey questions count

    Scenario: Verify the scene details in the scene Viewer page
        When  I navigate to Explorer Scenes page
        And   I apply a date range to filter the data to capture scene details
        And   I capture scene details for a specific scene    
        And   I navigate to Scene Viewer page
        Then  I verify the scene details for a specific scene

    Scenario: Verify that the By Brand products are in ascending order in the product palette.
        When  I navigate to Reporting Configuration Explorer page
        And   I select the By "Brand" checkbox under the allow filtering scene products by section
        And   I save the changes
        And   I navigate to Explorer Scenes page
        And   I search by scene ID
        And   I click on the one of the brand name and expand it
        Then  I can see the products are displayed in ascending order

    Scenario: Verify the Toggle Product View Icon Functionality
        When  I navigate to the scene page
        And   I navigate to Explorer Scenes Viewer page
        And   I can see the toggle product view Icon
        And   I can see the product palette expanded
        And   I click on the toggle product view icon
        Then  I can see the product palette is collapsed

    Scenario: Verify highlighted product names and SKU link functionality
        When  I navigate to Explorer Scenes page
        And   I enter a scene ID in the search box
        And   I enter a product name in the SKU search box and press enter
        And   I copy the highlighted SKU URL
        Then  I can see the clipboard update to copied, the filter section include the product names, and the product count match the highlighted tags

    Scenario: Verify Survey Questions grid behavior when no survey questions exist
        When  I navigate to Explorer Scenes page
        And   I search for a scene that does not contain any survey questions
        Then  I can see the message as No survey for this scene

    Scenario: Verify product tag highlighting after SKU filter Removal
        When  I navigate to Explorer Scenes page
        And   I enter a scene ID in the search box
        And   I select multiple product names from the product list
        And   I remove one of the selected product names by clicking on the x icon from the SKU Filters for Tag Highlighting
        Then  I can see that the highlighted tags count match the selected product count
