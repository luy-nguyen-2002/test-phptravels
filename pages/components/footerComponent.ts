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
        this.footerCareersAndJobsLink = this.page.getByRole('link', { name: 'careers and jobs' });
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
    getBanner(): Locator { return this.footerBanner; }
    getPlayStore(): Locator { return this.playStoreButton; }
    getAppleStore(): Locator { return this.appleStoreButton; }
    getBannerContent(): Locator { return this.footerBannerContent; }

    // Links
    getAboutUs(): Locator { return this.footerAboutUsLink; }
    getPrivacyPolicy(): Locator { return this.footerPrivacyPolicyLink; }
    getFileClaim(): Locator { return this.footerFileClaimLink; }
    getContactUs(): Locator { return this.footerContactUsLink; }
    getBecomeSupplier(): Locator { return this.footerBecomeSupplierLink; }
    getCareersAndJobs(): Locator { return this.footerCareersAndJobsLink; }
    getTermsOfUse(): Locator { return this.footerTermsOfUseLink; }
    getFaq(): Locator { return this.footerFaqLink; }
    getHowToBook(): Locator { return this.footerHowToBookLink; }
    getCookiesPolicy(): Locator { return this.footerCookiesPolicyLink; }
    getBookingTips(): Locator { return this.footerBookingTipsLink; }

    // Newsletter
    getNewsletterLogo(): Locator { return this.footerNewsletterLogo; }
    getNewsletterPhone(): Locator { return this.footerNewsletterPhoneNumber; }
    getNewsletterEmailLink(): Locator { return this.footerNewsleetterEmailLink; }
    getNewsletterContactLink(): Locator { return this.footerNewsletterContactLink; }
    getNewsletterNameInput(): Locator { return this.footerNewsletterNameInput; }
    getNewsletterEmailInput(): Locator { return this.footerNewsletterEmailInput; }
    getNewsletterSignupButton(): Locator { return this.footerNewsletterSignupButton; }

    // --- 🧭 UTIL ---
    async scrollToFooter() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(500);
    }
}