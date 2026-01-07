import { test } from 'playwright/test';
import { expect } from 'playwright/test';
import { ContactPage } from '../page/contact-page';
import { contactFormData } from '../config/contact.config';



test('Test 1 -  Conatct detail submission', async ({ page }) => {
    const contactpage = new ContactPage(page);
    await contactpage.navigate(contactFormData.url);
    await contactpage.contactformsubmission
        (
            contactFormData.firstName,
            contactFormData.lastName,
            contactFormData.email,
            contactFormData.subject,
            contactFormData.message
        );

    await expect(page.getByText('Thanks for your message! We will contact you shortly.')).toBeVisible();
});
