Feature: Ecommerce validations
Scenario: Placing the order

Given I log into Ecommerce application with "hari49951@gmail.com" and "4xE5$aE@5AAeyQ$"
When I add product "ZARA COAT 3" to the cart
Then product "ZARA COAT 3" is displayed in the cart
When I enter payment info and place the order
Then Order is present in the order history