import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/login-page';

test('Test 1 - Login with valid Data', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('student', 'Password123');
    await expect(page.getByText('Logged In Successfully')).toBeVisible();
  
});

test('Test 2 - Login with Invalid Data', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('sampleee', 'Change_Me@');
  await expect(page.getByText('Logged In Successfully')).not.toBeVisible();
});
