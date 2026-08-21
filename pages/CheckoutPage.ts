import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    private readonly page:Page;

    private readonly inputFirstName:Locator;
    private readonly inputLastName:Locator;
    private readonly inputCompany:Locator;
    private readonly inputAddress1:Locator;
    private readonly inputAddress2:Locator;
    private readonly inputCity:Locator;
    private readonly inputPostalCode:Locator;
    private readonly inputCountry:Locator;
    private readonly inputState:Locator;
    private readonly inputBtnContinue:Locator;
    private readonly txtCheckout:Locator;

    constructor(page:Page) {
        this.page = page;

        this.inputFirstName = page.locator("#input-payment-firstname");
        this.inputLastName = page.locator("#input-payment-lastname");
        this.inputCompany = page.locator("#input-payment-company");
        this.inputAddress1 = page.locator("#input-payment-address-1");
        this.inputAddress2 = page.locator("#input-payment-address-2");
        this.inputCity = page.locator("#input-payment-city");
        this.inputPostalCode = page.locator("#input-payment-postcode");
        this.inputCountry = page.locator("#input-payment-country");
        this.inputState = page.locator("#input-payment-zone");
        this.inputBtnContinue = page.locator("#button-payment-address");
        this.txtCheckout = page.locator("#content h1");
    }

    async enterFirstName(firstName:string):Promise<void> {
        await this.inputFirstName.clear();
        await this.inputFirstName.fill(firstName);
    }

    async enterLastName(lastName:string):Promise<void> {
        await this.inputLastName.clear();
        await this.inputLastName.fill(lastName);
    }

    async enterCompanyName(companyName:string):Promise<void> {
        await this.inputCompany.clear();
        await this.inputCompany.fill(companyName);
    }

    async enterAddress1(address1:string):Promise<void> {
        await this.inputAddress1.clear();
        await this.inputAddress1.fill(address1);
    }

    async enterAddress2(address2:string):Promise<void> {
        await this.inputAddress2.clear();
        await this.inputAddress2.fill(address2);
    }

    async enterCityName(cityName:string):Promise<void> {
        await this.inputCity.clear();
        await this.inputCity.fill(cityName);
    }

    async enterPostalCode(postalCode:string):Promise<void> {
        await this.inputPostalCode.clear();
        await this.inputPostalCode.fill(postalCode);
    }

    async selectCountry(country:string):Promise<void> {
        await this.inputCountry.selectOption(country);
    }

    async selectState(state:string):Promise<void> {
        await this.inputState.selectOption(state);
    }

    async clickContinue():Promise<void> {
        await this.inputBtnContinue.click();
    }

    async checkoutPageExisit():Promise<boolean> {
        const pageURL = this.page.url();
        const pageTitle = await this.page.title();

        return (pageURL.includes("/checkout") && pageTitle.match("Checkout")) ? true : false;
    }

    async isCheckoutHeadingExist():Promise<boolean> {
        const checkoutText = await this.txtCheckout.textContent();

        return (checkoutText == "Checkout") ? true : false;
    }
}