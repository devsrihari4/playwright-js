const { test, request, expect } = require('@playwright/test')
const { API_Utils } = require('./utils/API_Utils')

const payload = { userEmail: 'hari49951@gmail.com', userPassword: '4xE5$aE@5AAeyQ$' }
const orderPayload = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] }
let response;

test.beforeAll('API login', async () => {

    const apiContext = await request.newContext();

    const apiUtils = new API_Utils(apiContext, payload);
    response = await apiUtils.createOrder(orderPayload);
})

test('UI test', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client/')

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause()

})