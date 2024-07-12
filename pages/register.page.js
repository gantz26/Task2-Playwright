const { MainPage } = require('./main.page.js');

const userLoginInput = '#user_login';
const passwordInput = '#user_password';
const confirmationInput = '#user_password_confirmation';
const firstNameInput = '#user_firstname';
const lastNameInput = '#user_lastname';
const emailInput = '#user_mail';
const submitButton = 'input[type="submit"]';
const flashNotice = '#flash_notice';
const errorExplanation = '#errorExplanation';

class RegisterPage extends MainPage {
    constructor(page) {
        super(page);
    }

    async openRegisterUrl() {
        await super.openUrl('/account/register');
    }

    async getUserLoginInput() {
        return await super.getElement(userLoginInput);
    }

    async fillUserLogin(login) {
        await (await this.getUserLoginInput()).fill(login);
    }

    async getPasswordInput() {
        return await super.getElement(passwordInput);
    }

    async fillPassword(password) {
        await (await this.getPasswordInput()).fill(password);
    }

    async getConfirmationInput() {
        return await super.getElement(confirmationInput);
    }

    async fillConfirmation(confirmation) {
        await (await this.getConfirmationInput()).fill(confirmation);
    }

    async getFirstNameInput() {
        return await super.getElement(firstNameInput);
    }

    async fillFirstName(firstName) {
        await (await this.getFirstNameInput()).fill(firstName);
    }

    async getLastNameInput() {
        return await super.getElement(lastNameInput);
    }

    async fillLastName(lastName) {
        await (await this.getLastNameInput()).fill(lastName);
    }

    async getEmailInput() {
        return await super.getElement(emailInput);
    }

    async fillEmail(email) {
        await (await this.getEmailInput()).fill(email);
    }

    async getSubmitButton() {
        return await super.getElement(submitButton);
    }

    async clickSubmitButton() {
        return await super.clickElement(submitButton);
    }

    async getFlashNotice() {
        return await super.getElement(flashNotice);
    }

    async getErrorExplanation() {
        return await super.getElement(errorExplanation);
    }

    async register(login, password, confirmation, firstname, lastname, email) {
        await this.fillUserLogin(login);
        await this.fillPassword(password);
        await this.fillConfirmation(confirmation);
        await this.fillFirstName(firstname);
        await this.fillLastName(lastname);
        await this.fillEmail(email);
        await this.clickSubmitButton();
    }
}

module.exports = { RegisterPage };