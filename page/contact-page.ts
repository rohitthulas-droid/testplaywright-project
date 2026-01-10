import { BasePage } from './base-page';
import { type Page } from '@playwright/test';

export class ContactPage extends BasePage {
  private readonly firstName = this.page.locator('#first_name');
  private readonly lastName = this.page.locator('#last_name');
  private readonly emailAddress = this.page.locator('#email');
  private readonly subject = this.page.locator('#subject');
  private readonly message = this.page.locator('#message');
  private readonly submitButton = this.page.locator("input[value='Send']");

  constructor(page: Page) {
    super(page);
  }

  async submitContactForm(
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string
  ) {
    // Wait for element with extended timeout
    await this.firstName.waitFor({ state: 'visible', timeout: 15000 });

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.emailAddress.fill(email);
    await this.subject.selectOption(subject);
    await this.message.fill(message);
    await this.submitButton.click();
  }
}
