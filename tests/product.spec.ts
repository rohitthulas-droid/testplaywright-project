import { test, expect } from '@playwright/test';
import { ProductPage } from '../page/product-page';
import { GuestLoginPage } from '../page/guestlogin-page';

test.describe('Guest checkout purchase flows', () => {

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

    //await expect(page.getByText(/order confirmed/i)).toBeVisible();
  });

  test('Purchase via Bank Transfer', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithBankTransfer();

    //await expect(page.getByText(/order confirmed/i)).toBeVisible();
  });

  test('Purchase via Credit Card', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithCreditCard();

    //await expect(page.getByText(/order confirmed/i)).toBeVisible();
  });

  test('Purchase via Gift Card', async ({ page }) => {
    const guestLoginPage = new GuestLoginPage(page);
    await guestLoginPage.guestLoginWithGiftCard();

    //await expect(page.getByText(/order confirmed/i)).toBeVisible();
  });

});
