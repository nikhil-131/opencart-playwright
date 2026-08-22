# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AddToCart.spec.ts >> validate add to cart functionality
- Location: tests\AddToCart.spec.ts:34:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { Page, expect, test } from "@playwright/test";
  2  | 
  3  | import { HomePage } from "../pages/HomePage";
  4  | import { SearchResultPage } from "../pages/SearchResultPage";
  5  | import { ProductPage } from "../pages/ProductPage";
  6  | import { TestConfig } from "../test.config";
  7  | 
  8  | let homePage:HomePage;
  9  | let searchResultPage:SearchResultPage;
  10 | let productPage:ProductPage;
  11 | 
  12 | let productName:string;
  13 | let brandName:string;
  14 | let productQuantity:string;
  15 | 
  16 | test.beforeEach(async ({page}) => {
  17 |     const config = new TestConfig();
  18 | 
  19 |     await page.goto(config.appURL);
  20 |     productName = config.productName;
  21 |     brandName = config.brandName;
  22 |     productQuantity = config.productQuantity;
  23 | 
  24 |     homePage = new HomePage(page);
  25 |     searchResultPage = new SearchResultPage(page);
  26 |     productPage = new ProductPage(page);
  27 | });
  28 | 
  29 | test.afterEach(async({page}) => {
  30 |     await page.waitForTimeout(2000);
  31 |     await page.close();
  32 | });
  33 | 
  34 | test("validate add to cart functionality", {tag: ["@master", "@sanity", "@regression"]}, async() => {
  35 |     expect(await homePage.homePageExists()).toBeTruthy();
  36 |     await homePage.enterProductName(productName);
  37 |     await homePage.clickSearch();
  38 | 
  39 |     expect(await searchResultPage.isSearchPageExists()).toBe(true);
  40 |     expect(await searchResultPage.searchHeadingExists()).toBeTruthy();
  41 |     await searchResultPage.clickSearchProduct(productName);
  42 | 
  43 |     expect(await productPage.isProductPageExist()).toBeTruthy();
  44 |     expect(await productPage.checkBrandName(brandName)).toBe(true);
  45 |     expect(await productPage.checkProductName(productName)).toBeTruthy();
  46 | 
  47 |     await productPage.enterProductQuantity(productQuantity);
  48 |     await productPage.clickAddToCart();
> 49 |     expect(await productPage.checkSuccessMsg()).toBeTruthy();
     |                                                 ^ Error: expect(received).toBeTruthy()
  50 | });
```