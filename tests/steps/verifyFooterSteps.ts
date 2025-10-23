import { expect, Then, When, Given } from "../../fixtures/pageFixtures";

//
// 🧭 Ensure Footer Visibility
//
Then(
  "I should see the footer banner and the banner content",
  async function ({ footerComponent, page }) {
    // Scroll to footer to ensure visibility
    // await page.evaluate(() => {
    //   window.scrollTo(0, document.body.scrollHeight);
    // });
    // await page.waitForTimeout(500);

    await expect(footerComponent.getBanner()).toBeVisible();
    await expect(footerComponent.getBannerContent()).toBeVisible();
  }
);

//
// 🔗 Footer App Store Buttons
//
Then(
  "the footer should contain the Playstore button and the Apple Store button",
  async function ({ footerComponent }) {
    await expect(footerComponent.getPlayStore()).toBeVisible();
    await expect(footerComponent.getAppleStore()).toBeVisible();
  }
);

//
// 🔗 Footer Links Visibility
//
Then(
  "the footer should contain supported links",
  async function ({ footerComponent }) {
    await expect(footerComponent.getAboutUs()).toBeVisible();
    await expect(footerComponent.getPrivacyPolicy()).toBeVisible();
    await expect(footerComponent.getFileClaim()).toBeVisible();
    await expect(footerComponent.getContactUs()).toBeVisible();
    await expect(footerComponent.getBecomeSupplier()).toBeVisible();
    await expect(footerComponent.getCareersAndJobs()).toBeVisible();
    await expect(footerComponent.getTermsOfUse()).toBeVisible();
    await expect(footerComponent.getFaq()).toBeVisible();
    await expect(footerComponent.getHowToBook()).toBeVisible();
    await expect(footerComponent.getCookiesPolicy()).toBeVisible();
    await expect(footerComponent.getBookingTips()).toBeVisible();
  }
);

//
// 📰 Newsletter Section Visibility
//
Then(
  "the footer should contain the newsletter logo",
  async function ({ footerComponent }) {
    await expect(footerComponent.getNewsletterLogo()).toBeVisible();
  }
);

Then(
  "the footer should contain the newsletter phone number, email, and contact link",
  async function ({ footerComponent }) {
    await expect(footerComponent.getNewsletterPhone()).toBeVisible();
    await expect(footerComponent.getNewsletterEmailLink()).toBeVisible();
    await expect(footerComponent.getNewsletterContactLink()).toBeVisible();
  }
);

Then(
  "the footer should contain the newsletter name and email input fields",
  async function ({ footerComponent }) {
    await expect(footerComponent.getNewsletterNameInput()).toBeVisible();
    await expect(footerComponent.getNewsletterEmailInput()).toBeVisible();
  }
);

Then(
  "the footer should contain the newsletter signup button",
  async function ({ footerComponent }) {
    await expect(footerComponent.getNewsletterSignupButton()).toBeVisible();
  }
);

//
// 🧭 Verify Playstore / Apple Store Redirections
//
When(
  "I select the button {string} in the footer",
  async function ({ footerComponent }, buttonName: string) {
    switch (buttonName.toLowerCase()) {
      case "playstore":
        await footerComponent.getPlayStore().click();
        break;
      case "apple store":
        await footerComponent.getAppleStore().click();
        break;
      default:
        throw new Error(`Unknown button: ${buttonName}`);
    }
  }
);

Then(
  "I should be directed to a new tab with expected URL {string}",
  async function ({ page }, expectedUrl: string) {
    const context = page.context();
    const newPagePromise = context.waitForEvent("page");

    await page.waitForTimeout(500);
    const newPage = await newPagePromise;

    await newPage.waitForLoadState("load");
    expect(newPage.url()).toContain(expectedUrl);
    await newPage.close();
  }
);

//
// 🔗 Footer Link Navigation
//
When(
  "I select the link {string} in the footer",
  async function ({ footerComponent }, linkName: string) {
    switch (linkName.toLowerCase()) {
      case "about us":
        await footerComponent.getAboutUs().click();
        break;
      case "privacy policy":
        await footerComponent.getPrivacyPolicy().click();
        break;
      case "file a claim":
        await footerComponent.getFileClaim().click();
        break;
      case "contact us":
        await footerComponent.getContactUs().click();
        break;
      case "become a supplier":
        await footerComponent.getBecomeSupplier().click();
        break;
      case "careers and jobs":
        await footerComponent.getCareersAndJobs().click();
        break;
      case "terms of use":
        await footerComponent.getTermsOfUse().click();
        break;
      case "faq":
        await footerComponent.getFaq().click();
        break;
      case "how to book":
        await footerComponent.getHowToBook().click();
        break;
      case "cookies policy":
        await footerComponent.getCookiesPolicy().click();
        break;
      case "booking tips":
        await footerComponent.getBookingTips().click();
        break;
      default:
        throw new Error(`Unknown footer link: ${linkName}`);
    }
  }
);

Then(
  "I should be redirected to the expected URL {string}",
  async function ({ page }, expectedUrl: string) {
    await page.waitForLoadState("load");
    expect(page.url()).toContain(expectedUrl);
    await page.goBack();
  }
);

//
// 📰 Newsletter Subscription Actions
//
Given(
  "I enter name {string} in the newsletter name input field",
  async function ({ footerComponent }, name: string) {
    await footerComponent.getNewsletterNameInput().fill(name);
  }
);

Given(
  "I enter valid email {string} in the newsletter email input field",
  async function ({ footerComponent }, email: string) {
    // Generate a unique email using timestamp
    const timestamp = Date.now();
    const [localPart, domain] = email.split("@");
    const dynamicEmail = `${localPart}+${timestamp}@${domain}`;

    await footerComponent.getNewsletterEmailInput().fill(dynamicEmail);
  }
);

Given(
  "I enter invalid email {string} in the newsletter email input field",
  async function ({ footerComponent }, email: string) {
    await footerComponent.getNewsletterEmailInput().fill(email);
  }
);

// Given(
//   "I leave name empty in the newsletter name input field",
//   async function ({ footerComponent }) {
//     // await footerComponent.getNewsletterNameInput().fill("");
//   }
// );

// Given(
//   "I leave email empty in the newsletter email input field",
//   async function ({ footerComponent }) {
//     // await footerComponent.getNewsletterEmailInput().fill("");
//   }
// );

When(
  "I select the signup newsletter button",
  async function ({ footerComponent }) {
    await footerComponent.getNewsletterSignupButton().click();
  }
);

Then(
  "I should see a successful submission alert and accept the alert",
  async function ({ page }) {
    const alert = await page.waitForEvent("dialog");
    expect(alert.message().toLowerCase()).toContain("success");
    await alert.accept();
  }
);

Then(
  "I should see a email existed submission alert and accept the alert",
  async function ({ page }) {
    const alert = await page.waitForEvent("dialog");
    expect(alert.message().toLowerCase()).toContain("email");
    await alert.accept();
  }
);

// Then(
//   "I should see a missing email submission alert and accept the alert",
//   async function ({ page }) {
//     const alert = await page.waitForEvent("dialog");
//     expect(alert.message().toLowerCase()).toContain("email");
//     await alert.accept();
//   }
// );

// Then(
//   "I should see a missing name submission alert and accept the alert",
//   async function ({ page, footerComponent }) {
//     const alert = await page.waitForEvent("dialog");
//     expect(alert.message().toLowerCase()).toContain("name");
//     await alert.accept();
//   }
// );
