class API_Utils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken() {
        const loginRes = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload });

        // expect(loginRes.ok()).toBeTruthy();
        const loginResJson = await loginRes.json()
        let token = loginResJson.token;
        console.log('token: ' + token)
        return token;
    }

    async createOrder(orderPayload) {
        let res = {};
        res.token = await this.getToken();
        // create order
        const orderRes = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {
                    'Authorization': res.token,
                    'Content-Type': 'application/json'
                },
            })

        const orderResJson = await orderRes.json()
        let orderId = orderResJson.orders[0]
        console.log('orderId: ' + orderId)

        res.orderId = orderId;

        return res;
    }

}

module.exports = { API_Utils };