const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../testData/placeOrder.json')));

const { customTest } = require('../testData/test-base')

for (const data of dataset) {
    test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage()
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password)

        await page.locator(".card-body b").first().waitFor();

        const dashboardPage = poManager.getDashboardPage()

        await dashboardPage.searchAndAddProductToCart(data.productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('" + data.productName + "')").isVisible();
        expect(bool).toBeTruthy();

        const myCartPage = poManager.getMyCartPage()
        myCartPage.clickCheckout()

        const paymentPage = poManager.getPaymentPage()
        paymentPage.addPaymentInfoAndPlaceOrder(data.username);


        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);

        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();

        // await page.pause()

    });
}

customTest(`Client App login for`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)

    await page.locator(".card-body b").first().waitFor();

    const dashboardPage = poManager.getDashboardPage()

    await dashboardPage.searchAndAddProductToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
})