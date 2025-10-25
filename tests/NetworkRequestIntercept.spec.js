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

test('Request intercept', async ({ page }) => {

    //login and go to orders page
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator("button[routerlink*='myorders']").click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b69' })
    )

    await page.locator('button:has-text("View")').first().click()
    await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order')
})