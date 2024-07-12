const { MainPage } = require('../pages/main.page.js');

const firstNameInput = '#user_firstname';
const saveButton = '.mobile-hide input[type="submit"]'
const flashNotice = '#flash_notice'

class AccountPage extends MainPage {
    constructor(page) {
        super(page);
    }

    async openAccountPage() {
        await super.openUrl('/my/account');
    }

    async getFirstNameInput() {
        return await super.getElement(firstNameInput);
    }
    
    async getSaveButton() {
        return await super.getElement(saveButton);
    }

    async fillFirstName(firstName) {
        await (await this.getFirstNameInput()).fill(firstName);
    }

    async clickSavebutton() {
        await super.clickElement(saveButton);
    }

    async getFlashNotice() {
        return await super.getElement(flashNotice);
    }
}

module.exports = { AccountPage };