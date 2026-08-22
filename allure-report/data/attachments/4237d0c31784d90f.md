# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndTest.spec.ts >> End to End functionality - Register, Login, Search, Finding product, adding to cart, checkout
- Location: tests\EndToEndTest.spec.ts:70:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('a:has-text(\'Checkout\')') resolved to 3 elements:
    1) <a title="Checkout" href="http://localhost/opencart/upload/index.php?route=checkout/checkout">…</a> aka getByRole('link', { name: ' Checkout' })
    2) <a href="http://localhost/opencart/upload/index.php?route=checkout/checkout">…</a> aka locator('#cart a').filter({ hasText: 'Checkout' })
    3) <a class="btn btn-primary" href="http://localhost/opencart/upload/index.php?route=checkout/checkout">Checkout</a> aka getByRole('link', { name: 'Checkout', exact: true })

Call log:
  - waiting for locator('a:has-text(\'Checkout\')')

```

# Test source

```ts
  1  | import { Page, Locator } from "@playwright/test";
  2  | 
  3  | export class ShopppingCartPage {
  4  |     private readonly page:Page;
  5  | 
  6  |     private readonly shoppingCartHeadingLocator:Locator;
  7  |     private readonly productNameLocator:Locator;
  8  |     private readonly inputQuantityLocator:Locator;
  9  |     private readonly unitPriceLocator:Locator;
  10 |     private readonly netPriceLocator:Locator;
  11 |     private readonly btnContinue:Locator;
  12 | 
  13 |     constructor(page:Page) {
  14 |         this.page = page;
  15 | 
  16 |         this.shoppingCartHeadingLocator = page.locator("#content h1");
  17 |         this.productNameLocator = page.locator(".table tbody:nth-child(2) td:nth-child(2) a");
  18 |         this.inputQuantityLocator = page.locator("input[name='quantity[3]']");
  19 |         this.unitPriceLocator = page.locator(".table tbody:nth-child(2) td:nth-child(5)");
  20 |         this.netPriceLocator = page.locator(".table tbody:nth-child(2) td:nth-child(6)");
  21 |         this.btnContinue = page.locator("a:has-text('Checkout')");
  22 |     }
  23 | 
  24 |     async isShoppingCartExists():Promise<boolean> {
  25 |         const pageURL = this.page.url();
  26 |         const pageTitle = await this.page.title();
  27 | 
  28 |         if(pageURL.includes("/cart") && pageTitle.match("Shopping Cart")) {
  29 |             return true;
  30 |         }
  31 |         return false;
  32 |     }
  33 | 
  34 |     async checkCartHeading() {
  35 |         const shoppingCartHeading = await this.shoppingCartHeadingLocator.textContent();
  36 | 
  37 |         return (shoppingCartHeading?.includes("Shopping Cart")) ? true : false;
  38 |     }
  39 | 
  40 |     async checkProductName(productName:string) {
  41 |         const pName = await this.productNameLocator.textContent();
  42 | 
  43 |         return (pName === productName) ? true : false;
  44 |     }
  45 | 
  46 |     async checkQuantity(quantity:string) {
  47 |         const inputQuantity = await this.inputQuantityLocator.inputValue();
  48 | 
  49 |         return (inputQuantity == quantity) ? true : false;
  50 |     }
  51 | 
  52 |     async checkUnitPrice(unitPrice:string):Promise<boolean> {
  53 |         const uPrice = await this.unitPriceLocator.textContent();
  54 |         console.log("Received Unit Price:", uPrice);
  55 |         console.log("Passed Unit Price:", unitPrice);
  56 | 
  57 |         return (uPrice == unitPrice) ? true : false;
  58 |     }
  59 | 
  60 |     async checkNetPrice(totalPrice:string) {
  61 |         const netPrice = await this.netPriceLocator.textContent();
  62 | 
  63 |         return (netPrice == totalPrice) ? true : false;
  64 |     }
  65 | 
  66 |     async clickCheckout() {
  67 |         try {
> 68 |             await this.btnContinue.click();
     |                                    ^ Error: locator.click: Error: strict mode violation: locator('a:has-text(\'Checkout\')') resolved to 3 elements:
  69 |         }
  70 |         catch (error) {
  71 |             console.log(`While performing click on 'continue', error received: `, error);
  72 |             throw error;
  73 |         }
  74 |     }
  75 | 
  76 | }
```