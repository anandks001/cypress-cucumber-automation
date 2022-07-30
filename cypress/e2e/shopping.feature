Feature: Shopping
    As a guest user
    I want to search and filter the products
    And add a product to basket and whish list

Scenario: Open about-you web app
    When user opens about-you mobile website
    Then landing page is displayed

Scenario: Search for an product
    Given app home page is displayed
    When the search phrase “running shoes" is entered
    Then results for “running shoes" are shown

Scenario: Set filters in the product category
    Given the filter page is displayed
    When the user selects color filter
    And selects size filter
    And selects brand filter
    And the user click on show products
    Then results for applied filters are show
    And filter count displayed accordingly

Scenario: See product details
    Given the user searched for a product
    When the user click on the product
    Then product details page is shown

Scenario: Add a product to the basket
    Given the user in the product details
    And basket is empty
    When adds the first item to the basket
    Then product added to the basket
    And basket product count shown in header

Scenario: Add a product to the wish list
    Given the user in the product details
    And whish list is empty
    When adds the first item to the wish list
    Then product added to the wish list
    And whish list product count shown in header

