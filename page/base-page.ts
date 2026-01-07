import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async expectUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async type(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async waitForVisible(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }

  async getText(selector: string) {
    return await this.page.textContent(selector);
  }

  async closePage() {
    await this.page.close();
  }

  async closeBrowser() {
    await this.page.context().browser()?.close();
  }
}
