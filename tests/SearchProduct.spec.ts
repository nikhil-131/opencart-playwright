import { Page, expect, test } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { TestConfig } from "../test.config";

let homePage:HomePage;
let searchResultPage:SearchResultPage;
let productName:string;

test.beforeEach(async ({page}) => {
    const config = new TestConfig();
    productName = config.productName;

    page.goto(config.appURL);

    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
});

test.afterEach(async ({page}) => {
    await page.waitForTimeout(2000);
    await page.close();
});

test("validate product search functionality", async() => {
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    expect(await searchResultPage.isSearchPageExists()).toBeTruthy();
    expect(await searchResultPage.searchHeadingExists()).toBe(true);
    await searchResultPage.clickSearchProduct(productName);
});