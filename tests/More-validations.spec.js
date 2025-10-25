const { test, expect } = require('@playwright/test')

test('validations', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()

})

test('Popups', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#confirmbtn').click()
    page.on('dialog', dialog => dialog.accept())

    await page.locator('#mousehover').hover()

    await page.getByText('Top').click()

    await page.pause()

})

test('iframes', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const iframe = page.frameLocator('#courses-iframe')
    await iframe.locator('li a[href="lifetime-access"]:visible').click()
    const count = await iframe.locator('.text h2').textContent()
    console.log('count:' + count.split(' ')[1])
})

test.only('screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#displayed-text').screenshot({ path: 'partial-screenshot.png' })
    await page.locator('#hide-textbox').click()
    await page.screenshot({ path: 'screenshot.png' })
    await expect(page.locator('#displayed-text')).toBeHidden()
})