Feature: Verify Footer Component

    Background:
        Given I navigate to the landing page
        And I wait for the page to load
        Then I should see the landing page components

    @footer @ui
    Scenario: Footer basic visibility and structure
        Then I should see the footer banner and the banner content
        And the footer should contain the Playstore button and the Apple Store button
        And the footer should contain supported links
        And the footer should contain the newsletter logo
        And the footer should contain the newsletter phone number, email, and contact link
        And the footer should contain the newsletter name and email input fields
        And the footer should contain the newsletter signup button


    @footer @ui @validation
    Scenario Outline: Verify accessible Playstore and Apple Store buttons in footer
        When I select the button "<buttonName>" in the footer
        Then I should be directed to a new tab with expected URL "<expectedUrl>"
        Examples:
            | buttonName  | expectedUrl                                                        |
            | playstore   | https://play.google.com/store/apps/details?id=com.phptravelsnative |
            | apple store | https://apps.apple.com/us/app/phptravels/id1018217005              |

    @footer @validation @ui
    Scenario Outline: Verify accessible supported links in footer
        When I select the link "<linkName>" in the footer
        Then I should be redirected to the expected URL "<expectedUrl>"
        Examples:
            | linkName          | expectedUrl                                   |
            | about us          | https://phptravels.net/page/about-us          |
            | privacy policy    | https://phptravels.net/page/privacy-policy    |
            | file a claim      | https://phptravels.net/page/file-a-claim      |
            | contact us        | https://phptravels.net/page/contact-us        |
            | become a supplier | https://phptravels.net/page/become-a-supplier |
            | careers and jobs  | https://phptravels.net/page/careers-and-jobs  |
            | terms of use      | https://phptravels.net/page/terms-of-use      |
            | faq               | https://phptravels.net/page/faq               |
            | how to book       | https://phptravels.net/page/how-to-book       |
            | cookies policy    | https://phptravels.net/page/cookies-policy    |
            | booking tips      | https://phptravels.net/page/booking-tips      |

    @footer @smoke @postive
    Scenario Outline: successfully for newsletter with existed
        Given I enter name "<name>" in the newsletter name input field
        And I enter valid email "<email>" in the newsletter email input field
        When I select the signup newsletter button
        Then I should see a successful submission alert and accept the alert
        Examples:
            | name         | email                 |
            | John Doe     | john@example.com      |
            | Sarah Nguyen | sarah.nguyen@test.com |

    @footer @smoke @negative
    Scenario Outline: signup for newsletter with existed
        Given I enter name "<name>" in the newsletter name input field
        And I enter invalid email "<email>" in the newsletter email input field
        When I select the signup newsletter button
        Then I should see a email existed submission alert and accept the alert
        Examples:
            | name         | email                 |
            | John Doe     | chloe@example.com     |
            | Sarah Nguyen | sky.nguyen@test.com   |

    # @footer @smoke @negative
    # Scenario Outline: Signup newsletter form with only name
    #     Given I enter name "<name>" in the newsletter name input field
    #     And I leave email empty in the newsletter email input field
    #     When I select the signup newsletter button
    #     Then I should see a missing email submission alert and accept the alert
    #     Examples:
    #         | name         |
    #         | John Doe     |
    #         | Sarah Nguyen |

    # @footer @smoke @negative
    # Scenario Outline: Signup newsletter form with only email
    #     Given I leave name empty in the newsletter name input field
    #     And I enter valid email "<email>" in the newsletter email input field
    #     When I select the signup newsletter button
    #     Then I should see a missing name submission alert and accept the alert
    #     Examples:
    #         | email                 |
    #         | john@example.com      |
    #         | sarah.nguyen@test.com |
