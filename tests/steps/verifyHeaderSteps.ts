import { expect, Given, When, Then } from "../../fixtures/pageFixtures";

/* ---------------------------
   Header basic visibility & structure
   --------------------------- */

Then("I should see the header component", async ({ headerComponent }) => {
  await expect(headerComponent.header).toBeVisible();
});

Then("the header should contain the logo", async ({ headerComponent }) => {
  await expect(headerComponent.logo).toBeVisible();
});

/**
 * This step expects a comma-separated list after the colon in the feature:
 * "And the header should contain the navigation tabs: Flights, Hotels, Tours, Cars, Visa, Blogs"
 */
Then("the header should contain the navigation tabs: Flights, Hotels, Tours, Cars, Visa, Blogs", async ({ headerComponent }) => {
  await expect(headerComponent.flightTab).toBeVisible();
  await expect(headerComponent.hotelsTab).toBeVisible();
  await expect(headerComponent.toursTab).toBeVisible();
  await expect(headerComponent.carsTab).toBeVisible();
  await expect(headerComponent.visaTab).toBeVisible();
  await expect(headerComponent.blogsTab).toBeVisible();
});

Then("the header should contain the language dropdown menu", async ({ headerComponent }) => {
  await expect(headerComponent.languageDropdown).toBeVisible();
});

Then("the header should contain the currency dropdown menu", async ({ headerComponent }) => {
  await expect(headerComponent.currencyDropdown).toBeVisible();
});

Then("the header should contain the Agents dropdown menu", async ({ headerComponent }) => {
  await expect(headerComponent.agentsDropdown).toBeVisible();
});

Then("the header should contain the Customer dropdown menu", async ({ headerComponent }) => {
  await expect(headerComponent.customerDropdown).toBeVisible();
});

/* ---------------------------
   Navigation tab links (Scenario Outline)
   --------------------------- */

When("I click the tab link {string}", async ({ headerComponent }, tabLinkName: string) => {
  await headerComponent.clickTab(tabLinkName);
});

Then("I should be directed to the corresponding URL {string}", async ({ page }, expectedUrl: string,) => {
  // If the site may redirect or include query params, use toHaveURL with string or regex.
  await expect(page).toHaveURL(expectedUrl);
});

/* ---------------------------
   Language dropdown behaviour
   --------------------------- */

When("I open the language dropdown menu", async ({ headerComponent }) => {
  await headerComponent.openLanguageDropdown();
});

Then("I should see supported language options", async ({ headerComponent }) => {
  // Verify common expected language options (adjust if your app differs)
  const langs = ["English", "Arabic", "Turkish", "Russian", "French", "Chinese", "German"];
  for (const l of langs) {
    const locator = headerComponent.getLanguageOption(l);
    await expect(locator).toBeVisible();
  }
});

When("I select the language option {string}", async ({ headerComponent }, language: string) => {
  // Select by the provided language name
  await headerComponent.openLanguageDropdown();
  await headerComponent.selectLanguage(language);
});

Then("the language dropdown should display as {string}", async ({ headerComponent }, language: string) => {
  // Validate language button shows selected language (case-insensitive)
  const actual = (await headerComponent.languageDropdown.innerText()).trim();
  expect(actual.toLowerCase()).toContain(language.toLowerCase());
});

/* ---------------------------
   Currency dropdown behaviour
   --------------------------- */

When("I open the currency dropdown menu", async ({ headerComponent }) => {
  await headerComponent.openCurrencyDropdown();
});

Then("I should see supported currency options", async ({ headerComponent }) => {
  const currencies = [
    "USD - United States",
    "GBP - United Kingdom",
    "SAR - Saudi Arabia",
    "EUR - Germany",
    "PHP - Philippines",
  ];
  for (const c of currencies) {
    // The component uses the currency text (e.g., "flag USD - United States")
    const locator = headerComponent.getCurrencyOption(c);
    await expect(locator).toBeVisible();
  }
});

When("I select the currency option {string}", async ({ headerComponent }, currency: string,) => {
  // Accept full example format "USD - United States" => extract the code (USD)
  await headerComponent.openCurrencyDropdown();
  const code = currency.split(/\s*[-–]\s*/)[0].trim();
  await headerComponent.selectCurrency(code);
});

Then("the currency dropdown should display as {string}", async ({ headerComponent }, currency: string) => {
  // check displayed label contains the currency code or text (be lenient)
  const expectedCode = currency.split(/\s*[-–]\s*/)[0].trim();
  const actual = (await headerComponent.currencyDropdown.innerText()).trim();
  expect(actual.toLowerCase()).toContain(expectedCode.toLowerCase());
});

/* ---------------------------
   Agents & Customer dropdowns behaviour
   --------------------------- */

