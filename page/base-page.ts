import { Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation
  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Assertions
  async expectUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  // Actions
  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async type(selector: string, value: string) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async waitForVisible(selector: string) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Utilities
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `./screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async getText(selector: string) {
    return await this.page.locator(selector).textContent();
  }
}
