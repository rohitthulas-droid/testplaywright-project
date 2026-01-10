import { test, expect } from '@playwright/test';
import { ProductPage } from '../page/product-page';
import { GuestLoginPage } from '../page/guestlogin-page';

const isCI = !!process.env.CI;

test.describe('Skipping guest checkout tests in CI', () => {

  test.beforeEach(async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goToHomePage();
    await productPage.selectProduct();
    await productPage.increaseQuantity(2);
    await productPage.addToCart();
    await productPage.goToCart();
    await productPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout/);
  });

  test('Purchase via Cash on Delivery', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithCashOnDelivery();
  });

  test('Purchase via Bank Transfer', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithBankTransfer();
  });

  test('Purchase via Credit Card', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithCreditCard();
  });

  test('Purchase via Gift Card', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithGiftCard();
  });

});
