import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class TransactionPage extends BasePage {

    readonly transactionbtn = this.page.locator("//button[normalize-space()='Transactions']"); 
    readonly backbtn = this.page.locator("//button[normalize-space()='Back']");
    readonly depositamountfield = this.page.locator("input[placeholder='Amount']");
    readonly depositbtn=this.page.locator("//button[normalize-space()='Deposit']");
    readonly deposit=this.page.locator("//button[@type='submit']");
    readonly Withdrawlbtn=this.page.locator("//button[normalize-space()='Withdrawl']");
    readonly amountfield =this.page.locator("//input[@placeholder='amount']");
    readonly withdrawalsubmitbtn=this.page.locator("//button[@type='submit']");

    constructor(page: Page) {
        super(page);
    }

    async clicktransactionbtn() {{

        await this.transactionbtn.click();

    }

    }

    async clickbackbtn() {

        await this.backbtn.click();

    }

    async depositbutton(){
        await this.depositbtn.click();

    }

    async depositclick(){
        await this.deposit.click();
    }

    async withdrawlbutton(){
        await this.Withdrawlbtn.click();
    }

    async withdrawlsumbitbtnclick(){
        await this.withdrawalsubmitbtn.click();
    }


    

}