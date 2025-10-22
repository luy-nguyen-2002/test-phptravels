import { expect, Given, Then } from "../../fixtures/pageFixtures";

Given(
    "I navigate to the landing page", async({landingPage}) => {
        await landingPage.navigateToLandingPage();
    } 
)
Given(
    "I wait for the page to load", async({landingPage})=>{
        await landingPage.waitForPageLoad("load");
        await landingPage.waitForPageLoad("domcontentloaded");
        await landingPage.waitForPageLoad("networkidle");
    }
)
Then(
    "I should see the landing page components", async({landingPage})=>{
        await expect(landingPage.getLandingPageHeading()).toBeVisible();
    }
)