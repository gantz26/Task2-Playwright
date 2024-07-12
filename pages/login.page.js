const { MainPage } = require('./main.page.js');

const usernameInput = '#username';
const passwordInput = '#password';
const loginButton = '#login-submit';
const loggedUserDiv = '#loggedas';
const flashError = '#flash_error'

class LoginPage extends MainPage {
    constructor(page) {
        super(page);
    }

    async openLoginPage() {
        await super.openUrl('/login');
    }

    async getUsernameInput() {
        return await super.getElement(usernameInput);
    }

    async getPasswordInput() {
        return await super.getElement(passwordInput);
    }

    async getLoginButton() {
        return await super.getElement(loginButton);
    }

    async fillUsername(username) {
        await (await this.getUsernameInput()).fill(username);
    }

    async fillPassword(password) {
        await (await this.getPasswordInput()).fill(password);
    }

    async clickLoginButton() {
        await super.clickElement(loginButton);
    }

    async getLoggedUser() {
        return await super.getElement(loggedUserDiv);
    }

    async getFlashError() {
        return await super.getElement(flashError);
    }

    async login(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = { LoginPage };