const { When, Given, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../PageObjects/POManager');
const { expect } = require('@playwright/test');

Given('I log into Ecommerce application with {string} and {string}', { timeout: 60 * 1000 }, async function (username, password) {
    // const poManager = new POManager(this.page);

    const loginPage = this.poManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(username, password)
});

When('I add product {string} to the cart', async function (product) {
    this.dashboardPage = this.poManager.getDashboardPage()

    await this.dashboardPage.searchAndAddProductToCart(product);
    await this.dashboardPage.navigateToCart();
});

Then('product {string} is displayed in the cart', async function (product) {
    const myCartPage = this.poManager.getMyCartPage()
    await myCartPage.clickCheckout()

});

When('I enter payment info and place the order', { timeout: 60 * 1000 }, async function () {
    const paymentPage = this.poManager.getPaymentPage()
    await paymentPage.addPaymentInfoAndPlaceOrder('ZARA COAT 3');
});

Then('Order is present in the order history', async function () {
    await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await this.page.locator("button[routerlink*='myorders']").click();
    await this.page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await this.page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
