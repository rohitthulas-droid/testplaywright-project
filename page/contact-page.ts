import { BasePage } from './base-page';
import { expect, type Page } from '@playwright/test';

export class ContactPage extends BasePage {

    
    readonly firstname= this.page.locator('#first_name');
    readonly lastname=this.page.locator('#last_name');
    readonly emailaddress= this.page.locator('#email');
    readonly subject=this.page.locator("#subject");
    readonly message=this.page.locator("#message");
    readonly submitbtn= this.page.locator("input[value='Send']");

    constructor(page: Page) {
        super(page);
    }
    async contactformsubmission(firstname:string, lastname:string, email:string, subject: string,message:string) {
       
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.emailaddress.fill(email);
        await this.subject.selectOption(subject);
        await this.message.fill(message);
        await this.submitbtn.click();
    }
     async navigate(url: string) {
    await this.page.goto(url);
  }






}

