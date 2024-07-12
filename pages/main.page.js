class MainPage {
    constructor(page) {
        this.page = page;
    }

    async openUrl(url) {
        await this.page.goto(url == undefined ? '/' : url, { waitUntill: 'load' });
    }

    async getElement(element) {
        return await this.page.locator(element);
    }

    async clickElement(element) {
        await (await this.getElement(element)).click();
    }
}

module.exports = { MainPage };