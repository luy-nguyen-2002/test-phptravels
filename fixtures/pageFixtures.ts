import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import FooterComponent from "../pages/components/footerComponent";
import HeaderComponent from "../pages/components/headerComponent";
import LandingPage from "../pages/landingPage";

/**
 * 🔹 Interface định nghĩa các fixture (page objects)
 */
type pageFixtures = {
    headerComponent: HeaderComponent;
    footerComponent: FooterComponent;
    landingPage: LandingPage;
}

/**
 * 🔹 Extend test fixture gốc để thêm các page object
 */
export const test = base.extend<pageFixtures>({
    headerComponent: async ({ page }, use) => {
        const headerComponent = new HeaderComponent(page);
        await use(headerComponent);
    },
    footerComponent: async ({ page }, use) => {
        const footerComponent = new FooterComponent(page);
        await use(footerComponent);
    },
    landingPage: async({page}, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },
});
/**
 * 🔹 Re-export expect để dùng chung
 */
export { expect };
export const { Given, When, Then } = createBdd(test);
