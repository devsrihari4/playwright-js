import { LoginPagee } from './LoginPagee'
import { DashboardPage } from './DashboardPage'
import { MyCartPage } from './MyCartPage'
import { PaymentPage } from './PaymentPage'

import { type Page, type Locator } from '@playwright/test'

export class POManager {
    page: Page;
    loginPage: LoginPagee
    dashboardPage: DashboardPage
    paymentPage: PaymentPage
    myCartPage: MyCartPage
    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPagee(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.myCartPage = new MyCartPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getPaymentPage() {
        return this.paymentPage
    }

    getMyCartPage() {
        return this.myCartPage
    }
}

module.exports = { POManager }