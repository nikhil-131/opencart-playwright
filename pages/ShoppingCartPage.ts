import { Page, Locator } from "@playwright/test";

export class ShopppingCartPage {
    private readonly page:Page;

    private readonly shoppingCartHeadingLocator:Locator;
    private readonly productNameLocator:Locator;
    private readonly inputQuantityLocator:Locator;
    private readonly unitPriceLocator:Locator;
    private readonly netPriceLocator:Locator;
    private readonly btnContinue:Locator;

    constructor(page:Page) {
        this.page = page;

        this.shoppingCartHeadingLocator = page.locator("#content h1");
        this.productNameLocator = page.locator(".table tbody:nth-child(2) td:nth-child(2) a");
        this.inputQuantityLocator = page.locator("input[name='quantity[3]']");
        this.unitPriceLocator = page.locator(".table tbody:nth-child(2) td:nth-child(5)");
        this.netPriceLocator = page.locator(".table tbody:nth-child(2) td:nth-child(6)");
        // this.btnContinue = page.locator("a:has-text('Checkout')");
        this.btnContinue = page.locator("div.pull-right a.btn");
    }

    async isShoppingCartExists():Promise<boolean> {
        const pageURL = this.page.url();
        const pageTitle = await this.page.title();

        if(pageURL.includes("/cart") && pageTitle.match("Shopping Cart")) {
            return true;
        }
        return false;
    }

    async checkCartHeading() {
        const shoppingCartHeading = await this.shoppingCartHeadingLocator.textContent();

        return (shoppingCartHeading?.includes("Shopping Cart")) ? true : false;
    }

    async checkProductName(productName:string) {
        const pName = await this.productNameLocator.textContent();

        return (pName === productName) ? true : false;
    }

    async checkQuantity(quantity:string) {
        const inputQuantity = await this.inputQuantityLocator.inputValue();

        return (inputQuantity == quantity) ? true : false;
    }

    async checkUnitPrice(unitPrice:string):Promise<boolean> {
        const uPrice = await this.unitPriceLocator.textContent();
        console.log("Received Unit Price:", uPrice);
        console.log("Passed Unit Price:", unitPrice);

        return (uPrice == unitPrice) ? true : false;
    }

    async checkNetPrice(totalPrice:string) {
        const netPrice = await this.netPriceLocator.textContent();

        return (netPrice == totalPrice) ? true : false;
    }

    async clickCheckout() {
        try {
            await this.btnContinue.click();
        }
        catch (error) {
            console.log(`While performing click on 'continue', error received: `, error);
            throw error;
        }
    }

}