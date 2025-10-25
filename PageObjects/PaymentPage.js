const { expect } = require('@playwright/test');

class PaymentPage {
    constructor(page) {
        this.selectCountry = page.getByPlaceholder('Select Country')
        this.countryDropdownResults = page.locator(".ta-results")
        this.countryButton = this.countryDropdownResults.locator("button")
        this.userEmail = page.locator(".user__name [type='text']").first()
        this.placeOrderButton = page.locator(".action__submit")
    }

    async addPaymentInfoAndPlaceOrder(username) {
        await this.selectCountry.pressSequentially("ind", { delay: 150 })

        await this.countryDropdownResults.waitFor();
        const optionsCount = await this.countryButton.count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.countryDropdownResults.locator("button").nth(i).textContent();
            if (text === " India") {
                await this.countryDropdownResults.locator("button").nth(i).click();
                break;
            }
        }

        await expect(this.userEmail).toHaveText(username);
        await this.placeOrderButton.click();
    }
}

module.exports = { PaymentPage }