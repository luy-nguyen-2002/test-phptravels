Feature: Verify Header Component

  Background:
    Given I navigate to the landing page
    And I wait for the page to load
    Then I should see the landing page components

  @header @ui
  Scenario: Header basic visibility and structure
    Then I should see the header component
    And the header should contain the logo
    And the header should contain the navigation tabs: Flights, Hotels, Tours, Cars, Visa, Blogs
    And the header should contain the language dropdown menu
    And the header should contain the currency dropdown menu
    And the header should contain the Agents dropdown menu
    And the header should contain the Customer dropdown menu

  @header @ui
  Scenario Outline: Navigation tab links work correctly
    When I click the tab link "<tabLinkName>"
    Then I should be directed to the corresponding URL "<expectedUrl>"
    Examples:
      | tabLinkName | expectedUrl                        |
      | Flights     | https://phptravels.net/flights     |
      | Hotels      | https://phptravels.net/hotels      |
      | Tours       | https://phptravels.net/tours       |
      | Cars        | https://phptravels.net/cars        |
      | Visa        | https://phptravels.net/visa        |
      | Blogs       | https://phptravels.net/blogs       |

  @header @ui
  Scenario Outline: Language dropdown behaviour
    When I open the language dropdown menu
    Then I should see supported language options
    When I select the language option "<language>"
    Then the language dropdown should display as "<language>"
    Examples:
      | language  |
      | English   |
      | Arabic    |
      | Turkish   |
      | Russian   |
      | French    |
      | Chinese   |
      | German    |

  @header @ui
  Scenario Outline: Currency dropdown behaviour
    When I open the currency dropdown menu
    Then I should see supported currency options
    When I select the currency option "<currency>"
    Then the currency dropdown should display as "<currency>"
    Examples:
      | currency                |
      | USD - United States     |
      | GBP - United Kingdom    |
      | SAR - Saudi Arabia      |
      | EUR - Germany           |
      | PHP - Philippines       |

  @header @ui
  Scenario Outline: Agents & Customer dropdowns behaviour
    When I open the dropdown "<dropdownLabel>" in the header
    Then I should see the link "<linkText>" in that dropdown "<dropdownLabel>"
    When I click the link "<linkText>" with dropdown "<dropdownLabel>"
    Then I should be directed to the URL "<expectedUrl>"
    Examples:
      | dropdownLabel | linkText | expectedUrl                             |
      | Agents        | login    | https://phptravels.net/login?agent=1     |
      | Agents        | signup   | https://phptravels.net/agent-signup      |
      | Customer      | login    | https://phptravels.net/login             |
      | Customer      | signup   | https://phptravels.net/signup            |

  @header @ui @responsive
  Scenario: Responsive header layout on mobile viewport
    Given I set the viewport to mobile size
    Then the header navigation tabs should collapse and show a menu icon
    When I click the menu icon
    Then I should see available tab links and buttons inside
