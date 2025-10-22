import { Locator, Page } from "@playwright/test";
import Base from "../base";

export default class HeaderComponent extends Base {
    private readonly headerComponent: Locator;
    //Logo
    private readonly headerBanner: Locator;
    //tab links
    private readonly headerFlightTabLink: Locator;
    private readonly headerHotelsTabLink: Locator;
    private readonly headerToursTabLink: Locator;
    private readonly headerCarsTabLink: Locator;
    private readonly headerVisaTabLink: Locator;
    private readonly headerBlogsTabLink: Locator;
    //Header buttons
    private readonly headerLanguageDropDownButton: Locator;
    private readonly headerEnglishDropDownLink: Locator;
    private readonly headerArabicDropDownLink: Locator;
    private readonly headerTurkishDropDownLink: Locator;
    private readonly headerRussianDropDownLink: Locator;
    private readonly headerFrenchDropDownLink: Locator;
    private readonly headerChineseDropDownLink: Locator;
    private readonly headerGermanyDropDownLink: Locator;

    private readonly headerCurrencyButton: Locator;
    private readonly headerUSDCurrencyLink: Locator;
    private readonly headerGBPCurrencyLink: Locator;
    private readonly headerSARCurrencyLink: Locator;
    private readonly headerEURCurrencyLink: Locator;
    private readonly headerPHPCurrencyLink: Locator;

    private readonly headerAgentsButton: Locator;
    private readonly headerAgentsLoginLink: Locator;
    private readonly headerAgentsRegisterLink: Locator;

    private readonly headerCustomerButton: Locator;
    private readonly headerCustomerLoginLink: Locator;
    private readonly headerCustomerRegisterLink: Locator;

    private readonly menuToggleButton: Locator;


    constructor(page: Page) {
        super(page);

        this.headerComponent = this.page.getByRole('banner');

        this.headerBanner = this.page.getByRole('banner').getByRole('link', { name: 'logo' });
        this.headerFlightTabLink = this.page.getByRole('link', { name: 'Flights' });
        this.headerHotelsTabLink = this.page.getByRole('link', { name: 'Hotels', exact: true });
        this.headerToursTabLink = this.page.getByRole('link', { name: 'Tours' });
        this.headerCarsTabLink = this.page.getByRole('link', { name: 'Cars', exact: true });
        this.headerVisaTabLink = this.page.getByRole('link', { name: 'Visa' });
        this.headerBlogsTabLink = this.page.getByRole('link', { name: 'Blogs' });

        this.headerLanguageDropDownButton = this.page.getByRole('button', { name: /english|arabic|turkish|russian|french|chinese|german/i });
        this.headerEnglishDropDownLink = this.page.getByRole('link', { name: 'flag English' });
        this.headerArabicDropDownLink = this.page.getByRole('link', { name: 'flag Arabic' });
        this.headerTurkishDropDownLink = this.page.getByRole('link', { name: 'flag Turkish' });
        this.headerRussianDropDownLink = this.page.getByRole('link', { name: 'flag Russian' });
        this.headerFrenchDropDownLink = this.page.getByRole('link', { name: 'flag French' });
        this.headerChineseDropDownLink = this.page.getByRole('link', { name: 'flag Chinese' });
        this.headerGermanyDropDownLink = this.page.getByRole('link', { name: 'flag Germany' });

        this.headerCurrencyButton = this.page.getByRole('button', { name: 'USD' });
        this.headerUSDCurrencyLink = this.page.getByRole('link', { name: 'flag USD - United States' });
        this.headerGBPCurrencyLink = this.page.getByRole('link', { name: 'flag GBP - United Kingdom' });
        this.headerSARCurrencyLink = this.page.getByRole('link', { name: 'flag SAR - Saudi Arabia' });
        this.headerEURCurrencyLink = this.page.getByRole('link', { name: 'flag EUR - Germany' });
        this.headerPHPCurrencyLink = this.page.getByRole('link', { name: 'flag PHP - Philippines' });

        this.headerAgentsButton = this.page.getByRole('button', { name: 'Agents' });
        this.headerAgentsLoginLink = this.page.getByRole('link', { name: 'Login' });
        this.headerAgentsRegisterLink = this.page.getByRole('link', { name: 'Signup' });

        this.headerCustomerButton = this.page.getByRole('button', { name: 'Customer' });
        this.headerCustomerLoginLink = this.page.getByRole('link', { name: 'Login' });
        this.headerCustomerRegisterLink = this.page.getByRole('link', { name: 'Signup' });

        this.menuToggleButton = this.page.getByRole("button", { name: "Toggle navigation" });
    }

    // 🧭 ========== GETTERS ==========
    get header() { return this.headerComponent; }
    // get logo() { return this.headerBanner; }

    // Tabs
    get flightTab() { return this.headerFlightTabLink; }
    get hotelsTab() { return this.headerHotelsTabLink; }
    get toursTab() { return this.headerToursTabLink; }
    get carsTab() { return this.headerCarsTabLink; }
    get visaTab() { return this.headerVisaTabLink; }
    get blogsTab() { return this.headerBlogsTabLink; }

    // Language
    // get languageDropdown() { return this.headerLanguageDropDownButton; }
    get englishLanguage() { return this.headerEnglishDropDownLink; }
    get arabicLanguage() { return this.headerArabicDropDownLink; }
    get turkishLanguage() { return this.headerTurkishDropDownLink; }
    get russianLanguage() { return this.headerRussianDropDownLink; }
    get frenchLanguage() { return this.headerFrenchDropDownLink; }
    get chineseLanguage() { return this.headerChineseDropDownLink; }
    get germanLanguage() { return this.headerGermanyDropDownLink; }

