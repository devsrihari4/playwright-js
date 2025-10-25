const { test, expect } = require('@playwright/test');

// https://rahulshettyacademy.com/angularpractice/shop

// https://rahulshettyacademy.com/loginpagePractise/

test('Browser playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test('Demo test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const userName = page.locator('#userEmail');
    const pwd = page.locator('#userPassword');
    const loginButton = page.locator("#login");
    const title = page.locator('.card-body b')

    await userName.fill('hari49951@gmail.com');
    await pwd.fill('4xE5$aE@5AAeyQ$');
    await loginButton.click();

    // console.log(await title.first().textContent())

    // await page.waitForLoadState('networkidle');
    await title.first().waitFor();
    console.log(await title.allTextContents())

})

test('Page playwright test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const userName = page.locator("#username");
    const pwd = page.locator("#password");
    const signInButton = page.locator("#signInBtn")

    await userName.fill("hari");
    await pwd.fill("learning");
    await signInButton.click();

    const errMsg = page.locator("[style*='block']");
    console.log(await errMsg.textContent());

    await expect(errMsg).toContainText('Incorrect');

    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signInButton.click();

    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(2).textContent());
    const allTitles = await page.locator('.card-body a').allTextContents()
    console.log(allTitles)
});

test('UI controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const pwd = page.locator("#password");
    const signInButton = page.locator("#signInBtn")
    const docLink = page.locator('[href*="documents-request"]');

    await page.locator('select.form-control').selectOption('consult');  // dropdwon
    await page.locator('#usertype').nth(1).click() // radio button
    await page.locator('#okayBtn').click()  // application popup
    await expect(page.locator('#usertype').nth(1)).toBeChecked();
    console.log(await page.locator('#usertype').nth(1).isChecked())
    await page.locator('#terms').click();  // checkbox
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck(); // uncheck
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(docLink).toHaveAttribute('class', 'blinkingText1'); // checking attribute value
});

test('Handling child windows', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const pwd = page.locator("#password");
    const signInButton = page.locator("#signInBtn")
    const docLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        docLink.click()])

    const text = await newPage.locator('.red').textContent()
    console.log(text);

    const arr = text.split('@')[1];
    const email = arr.split(' ')[0]
    await page.locator('#username').fill(email);
    console.log('email: ' + await userName.inputValue());
});