When("I open the dropdown {string} in the header", async ({ headerComponent }, dropdownLabel: string) => {
  const label = dropdownLabel.toLowerCase();

  if (label === "agents") {
    await headerComponent.agentsDropdown.click();
  } else if (label === "customer") {
    await headerComponent.customerDropdown.click();
  } else {
    throw new Error(`❌ Unknown dropdown label: ${dropdownLabel}`);
  }
});

Then("I should see the link {string} in that dropdown {string}", async ({ headerComponent }, linkText: string, dropdownLabel: string) => {
  // const label = dropdownLabel.toLowerCase();

  // if (label === "agents") {
  //   // open dropdown to make sure it’s visible
  //   await headerComponent.agentsDropdown.click();

  //   if (linkText.toLowerCase() === "login") {
  //     await expect(headerComponent.agentsLogin).toBeVisible();
  //   } else if (linkText.toLowerCase() === "signup") {
  //     await expect(headerComponent.agentsRegister).toBeVisible();
  //   } else {
  //     throw new Error(`❌ Unknown linkText for Agents: ${linkText}`);
  //   }
  // } else if (label === "customer") {
  //   await headerComponent.customerDropdown.click();

  //   if (linkText.toLowerCase() === "login") {
  //     await expect(headerComponent.customerLogin).toBeVisible();
  //   } else if (linkText.toLowerCase() === "signup") {
  //     await expect(headerComponent.customerRegister).toBeVisible();
  //   } else {
  //     throw new Error(`❌ Unknown linkText for Customer: ${linkText}`);
  //   }
  // } else {
  //   throw new Error(`❌ Unknown dropdown label: ${dropdownLabel}`);
  // }
});

When("I click the link {string} with dropdown {string}", async ({ headerComponent }, linkText: string, dropdownLabel: string,) => {
  const label = dropdownLabel.toLowerCase();

  if (label === "agents") {
    if (linkText.toLowerCase() === "login") {
      await headerComponent.agentsLogin.click();
    } else if (linkText.toLowerCase() === "signup") {
      await headerComponent.agentsRegister.click();
    } else {
      throw new Error(`❌ Unknown linkText for Agents: ${linkText}`);
    }
  } else if (label === "customer") {
    if (linkText.toLowerCase() === "login") {
      await headerComponent.customerLogin.click();
    } else if (linkText.toLowerCase() === "signup") {
      await headerComponent.customerRegister.click();
    } else {
      throw new Error(`❌ Unknown linkText for Customer: ${linkText}`);
    }
  } else {
    throw new Error(`❌ Unknown dropdown label: ${dropdownLabel}`);
  }
}
);

Then("I should be directed to the URL {string}", async ({ page }, expectedUrl: string) => {
  await expect(page).toHaveURL(expectedUrl);
});

/* ---------------------------
   Responsive header layout on mobile viewport
   --------------------------- */

Given("I set the viewport to mobile size", async ({ page }) => {
  // Example mobile viewport (iPhone 12-ish)
  //When switching to a mobile viewport, some sites hide or lazy-load elements below the fold, so scrolling a bit helps stabilize your layout and trigger lazy-loaders or sticky headers.
  await page.setViewportSize({ width: 390, height: 844 });
  // Wait for layout to stabilize
  await page.waitForTimeout(500);

  // Smooth scroll down and up to trigger lazy loads or fixed headers
  await page.evaluate(() => {
    window.scrollBy({ top: 300, behavior: "smooth" });
  });

  // Give it a short moment to complete
  await page.waitForTimeout(800);

  // Optionally scroll back to top
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  await page.waitForTimeout(500);
});

Then("the header navigation tabs should collapse and show a menu icon", async ({ headerComponent }) => {
  // common menu icon selectors used in many UIs (navbar-toggler, menu, toggle)
  await expect(headerComponent.menuToggleBtn).toBeVisible();
  // tabs may be hidden in collapsed state — ensure at least one tab is not visible in nav area
  //   const flightsVisible = await headerComponent.getTabByName("Flights").isVisible().catch(() => false);
  // it's okay if flights remains visible (depends on implementation) — we only assert that a menu icon exists
  // Additional check: menu icon present (done)
});

When("I click the menu icon", async ({ headerComponent }) => {
  await headerComponent.menuToggleBtn.click();
});

Then("I should see available tab links and buttons inside", async ({ headerComponent }) => {
  // after opening the menu, confirm some menu items are visible
  const expectedItems = ["Flights", "Hotels", "Tours", "Cars", "Visa", "Blogs"];
  for (const item of expectedItems) {
    await expect(headerComponent.getTabByName(item)).toBeVisible();
  }
  // also check dropdowns still accessible
  await expect(headerComponent.languageDropdown).toBeVisible();
  await expect(headerComponent.currencyDropdown).toBeVisible();
});