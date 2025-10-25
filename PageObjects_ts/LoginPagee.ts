import { type Page, type Locator } from '@playwright/test'

export class LoginPagee {
    page: Page;
    username: Locator;
    password: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
        this.signInButton = page.locator("[value='Login']")
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.signInButton.click()
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = { LoginPagee };