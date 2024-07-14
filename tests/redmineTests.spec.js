// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const MailosaurClient = require('mailosaur');
const { RegisterPage } = require('../pages/register.page.js');
const { LoginPage } = require('../pages/login.page.js');
const { AccountPage } = require('../pages/account.page.js');
const helper = require('../helpers/helper.js');

let randomFirstName;
let randomLastName;
let randomLogin;
let randomPassword;
let randomEmail;

let registerPage;
let loginPage;

const apiKey = 'IzjuOPE270WPatf4ImoTPMNfLMNWN2Cn';
const serverId = 'g0fsdxjm';
const mailosaur = new MailosaurClient(apiKey);

test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.openRegisterUrl();
            
    randomFirstName = faker.person.firstName();
    randomLastName = faker.person.lastName();
    randomLogin = faker.internet.userName( { firstName: randomFirstName, lastName: randomLastName });
    randomEmail = faker.internet.email({ firstName: randomFirstName, lastName: randomLastName, provider: serverId + '.mailosaur.net' });
    randomPassword = faker.internet.password({ length: 8 });
});

test.describe('Register page', () => {
    test('register with valid credentials', async ({ page }) => {
        await registerPage.register(randomLogin, randomPassword, randomPassword, randomFirstName, randomLastName, randomEmail);
        await expect(await registerPage.getFlashNotice()).toHaveText(/Account was successfully created.*/);

        const activateLink = await helper.getActivateLink(mailosaur, serverId, randomEmail);
        expect(activateLink).toContain('/activate?token');
        await page.goto(activateLink);
        await expect(await registerPage.getFlashNotice()).toHaveText(/Your account has been activated.*/);
    });

    test('register with an invalid password less than 8 symbols', async () => {
        const invalidPassword = faker.internet.password({ length: 4 });
        const email = faker.internet.email({ firstName: randomFirstName, lastName: randomLastName });
        await registerPage.register(randomLogin, invalidPassword, invalidPassword, randomFirstName, randomLastName, email);
        await expect(await registerPage.getErrorExplanation()).toHaveText(/Password is too short*/);
    })
});

test.describe('Login page', () => {
    test.beforeEach(async ({ page }) => {
        await registerPage.register(randomLogin, randomPassword, randomPassword, randomFirstName, randomLastName, randomEmail);
        const activateLink = await helper.getActivateLink(mailosaur, serverId, randomEmail);
        expect(activateLink).toContain('/activate?token');
        await page.goto(activateLink);
        await expect(await registerPage.getFlashNotice()).toHaveText(/Your account has been activated.*/);

        loginPage = new LoginPage(page);
        await loginPage.openLoginPage();
    });

    test('login with valid credentials', async () => {
        await loginPage.login(randomLogin, randomPassword);
        await expect(await loginPage.getLoggedUser()).toHaveText(/Logged in as */);
    });

    test('login with an invalid password', async () => {
        const invalidPassword = faker.internet.password({ length: 8 });
        await loginPage.login(randomLogin, invalidPassword);
        await expect(await loginPage.getFlashError()).toHaveText('Invalid user or password');
    });

    test('change the first name on the my account page', async ({ page }) => {
        await loginPage.login(randomLogin, randomPassword);
        await expect(await loginPage.getLoggedUser()).toHaveText(/Logged in as */);
        
        const newFirstName = faker.person.firstName();
        const accountPage = new AccountPage(page);
        await accountPage.openAccountPage();
        await accountPage.fillFirstName(newFirstName);
        await accountPage.clickSavebutton();
        await expect(await accountPage.getFirstNameInput()).toHaveValue(newFirstName);
        await expect(await accountPage.getFlashNotice()).toHaveText('Account was successfully updated.');
    });
});