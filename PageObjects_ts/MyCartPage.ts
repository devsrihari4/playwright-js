import { type Page, type Locator } from '@playwright/test'

export class MyCartPage {
    checkout: Locator;

    constructor(page: Page) {
        this.checkout = page.locator("text=Checkout");
    }

    async clickCheckout() {
        await this.checkout.click();
    }
}

module.exports = { MyCartPage }