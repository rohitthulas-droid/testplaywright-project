import { BasePage } from './base-page';
import { type Page, expect } from '@playwright/test';

export class ProductPage extends BasePage {

  readonly productLink = this.page.getByRole('link', {  name: 'Combination Pliers'});

  readonly increaseQuantityBtn = this.page.locator('#btn-increase-quantity');

  readonly addToCartBtn = this.page.locator('#btn-add-to-cart');

  readonly carticonclick=this.page.locator("//a[@aria-label='cart']");

  readonly proceedToCheckoutBtn = this.page.getByRole('button', {
    name: 'Proceed to checkout'
  });

  constructor(page: Page) {
    super(page);
  }

  async goToHomePage() {
    await this.goto('https://practicesoftwaretesting.com/');
  }

  async selectProduct() {
    await this.productLink.click();
  }

  async increaseQuantity(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.increaseQuantityBtn.click();
    }
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async proceedToCheckout() {
    await expect(this.proceedToCheckoutBtn).toBeVisible();
    await this.proceedToCheckoutBtn.click();

  }
   async goToCart(){
    await this.carticonclick.click();
   }
}
