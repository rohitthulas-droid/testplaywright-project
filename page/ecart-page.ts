import { BasePage } from './base-page';
import { type Page } from '@playwright/test';

export class EcartPage extends BasePage {
  private readonly mobilePhone =
    this.page.getByRole('link', { name: 'Samsung galaxy s6' });

  private readonly addToCartButton =
    this.page.getByRole('link', { name: 'Add to cart' });

  private readonly placeOrderButton =
    this.page.getByRole('button', { name: 'Place Order' });

  // Order modal fields
  private readonly name = this.page.locator('#name');
  private readonly country = this.page.getByLabel('Country:');
  private readonly city = this.page.getByLabel('City:');
  private readonly creditCard = this.page.getByLabel('Credit card:');
  private readonly month = this.page.getByLabel('Month:');
  private readonly year = this.page.getByLabel('Year:');
  private readonly purchaseButton =
    this.page.getByRole('button', { name: 'Purchase' });

  private readonly successMessage =
    this.page.getByText('Thank you for your purchase!');

  private readonly okButton =
    this.page.getByRole('button', { name: 'OK' });

  constructor(page: Page) {
    super(page);
  }

  async addMobileToCartAndPlaceOrder() {
    await this.goto('https://www.demoblaze.com/');

    await this.mobilePhone.waitFor({ state: 'visible' });
    await this.mobilePhone.click();

    await this.addToCartButton.waitFor({ state: 'visible' });

   
    await this.addToCartButton.click();
     // ✅ Register dialog handler BEFORE click
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });


    await this.goto('https://www.demoblaze.com/cart.html');

    await this.placeOrderButton.waitFor({ state: 'visible' });
    await this.placeOrderButton.click();

    // Fill order form
    await this.name.fill('John Doe');
    await this.country.fill('USA');
    await this.city.fill('New York');
    await this.creditCard.fill('1234 5678 9012 3456');
    await this.month.fill('12');
    await this.year.fill('2025');

    await this.purchaseButton.click();

    // ✅ Assert success before closing modal
    await this.successMessage.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(3000);
    await this.okButton.click();
  }
}
