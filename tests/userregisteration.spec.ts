import { test } from 'playwright/test';
import { userregisteration } from '../page/userregistraction-page';
import { expect as playwrightExpect } from 'playwright/test';



test("Test 1 - User Regestration Module", async ({ page }) => {

    const userRegPage = new userregisteration(page);
    await userRegPage.userregisteration();
})

test("Test 2 - Register User with Existing Email Id", async ({ page }) => {

    const userRegPage = new userregisteration(page);
    await userRegPage.userregisteration();
    await playwrightExpect(page.getByText("A customer with this email address already exists.")).toBeVisible();

})







