import { test } from 'playwright/test';
import { LoginPage } from '../page/login-page';
import { expect } from 'playwright/test';

test.afterEach(async ({ page }) => {
    await page.close();
});


test('Test 1 -  Login with valid Data', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login("dummy@aol.com", "Change_Me@8086235819");
    await expect(page.getByText('John Doe')).toBeVisible();


})

test('Test 2 - Login with Invalid Data', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('dummdy@aol.com', 'Change_Me@');

    await expect(page.getByText('John Doe')).not.toBeVisible();
});


