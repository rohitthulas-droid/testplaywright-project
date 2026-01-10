import { BasePage } from './base-page';
import { type Page } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly emailAddress = this.page.locator('#email');
  private readonly password = this.page.locator('#password');
  private readonly loginButton = this.page.locator("input[value='Login']");

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    // Use BasePage navigation with faster load strategy
    await this.goto('https://practicesoftwaretesting.com/auth/login', { 
      waitUntil: 'domcontentloaded'  // Faster than networkidle
    });

    // Wait for element with extended timeout
    await this.emailAddress.waitFor({ state: 'visible', timeout: 15000 });

    await this.emailAddress.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
