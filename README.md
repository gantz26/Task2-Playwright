# Summary

This repository contains auto tests for verifying registration, authorization and changing personal data on the [Redmine](https://www.redmine.org/) website.

## Requirements

The next requirements must be completed to run tests:
1. Install [Visual Studio code](https://code.visualstudio.com/)
2. Install [Node.js](https://nodejs.org/en)
3. Create an account on [Mailosaur](https://mailosaur.com/app)

## Steps to install, launch and creating a report

1. Firstly, make a copy of this repository:
```
git clone https://github.com/gantz26/Task2-Playwright.git
```

2. Then, open this folder in Visual Studio Code and install all dependencies:
```
npm ci
```

3. Change the API key and the server ID in the `redmineTests.spec.js` file to your own, which you can copy from the Mailosaur website:
```
const apiKey = 'your API key';
const serverId = 'your server ID';
```

4. To run the tests:
```
npx playwright test
```

5. To generate and view a report:
```
npx allure generate allure-result -o allure-report
npx allure serve allure-results
```