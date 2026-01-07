import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class userregisteration extends BasePage {

    readonly registerationpage = this.page.goto("https://practicesoftwaretesting.com/auth/register");
    readonly firstname =this.page.locator("#first_name");
    readonly lastname =this.page.locator("#last_name");
    readonly dob= this.page.locator("#dob");
    readonly street=this.page.locator("#street");
    readonly postcode =this.page.locator("#postal_code");
    readonly city=this.page.locator("#city");
    readonly state= this.page.locator("#state");
    readonly country=this.page.locator("#country");
    readonly phone=this.page.locator("#phone");
    readonly email=this.page.locator("#email");
    readonly password= this.page.locator("#password");
    readonly registerbtn=this.page.locator("//button[normalize-space()='Register']");


    constructor(page: Page) {
        super(page);
    }

    async userregisteration(){
        await this.registerationpage;
        await this.firstname.fill("John");
        await this.lastname.fill("Doe");
        await this.dob.fill("1990-11-01");
        await this.street.fill("123 Main St");
        await this.postcode.fill("12345");
        await this.city.fill("Kollam");
        await this.state.fill("Kerala");
        await this.country.selectOption("India");
        await this.phone.fill("9686523569");
        await this.email.fill("dummy@aol.com");
        await this.password.fill("Change_Me@8086235819");
        await this.registerbtn.click();
    }























}