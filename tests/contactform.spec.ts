import { test, expect } from '@playwright/test';
import { ContactPage } from '../page/contact-page';
import { contactFormData } from '../config/contact.config';

test('Test 1 - Contact detail submission', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Use BasePage navigation
  await contactPage.goto(contactFormData.url);

  await contactPage.submitContactForm(
    contactFormData.firstName,
    contactFormData.lastName,
    contactFormData.email,
    contactFormData.subject,
    contactFormData.message
  );

  await expect(
    page.getByText('Thanks for your message! We will contact you shortly.')
  ).toBeVisible();
});
