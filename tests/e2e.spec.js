const { test, expect } = require('@playwright/test');

test('e2e flow', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const userName = page.locator('#userEmail');
    const pwd = page.locator('#userPassword');
    const loginButton = page.locator("#login");
    const title = page.locator('.card-body b')

    const product = page.locator('.card-body')
    const cart = page.locator('[routerlink*="cart"]');

    const productName = 'ZARA COAT 3';

    await userName.fill('hari49951@gmail.com');
    await pwd.fill('4xE5$aE@5AAeyQ$');
    await loginButton.click();

    const count = await product.count()


    for (let i = 0; i < count; ++i) {
        if (await product.nth(i).locator('b').textContent() === productName) {
            await product.nth(i).locator('text= Add To Cart').click();
            await page.waitForTimeout(3000); // Wait for 2 seconds (use with caution)
            break;
        }
    }

    await cart.click();

    await page.locator("div li").first().waitFor();

    const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isProductVisible).toBeTruthy();


    await page.locator('text=Checkout').click();

    await page.getByRole('textbox').nth(1).fill('666')

    await page.getByRole('textbox').nth(2).fill('Hari')

    await page.locator('input[name="coupon"]').fill('rahul')
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind', { delay: 150 })

    const results = await page.locator('.ta-results')
    await results.waitFor()

    const optionsCount = await results.locator('button').count()
    for (let i = 0; i < optionsCount; ++i) {
        let text = await results.locator('button').nth(i).textContent();
        if (test === ' India') {
            await results.locator('button').nth(i).click()
        }
    }

    // await page.pause();
})