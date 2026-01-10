import { BasePage } from './base-page';
import { type Page } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly username = this.page.locator("#username")
  private readonly password = this.page.locator("#password")
  private readonly loginButton = this.page.locator("#submit")

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    // Use BasePage navigation
    await this.goto('https://practicetestautomation.com/practice-test-login/');

    // Explicit readiness check (best practice)
    await this.username.waitFor({ state: 'visible' });

    await this.username.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
