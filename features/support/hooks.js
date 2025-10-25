const { Before, After, AfterStep } = require('@cucumber/cucumber')
const { POManager } = require('../../PageObjects/POManager');
const playwright = require('@playwright/test');

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false })
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new POManager(this.page)
})

After(async function () {
    await this.page.close()
})

AfterStep(async function ({ result }) {
    await this.page.screenshot({path: 'screenshot43.png'})
})