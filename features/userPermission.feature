Feature: Explorer User Permission

This contains the Explorer User Permission Feature

    Background: User login and navigate to User Management application
        Given I login to Trax successfully through Okta without Session
        And   I navigate to the User Management application

    Scenario: Configuration Scenario for Enabling “Show Real-Time Data” Permission and Validating Visit Status Filter Options When the Permission Is Enabled.
        And   I navigate to the "Roles" tab
        And   I search for the "TestExplorer" role
        And   I edit the TestExplorer role to enable the Show Real-Time Data permission
        And   I navigate to the "Users" tab
        And   I edit the automation test user and assign the "TestExplorer" role 
        And   I log out from the application
        And   I login to Trax successfully through Okta without Session
        And   I navigate to Explorer Visits page
        And   I set the date range
        And   I open the filter panel
        And   I expand the visit status drop down 
        Then  I can see "(Apply All), Completed, Processing, Live Available, Occluded" filter options under Visit Status
        And   I navigate to the User Management application
        And   I edit the automation test user and assign the "Automation Role" role
        And   I log out from the application

    Scenario: Configuration Scenario for Disabling “Show Real-Time Data” Permission and Validating Visit Status Filter Options When the Permission Is Disabled.
        And   I navigate to the "Roles" tab
        And   I search for the "TestExplorer" role
        And   I edit the TestExplorer role to disable the Show Real-Time Data permission
        And   I navigate to the "Users" tab
        And   I edit the automation test user and assign the "TestExplorer" role 
        And   I log out from the application
        And   I login to Trax successfully through Okta without Session
        And   I navigate to Explorer Visits page
        And   I set the date range
        And   I open the filter panel
        And   I expand the visit status drop down 
        Then  I can see "(Apply All), Completed" filter options under Visit Status
        And   I navigate to the User Management application
        And   I edit the automation test user and assign the "Automation Role" role
        And   I log out from the application

    Scenario: Configuration Scenario for Enabling “pic2pog” Permission in UM application and Verifying That the “Export Planogram” Button Is Displayed and Functions Correctly on the Visits Viewer and Scenes Viewer Pages.
        And   I navigate to the "Roles" tab
        And   I search for the "Pic2Pog" role
        And   I edited the Pic2Pog role to enable the pic2pog permission
        And   I navigate to the "Users" tab
        And   I edit the automation test user and assign the "Pic2Pog" role
        And   I log out from the application
        And   I login to Trax successfully through Okta without Session
        And   I navigate to Explorer Visits page
        And   I enter a Visit ID in the search bar
        Then  I can see that the Export Planogram button is available on the Visits Viewer page
        And   I click on the Export Planogram button
        And   I click on the Scene Level PSA option
        Then  I can see the PSA file has been downloaded successfully
        And   I click on the scene ID on the scene card
        Then  I can see that the Export Planogram button is available on the Scene Viewer page
        And   I click on the Export Planogram button
        And   I click on the Scene Level PSA option
        Then  I can see the PSA file has been downloaded successfully
        And   I navigate to the User Management application
        And   I edit the automation test user and assign the "Automation Role" role
        And   I log out from the application

    Scenario: Configuration Scenario for Disabling “pic2pog” Permission in UM application and Verifying That the “Export Planogram” Button Is Not Displayed on the Visits Viewer and Scenes Viewer Pages.
        And   I navigate to the "Roles" tab
        And   I search for the "Pic2Pog" role
        And   I edited the Pic2Pog role to disable the pic2pog permission
        And   I navigate to the "Users" tab
        And   I edit the automation test user and assign the "Pic2Pog" role
        And   I log out from the application
        And   I login to Trax successfully through Okta without Session
        And   I navigate to Explorer Visits page
        And   I enter a Visit ID in the search bar
        Then  I cannot see the Export Planogram button on the Visits Viewer page
        And   I click on the scene ID on the scene card
        Then  I cannot see the Export Planogram button on the Scene Viewer page
        And   I navigate to the User Management application
        And   I edit the automation test user and assign the "Automation Role" role
        And   I log out from the application

    Scenario: Configuration Scenario for Enabling “consensus planogram” Permission in UM application and Verifying That the “Export Planogram” Button Is Displayed and Functions Correctly on the Visits Viewer and Scenes Viewer Pages.
        And   I navigate to the "Roles" tab
        And   I search for the "Pic2Pog" role
        And   I edited the Pic2Pog role to enable the consensus planogram permission
        And   I navigate to the "Users" tab
        And   I edit the automation test user and assign the "Pic2Pog" role
        And   I log out from the application
        And   I login to Trax successfully through Okta without Session
        And   I navigate to Explorer Visits page
        And   I enter a Visit ID for which the consensus planogram is available
        And   I can see that the Export Planogram button is available on the Visits Viewer page
        And   I click on the Export Planogram button
        Then  I can see that the consensus planogram option is available
        And   I click on the scene ID on the scene card
        Then  I can see that the Export Planogram button is available on the Scene Viewer page
        And   I click on the Export Planogram button
        And   I can see that the consensus planogram option is available
        And   I navigate to the User Management application
        And   I edit the automation test user and assign the "Automation Role" role
        And   I log out from the application

    Scenario: Configuration Scenario for Disabling “consensus planogram” Permission in UM application and Verifying That the “Export Planogram” Button Is Not Displayed on the Visits Viewer and Scenes Viewer Pages.
        And   I navigate to the "Roles" tab
        And   I search for the "Pic2Pog" role
        And   I edited the Pic2Pog role to disable the consensus planogram permission
        And   I navigate to the "Users" tab
        And   I edit the automation test user and assign the "Pic2Pog" role
        And   I log out from the application
        And   I login to Trax successfully through Okta without Session
        And   I navigate to Explorer Visits page
        And   I enter a Visit ID for which the consensus planogram is available
        Then  I cannot see the Export Planogram button on the Visits Viewer page
        And   I click on the scene ID on the scene card
        Then  I cannot see the Export Planogram button on the Scene Viewer page
        And   I navigate to the User Management application
        And   I edit the automation test user and assign the "Automation Role" role
        And   I log out from the application
