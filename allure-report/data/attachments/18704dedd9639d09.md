# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndTest.spec.ts >> End to End functionality - Register, Login, Search, Finding product, adding to cart, checkout
- Location: tests\EndToEndTest.spec.ts:70:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.clear: Target page, context or browser has been closed
Call log:
  - waiting for locator('input-payment-company')

```

# Test source

```ts
  1  | import { Page, Locator } from "@playwright/test";
  2  | 
  3  | export class CheckoutPage {
  4  |     private readonly page:Page;
  5  | 
  6  |     private readonly inputFirstName:Locator;
  7  |     private readonly inputLastName:Locator;
  8  |     private readonly inputCompany:Locator;
  9  |     private readonly inputAddress1:Locator;
  10 |     private readonly inputAddress2:Locator;
  11 |     private readonly inputCity:Locator;
  12 |     private readonly inputPostalCode:Locator;
  13 |     private readonly inputCountry:Locator;
  14 |     private readonly inputState:Locator;
  15 |     private readonly inputBtnContinue:Locator;
  16 |     private readonly txtCheckout:Locator;
  17 | 
  18 |     constructor(page:Page) {
  19 |         this.page = page;
  20 | 
  21 |         this.inputFirstName = page.locator("#input-payment-firstname");
  22 |         this.inputLastName = page.locator("#input-payment-lastname");
  23 |         this.inputCompany = page.locator("#input-payment-company");
  24 |         this.inputAddress1 = page.locator("#input-payment-address-1");
  25 |         this.inputAddress2 = page.locator("#input-payment-address-2");
  26 |         this.inputCity = page.locator("#input-payment-city");
  27 |         this.inputPostalCode = page.locator("#input-payment-postcode");
  28 |         this.inputCountry = page.locator("#input-payment-country");
  29 |         this.inputState = page.locator("#input-payment-zone");
  30 |         this.inputBtnContinue = page.locator("#button-payment-address");
  31 |         this.txtCheckout = page.locator("#content h1");
  32 |     }
  33 | 
  34 |     async enterFirstName(firstName:string):Promise<void> {
  35 |         await this.inputFirstName.clear();
  36 |         await this.inputFirstName.fill(firstName);
  37 |     }
  38 | 
  39 |     async enterLastName(lastName:string):Promise<void> {
  40 |         await this.inputLastName.clear();
  41 |         await this.inputLastName.fill(lastName);
  42 |     }
  43 | 
  44 |     async enterCompanyName(companyName:string):Promise<void> {
> 45 |         await this.inputCompany.clear();
     |                                 ^ Error: locator.clear: Target page, context or browser has been closed
  46 |         await this.inputCompany.fill(companyName);
  47 |     }
  48 | 
  49 |     async enterAddress1(address1:string):Promise<void> {
  50 |         await this.inputAddress1.clear();
  51 |         await this.inputAddress1.fill(address1);
  52 |     }
  53 | 
  54 |     async enterAddress2(address2:string):Promise<void> {
  55 |         await this.inputAddress2.clear();
  56 |         await this.inputAddress2.fill(address2);
  57 |     }
  58 | 
  59 |     async enterCityName(cityName:string):Promise<void> {
  60 |         await this.inputCity.clear();
  61 |         await this.inputCity.fill(cityName);
  62 |     }
  63 | 
  64 |     async enterPostalCode(postalCode:string):Promise<void> {
  65 |         await this.inputPostalCode.clear();
  66 |         await this.inputPostalCode.fill(postalCode);
  67 |     }
  68 | 
  69 |     async selectCountry(country:string):Promise<void> {
  70 |         await this.inputCountry.selectOption(country);
  71 |     }
  72 | 
  73 |     async selectState(state:string):Promise<void> {
  74 |         await this.inputState.selectOption(state);
  75 |     }
  76 | 
  77 |     async clickContinue():Promise<void> {
  78 |         await this.inputBtnContinue.click();
  79 |     }
  80 | 
  81 |     async checkoutPageExisit():Promise<boolean> {
  82 |         const pageURL = this.page.url();
  83 |         const pageTitle = await this.page.title();
  84 | 
  85 |         return (pageURL.includes("/checkout") && pageTitle.match("Checkout")) ? true : false;
  86 |     }
  87 | 
  88 |     async isCheckoutHeadingExist():Promise<boolean> {
  89 |         const checkoutText = await this.txtCheckout.textContent();
  90 | 
  91 |         return (checkoutText == "Checkout") ? true : false;
  92 |     }
  93 | }
```