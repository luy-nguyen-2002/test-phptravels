import { Locator, Page } from "@playwright/test";
import Base from "../base";

export default class FooterComponent extends Base {
    //footer banner
    private readonly footerBanner: Locator;
    private readonly playStoreButton: Locator;
    private readonly appleStoreButton: Locator;
    private readonly footerBannerContent: Locator;
    //Footer Links
    private readonly footerAboutUsLink: Locator;
    private readonly footerPrivacyPolicyLink: Locator;
    private readonly footerFileClaimLink: Locator;
    private readonly footerContactUsLink: Locator;
    private readonly footerBecomeSupplierLink: Locator;
    private readonly footerCareersAndJobsLink: Locator;
    private readonly footerTermsOfUseLink: Locator;
    private readonly footerFaqLink: Locator;
    private readonly footerHowToBookLink: Locator;
    private readonly footerCookiesPolicyLink: Locator;
    private readonly footerBookingTipsLink: Locator;

    //newsletter subscription
    private readonly footerNewsletterLogo: Locator;
    private readonly footerNewsletterPhoneNumber: Locator;
    private readonly footerNewsleetterEmailLink: Locator;
    private readonly footerNewsletterContactLink: Locator;
    private readonly footerNewsletterEmailInput: Locator;
    private readonly footerNewsletterNameInput: Locator;
    private readonly footerNewsletterSignupButton: Locator;
    constructor(page: Page) {
        super(page);

        this.footerBanner = this.page.locator('div').filter({ hasText: 'Playstore App Store Get The' }).first();
        this.playStoreButton = this.footerBanner.getByRole('link', { name: 'Playstore' });
        this.appleStoreButton = this.footerBanner.getByRole('link', { name: 'App Store' });
        this.footerBannerContent = this.footerBanner.getByText('Get The App! Our app has all');

        this.footerAboutUsLink = this.page.getByRole('link', { name: 'about us' });
        this.footerPrivacyPolicyLink = this.page.getByRole('link', { name: 'privacy policy' });
        this.footerFileClaimLink = this.page.getByRole('link', { name: 'file a claim' });
        this.footerContactUsLink = this.page.getByRole('link', { name: 'contact us', exact: true });
        this.footerBecomeSupplierLink = this.page.getByRole('link', { name: 'become a supplier' });
        this.footerCareersAndJobsLink = this.page.getByRole('link', { name: 'careers & jobs' });
        this.footerTermsOfUseLink = this.page.getByRole('link', { name: 'terms of use' });
        this.footerFaqLink = this.page.getByRole('link', { name: 'faq' });
        this.footerHowToBookLink = this.page.getByRole('link', { name: 'how to book' });
        this.footerCookiesPolicyLink = this.page.getByRole('link', { name: 'cookies policy' });
        this.footerBookingTipsLink = this.page.getByRole('link', { name: 'booking tips' });

        this.footerNewsletterLogo = this.page.getByRole('link', { name: 'logo' }).nth(1);
        this.footerNewsletterPhoneNumber = this.page.getByText('+123456789');
        this.footerNewsleetterEmailLink = this.page.getByRole('link', { name: 'email@agency.com' });
        this.footerNewsletterContactLink = this.page.getByRole('link', { name: 'Contact Us', exact: true });
        this.footerNewsletterNameInput = this.page.locator('input[name="name"]');
        this.footerNewsletterEmailInput = this.page.locator('input[name="email"]');
        this.footerNewsletterSignupButton = this.page.getByRole('button', { name: 'Signup Newsletter' });
    }

    // --- 🧭 GETTERS ---
    get banner() { return this.footerBanner; }
    get playStore() { return this.playStoreButton; }
    get appleStore() { return this.appleStoreButton; }
    get bannerContent() { return this.footerBannerContent; }

    // Links
    get aboutUs() { return this.footerAboutUsLink; }
    get privacyPolicy() { return this.footerPrivacyPolicyLink; }
    get fileClaim() { return this.footerFileClaimLink; }
    get contactUs() { return this.footerContactUsLink; }
    get becomeSupplier() { return this.footerBecomeSupplierLink; }
    get careersAndJobs() { return this.footerCareersAndJobsLink; }
    get termsOfUse() { return this.footerTermsOfUseLink; }
    get faq() { return this.footerFaqLink; }
    get howToBook() { return this.footerHowToBookLink; }
    get cookiesPolicy() { return this.footerCookiesPolicyLink; }
    get bookingTips() { return this.footerBookingTipsLink; }

    // Newsletter
    get newsletterLogo() { return this.footerNewsletterLogo; }
    get newsletterPhone() { return this.footerNewsletterPhoneNumber; }
    get newsletterEmailLink() { return this.footerNewsleetterEmailLink; }
    get newsletterContactLink() { return this.footerNewsletterContactLink; }
    get newsletterNameInput() { return this.footerNewsletterNameInput; }
    get newsletterEmailInput() { return this.footerNewsletterEmailInput; }
    get newsletterSignupButton() { return this.footerNewsletterSignupButton; }

    // --- 🖱️ CLICK METHODS ---
    async clickPlayStore() { await this.playStore.click(); }
    async clickAppleStore() { await this.appleStore.click(); }

    async clickAboutUs() { await this.aboutUs.click(); }
    async clickPrivacyPolicy() { await this.privacyPolicy.click(); }
    async clickFileClaim() { await this.fileClaim.click(); }
    async clickContactUs() { await this.contactUs.click(); }
    async clickBecomeSupplier() { await this.becomeSupplier.click(); }
    async clickCareersAndJobs() { await this.careersAndJobs.click(); }
    async clickTermsOfUse() { await this.termsOfUse.click(); }
    async clickFaq() { await this.faq.click(); }
    async clickHowToBook() { await this.howToBook.click(); }
    async clickCookiesPolicy() { await this.cookiesPolicy.click(); }
    async clickBookingTips() { await this.bookingTips.click(); }

    async clickNewsletterLogo() { await this.newsletterLogo.click(); }
    async clickNewsletterEmailLink() { await this.newsletterEmailLink.click(); }
    async clickNewsletterContactLink() { await this.newsletterContactLink.click(); }
    async clickNewsletterSignup() { await this.newsletterSignupButton.click(); }

    // --- ⌨️ ENTER METHODS ---
    async enterNewsletterName(name: string) {
        await this.newsletterNameInput.fill(name);
    }

    async enterNewsletterEmail(email: string) {
        await this.newsletterEmailInput.fill(email);
    }

    async subscribeToNewsletter(name: string, email: string) {
        await this.enterNewsletterName(name);
        await this.enterNewsletterEmail(email);
        await this.clickNewsletterSignup();
    }
}