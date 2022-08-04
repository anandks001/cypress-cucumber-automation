# Cypress Automation

## Setup:
* Tests are developed in Cypress v10 using Cucumber plugin
* Test scenarios are in the `cypress/e2e/shopping.feature`
* Step definitions are in the `cypress/support/step_definitions/*.js`
* Page selectors are in the `./constants/*` directory
* Test data are in the `./fixtures/*.json`

## Run tests:
* `npm i` to install the project dependencies
* `npm run test` to Runs test

## Test Reports:
* Mocha Test results will be available in `cypress/reports/index.html` directory
