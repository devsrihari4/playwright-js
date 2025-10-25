class MyCartPage {
    constructor(page) {
        this.checkout = page.locator("text=Checkout");
    }

    async clickCheckout() {
        await this.checkout.click();
    }
}

module.exports = { MyCartPage }