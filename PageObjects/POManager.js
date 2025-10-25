const { LoginPagee } = require('./LoginPagee');
const { DashboardPage } = require('./DashboardPage');
const { MyCartPage } = require('./MyCartPage');
const { PaymentPage } = require('./PaymentPage');

class POManager {
    constructor(page) {
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