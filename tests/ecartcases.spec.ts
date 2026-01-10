import { test, expect } from '@playwright/test';
import { EcartPage } from '../page/ecart-page';

test('Test - Add Mobile to Cart', async ({ page }) => {
  const ecartPage = new EcartPage(page);

  await ecartPage.addMobileToCartAndPlaceOrder();
   //Order confirmed
  await expect(page).toHaveURL(/index\.html$/);

  
});