    // Currency
    // get currencyDropdown() { return this.headerCurrencyButton; }
    get usdCurrency() { return this.headerUSDCurrencyLink; }
    get gbpCurrency() { return this.headerGBPCurrencyLink; }
    get sarCurrency() { return this.headerSARCurrencyLink; }
    get eurCurrency() { return this.headerEURCurrencyLink; }
    get phpCurrency() { return this.headerPHPCurrencyLink; }

    // Agents
    get agentsDropdown() { return this.headerAgentsButton; }
    get agentsLogin() { return this.headerAgentsLoginLink; }
    get agentsRegister() { return this.headerAgentsRegisterLink; }

    // Customer
    get customerDropdown() { return this.headerCustomerButton; }
    get customerLogin() { return this.headerCustomerLoginLink; }
    get customerRegister() { return this.headerCustomerRegisterLink; }

    get menuToggleBtn() { return this.menuToggleButton;}

    // 🖱️ ========== ACTIONS ==========
    // async clickLogo() { await this.logo.click(); }

    // Tabs
    async clickFlightsTab() { await this.flightTab.click(); }
    async clickHotelsTab() { await this.hotelsTab.click(); }
    async clickToursTab() { await this.toursTab.click(); }
    async clickCarsTab() { await this.carsTab.click(); }
    async clickVisaTab() { await this.visaTab.click(); }
    async clickBlogsTab() { await this.blogsTab.click(); }

    // Language
    // async openLanguageDropdown() { await this.languageDropdown.click(); }
    // async selectLanguage(language: 'English' | 'Arabic' | 'Turkish' | 'Russian' | 'French' | 'Chinese' | 'German') {
    //     await this.openLanguageDropdown();
    //     const map = {
    //         English: this.englishLanguage,
    //         Arabic: this.arabicLanguage,
    //         Turkish: this.turkishLanguage,
    //         Russian: this.russianLanguage,
    //         French: this.frenchLanguage,
    //         Chinese: this.chineseLanguage,
    //         German: this.germanLanguage,
    //     };
    //     await map[language].click();
    // }

    // Currency
    // async openCurrencyDropdown() { await this.currencyDropdown.click(); }
    // async selectCurrency(currency: 'USD' | 'GBP' | 'SAR' | 'EUR' | 'PHP') {
    //     await this.openCurrencyDropdown();
    //     const map = {
    //         USD: this.usdCurrency,
    //         GBP: this.gbpCurrency,
    //         SAR: this.sarCurrency,
    //         EUR: this.eurCurrency,
    //         PHP: this.phpCurrency,
    //     };
    //     await map[currency].click();
    // }

    // Agents
    async openAgentsDropdown() { await this.agentsDropdown.click(); }
    async clickAgentsLogin() {
        await this.openAgentsDropdown();
        await this.agentsLogin.click();
    }
    async clickAgentsRegister() {
        await this.openAgentsDropdown();
        await this.agentsRegister.click();
    }

    // Customer
    async openCustomerDropdown() { await this.customerDropdown.click(); }
    async clickCustomerLogin() {
        await this.openCustomerDropdown();
        await this.customerLogin.click();
    }
    async clickCustomerRegister() {
        await this.openCustomerDropdown();
        await this.customerRegister.click();
    }

    // ================== GENERIC LOCATORS ==================
    get logo(): Locator {
        return this.header.getByRole("link", { name: /logo/i });
    }

    get navigationTabs(): Locator {
        return this.header.locator("nav a");
    }

    get languageDropdown(): Locator {
        return this.header.getByRole("button", { name: /english|arabic|turkish|russian|french|chinese|german/i });
    }

    get currencyDropdown(): Locator {
        return this.header.getByRole("button", { name: /usd|gbp|sar|eur|php/i });
    }

    // get agentsDropdown(): Locator {
    //     return this.header.getByRole("button", { name: /agents/i });
    // }

    // get customerDropdown(): Locator {
    //     return this.header.getByRole("button", { name: /customer/i });
    // }

    // ================== DYNAMIC ELEMENTS ==================
    getTabByName(tabName: string): Locator {
        return this.header.getByRole("link", { name: new RegExp(`^${tabName}$`, "i") });
    }

    getLanguageOption(language: string): Locator {
        return this.page.getByRole("link", { name: new RegExp(`flag ${language}`, "i") });
    }

    getCurrencyOption(currency: string): Locator {
        return this.page.getByRole("link", { name: new RegExp(`flag ${currency}`, "i") });
    }

    getDropdownLink(dropdown: "Agents" | "Customer", linkName: string): Locator {
        return this.header.locator(`a:has-text("${linkName}")`);
    }

    // ================== ACTIONS ==================
    async clickLogo() {
        await this.logo.click();
    }

    async clickTab(tabName: string) {
        await this.getTabByName(tabName).click();
    }

    async openLanguageDropdown() {
        await this.languageDropdown.click();
    }

    async selectLanguage(language: string) {
        await this.openLanguageDropdown();
        await this.getLanguageOption(language).click();
    }

    async openCurrencyDropdown() {
        await this.currencyDropdown.click();
    }

    async selectCurrency(currency: string) {
        await this.openCurrencyDropdown();
        await this.getCurrencyOption(currency).click();
    }

    async openDropdown(dropdown: "Agents" | "Customer") {
        if (dropdown === "Agents") await this.agentsDropdown.click();
        else await this.customerDropdown.click();
    }

    async clickDropdownLink(dropdown: "Agents" | "Customer", linkText: string) {
        await this.openDropdown(dropdown);
        await this.getDropdownLink(dropdown, linkText).click();
    }
}