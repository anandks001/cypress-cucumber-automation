# About-you-Automation-task

I have listed some `Business Critical features` based on my experience:
* Search - Allow user to search products based on different parameters
* Product catalog/category - Product categories with good navigation flow
* Custom filter - Enable users to find product based on custom filters
* Product overview - Extensive product details with reviews & QA
* Shopping cart - Provide quick summary of the product and enable smooth checkout
* checkout - safe payment processing and allow user to set default payment method

Given task I have managed to touch above features part of automation
* Used iPhone useragent to simulate mobile look & feel (Please refer the `cypress.config.js` )
* Created Functional & Visual tests (visual test snapshots are available in `cypress/snapshots/*`)
* A lot of room for improvements in the test structure and tests
Please let me know if you have questions, happy to discuss further!

## Setup:
* Tests are developed in Cypress v10 using Cucumber plugin
* Test scenarios are in the `cypress/e2e/shopping.feature`
* Step definitions are in the `cypress/support/step_definitions/*.js`
* Page selectors are in the `./constants/*` directory (Ideally this is not required when automation code is part of product repo)
* Test data are in the `./fixtures/*.json`

## Run tests:
* `npm i` to install the project dependencies
* `npm run test` to Runs test

## Test Reports:
* Mocha Test results will be available in `cypress/reports/index.html` directory

## Observations
* Sometimes tests are failing due to application error `uncaught:exception` - Cannot read properties of undefined (reading'TenantFeatures')
* Shopping basket layout and locators are different for each run.  Please refer the screens in `cypress/issues/*.png`