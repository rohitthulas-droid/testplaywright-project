import { BasePage } from './base-page';
import { expect, type Page } from '@playwright/test';  // IMPORTANT: import Page type

export class LoginPage extends BasePage {

    readonly emailaddress = this.page.locator("#email");
    readonly password = this.page.locator("#password");
    readonly loginbtn=this.page.locator("//input[@value='Login']")
    //readonly loginpageurl=this.page.goto("https://practicesoftwaretesting.com/auth/login");
    

    constructor(page: Page) {

        super(page);
    }

    async login(email: string, password: string) {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    await this.emailaddress.fill(email);
    await this.password.fill(password);
    await this.loginbtn.click();
}

    

}

