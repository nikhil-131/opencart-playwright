# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AddToCart.spec.ts >> validate add to cart functionality
- Location: tests\AddToCart.spec.ts:33:5

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
  30 |     await page.close();
  31 | });
  32 | 
  33 | test("validate add to cart functionality", {tag: ["@master", "@sanity", "@regression"]}, async() => {
  34 |     expect(await homePage.homePageExists()).toBeTruthy();
  35 |     await homePage.enterProductName(productName);
  36 |     await homePage.clickSearch();
  37 | 
  38 |     expect(await searchResultPage.isSearchPageExists()).toBe(true);
  39 |     expect(await searchResultPage.searchHeadingExists()).toBeTruthy();
  40 |     await searchResultPage.clickSearchProduct(productName);
  41 | 
  42 |     expect(await productPage.isProductPageExist()).toBeTruthy();
  43 |     expect(await productPage.checkBrandName(brandName)).toBe(true);
  44 |     expect(await productPage.checkProductName(productName)).toBeTruthy();
  45 | 
  46 |     await productPage.enterProductQuantity(productQuantity);
  47 |     await productPage.clickAddToCart();
> 48 |     expect(await productPage.checkSuccessMsg()).toBeTruthy();
     |                                                 ^ Error: expect(received).toBeTruthy()
  49 | });
```