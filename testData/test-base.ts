import { test as baseTest } from '@playwright/test'

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    country: string
}

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder: {
            username: "hari49951@gmail.com",
            password: "4xE5$aE@5AAeyQ$",
            productName: "ZARA COAT 3",
            country: "ind"
        }
    }
)