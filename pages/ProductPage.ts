import { Page, Locator } from "@playwright/test";

export class ProductPage {
    private readonly page:Page;

    private readonly product:Locator;
    private readonly brand:Locator;
    private readonly availability:Locator;
    private readonly inputTxtQuantity:Locator;
    private readonly BtnAddToCart:Locator;
    private readonly successMsgTxt:Locator;
    private readonly BtnCart:Locator;
    private readonly totalTxt:Locator;
    private readonly BtnViewCart:Locator;

    constructor(page:Page) {
        this.page = page;

        this.product = page.locator("div h1");
        this.brand = page.locator("li a:has-text('Apple')");
        this.availability = page.locator("li:has-text('Availability:')");
        this.inputTxtQuantity = page.locator("#input-quantity");
        this.BtnAddToCart = page.locator("#button-cart");
        this.successMsgTxt = page.locator(".alert-success.alert-dismissible");
        this.BtnCart = page.locator("#cart button");
        this.totalTxt = page.locator("tbody tr:nth-child(4) td:nth-child(2)");
        this.BtnViewCart = page.locator(".text-right a:has-text('View Cart')");
    }

    async isProductPageExist():Promise<boolean> {
        const pageURL = this.page.url();

        if(pageURL.includes("/product")) {
            return true;
        }
        return false;
    }

    async checkProductName(productName:string):Promise<boolean> {
        const pName = await this.product.textContent();
        return (pName === productName);
    }

    async checkBrandName(brandName:string):Promise<boolean> {
        const bName = await this.brand.textContent();
        return (bName === brandName);
    }

    async isStockAvailable():Promise<boolean> {
        const stockAvailable = await this.availability.textContent();

        if(stockAvailable?.includes("In Stock")) {
            return true;
        }
        return false;
    }

    async enterProductQuantity(quantity:string):Promise<void> {
        await this.inputTxtQuantity.clear();
        await this.inputTxtQuantity.fill(quantity);
    }

    async clickAddToCart():Promise<void> {
        await this.BtnAddToCart.click();
    }

    async checkSuccessMsg():Promise<boolean> {
        const successMsg = await this.successMsgTxt.textContent();
        if(successMsg?.includes("Success")) {
            return true;
        }
        return false;
    }

    async clickCart():Promise<void> {
        await this.BtnCart.click();
    }

    async checkTotalValue():Promise<boolean> {
        return this.totalTxt.isVisible();
    }

    async clickViewCart() {
        await this.BtnViewCart.click();
    }
}