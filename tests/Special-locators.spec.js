const { test, expect } = require('@playwright/test');

test('Locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/')

    await page.getByLabel('Check me out if you Love IceCreams!').check();

    await page.getByLabel('Student').check();

    // await page.getByLabel('Email').fill('hari');
    await page.getByLabel('Gender').selectOption('Female')

    await page.locator('[name="bday"]').fill('2029-09-09')
    await page.pause()
})
