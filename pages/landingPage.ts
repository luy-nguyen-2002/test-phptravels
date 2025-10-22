import { Locator, Page } from "@playwright/test";
import Base from "./base";
import HeaderComponent from "./components/headerComponent";
import FooterComponent from "./components/footerComponent";

export default class LandingPage extends Base{
    private readonly header: HeaderComponent;
    private readonly footer: FooterComponent;

    private readonly landingPageHeading: Locator;
    constructor(page: Page){
        super(page);
        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        this.landingPageHeading = this.page.getByText('Your Trip Starts Here!');
    }

    //navigate
    async navigateToLandingPage(): Promise<void> {
        await this.page.goto(process.env.BASE_URL || 'No URL Found');
        await this.page.waitForURL(process.env.BASE_URL || 'No URL Found', { waitUntil: "load" });
    }

    //getters
    getLandingPageHeading(): Locator {
        return this.landingPageHeading;
    }
}