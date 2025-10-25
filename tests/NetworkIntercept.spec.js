const { test, request, expect } = require('@playwright/test')
const { API_Utils } = require('./utils/API_Utils')

const payload = { userEmail: 'hari49951@gmail.com', userPassword: '4xE5$aE@5AAeyQ$' }
const orderPayload = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] }
let response;
const fakeResonse = { data: [], message: "No Orders" };

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

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {

            const res = await page.request.fetch(route.request());
            const body = JSON.stringify(fakeResonse)

            route.fulfill({
                res,
                body
            })
        })

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    console.log(await page.locator('.mt-4').textContent())
})