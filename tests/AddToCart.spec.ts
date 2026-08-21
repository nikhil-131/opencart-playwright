import { Page, expect, test } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";
import { TestConfig } from "../test.config";

let homePage:HomePage;
let searchResultPage:SearchResultPage;
let productPage:ProductPage;

let productName:string;
let brandName:string;
let productQuantity:string;

test.beforeEach(async ({page}) => {
    const config = new TestConfig();

    await page.goto(config.appURL);
    productName = config.productName;
    brandName = config.brandName;
    productQuantity = config.productQuantity;

    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
    productPage = new ProductPage(page);
});

test.afterEach(async({page}) => {
    await page.waitForTimeout(2000);
    await page.close();
});

test("validate add to cart functionality", {tag: ["@master", "@sanity", "@regression"]}, async() => {
    expect(await homePage.homePageExists()).toBeTruthy();
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    expect(await searchResultPage.isSearchPageExists()).toBe(true);
    expect(await searchResultPage.searchHeadingExists()).toBeTruthy();
    await searchResultPage.clickSearchProduct(productName);

    expect(await productPage.isProductPageExist()).toBeTruthy();
    expect(await productPage.checkBrandName(brandName)).toBe(true);
    expect(await productPage.checkProductName(productName)).toBeTruthy();

    await productPage.enterProductQuantity(productQuantity);
    await productPage.clickAddToCart();
    expect(await productPage.checkSuccessMsg()).toBeTruthy();
});