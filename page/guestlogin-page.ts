import { BasePage } from './base-page';
import { Page, expect } from '@playwright/test';

export class GuestLoginPage extends BasePage {

  // ─────────────────────────────
  // Guest login
  // ─────────────────────────────
  readonly guestLoginLink = this.page.locator("//a[normalize-space()='Continue as Guest']")
  readonly emailInput = this.page.locator('#guest-email');
  readonly firstNameInput = this.page.locator('#guest-first-name');
  readonly lastNameInput = this.page.locator('#guest-last-name');
  readonly continueBtn = this.page.getByRole('button', { name: 'Continue as Guest' });

  // ─────────────────────────────
  // Address & navigation
  // ─────────────────────────────
  readonly proceedToCheckoutBtn = this.page.getByRole('button', {
    name: 'Proceed to checkout',
  });

  readonly streetAddress = this.page.locator('#street');
  readonly city = this.page.locator('#city');
  readonly state = this.page.locator('#state');
  readonly country = this.page.locator('#country');
  readonly postalCode = this.page.locator('#postal_code');

  readonly paymentMethod = this.page.locator('#payment-method');
  readonly confirmBtn = this.page.locator("//button[normalize-space()='Confirm']")

  // ─────────────────────────────
  // Bank transfer
  // ─────────────────────────────
  readonly bankName = this.page.locator('#bank_name');
  readonly accountName = this.page.locator('#account_name');
  readonly accountNumber = this.page.locator('#account_number');

  // ─────────────────────────────
  // Credit card
  // ─────────────────────────────
  readonly creditCardNumber = this.page.locator('#credit_card_number');
  readonly expiryDate = this.page.locator('#expiration_date');
  readonly cvv = this.page.locator('#cvv');
  readonly cardHolderName = this.page.locator('#card_holder_name');

  // ─────────────────────────────
  // Gift card
  // ─────────────────────────────
  readonly giftCardNumber = this.page.locator('#gift_card_number');
  readonly giftValidationCode = this.page.locator('#validation_code');

  // ─────────────────────────────
  // Buy Now Pay Later
  // ─────────────────────────────
  readonly monthlyInstallments = this.page.locator('#monthly_installments');

  constructor(page: Page) {
    super(page);
  }

  // ─────────────────────────────
  // Reusable helpers
  // ─────────────────────────────
  private async fillGuestDetails(email: string) {
    await this.guestLoginLink.click();
    await this.emailInput.fill(email);
    await this.firstNameInput.fill('Test');
    await this.lastNameInput.fill('User');
    await this.continueBtn.click();
  }

  private async proceedFromCart() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.proceedToCheckoutBtn).toBeVisible({ timeout: 60000 });
    await this.proceedToCheckoutBtn.click();
  }

  private async fillAddress() {
    await this.streetAddress.fill('123 Main Street');
    await this.city.fill('New York');
    await this.state.fill('NY');
    await this.country.fill('USA');
    await this.postalCode.fill('10001');
    await this.proceedFromCart();
  }

  // ─────────────────────────────
  // Payment flows
  // ─────────────────────────────

  async guestLoginWithCashOnDelivery() {
    await this.fillGuestDetails('cod@example.com');
    await this.proceedFromCart();
    await this.fillAddress();

    await this.paymentMethod.selectOption('Cash on Delivery');
    await this.confirmBtn.click();
  }

  async guestLoginWithBankTransfer() {
    await this.fillGuestDetails('bank@example.com');
    await this.proceedFromCart();
    await this.fillAddress();

    await this.paymentMethod.selectOption('Bank Transfer');
    await this.bankName.fill('Sample Bank');
    await this.accountName.fill('Test User');
    await this.accountNumber.fill('1234567890');
    await this.confirmBtn.click();
  }

  async guestLoginWithCreditCard() {
    await this.fillGuestDetails('card@example.com');
    await this.proceedFromCart();
    await this.fillAddress();

    await this.paymentMethod.selectOption('Credit Card');
    await this.creditCardNumber.fill('4111111111111111');
    await this.expiryDate.fill('12/30');
    await this.cvv.fill('123');
    await this.cardHolderName.fill('Test User');
    await this.confirmBtn.click();
  }

  async guestLoginWithGiftCard() {
    await this.fillGuestDetails('gift@example.com');
    await this.proceedFromCart();
    await this.fillAddress();

    await this.paymentMethod.selectOption('Gift Card');
    await this.giftCardNumber.fill('GIFTCARD12345');
    await this.giftValidationCode.fill('999');
    await this.confirmBtn.click();
  }

  async guestLoginWithBuyNowPayLater() {
    await this.fillGuestDetails('bnpl@example.com');
    await this.proceedFromCart();
    await this.fillAddress();

    await this.paymentMethod.selectOption('Buy Now Pay Later');
    await this.monthlyInstallments.selectOption('6');
    await this.confirmBtn.click();
  }
}
