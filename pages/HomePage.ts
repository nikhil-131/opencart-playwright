import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    
    // Locators
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators
        this.linkMyAccount = page.locator('span:has-text("My Account")');
        this.linkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('#search button[type="button"]');
    }

    // Check if HomePage exists
    async homePageExists():Promise<boolean> {

        const pageTitle:string = await this.page.title();
        if(pageTitle.includes("Your Store"))
        {
            return true;
        }
        return false;
    }

    // Click "My Account" link
    async clickLinkMyAccount():Promise<void> {
        try {
            await this.linkMyAccount.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    // Click "Register" link
    async clickRegister():Promise<void> {
        try {
            await this.linkRegister.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Register': ${error}`);
            throw error;
        }
    }

    // Click "Login" link
    async clickLogin():Promise<void> {
        try {
            await this.linkLogin.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Login': ${error}`);
            throw error;
        }
    }

    // enter search text in searchbox
    async enterProductName(productName:string) {
        try {
            await this.txtSearchbox.clear();
            await this.txtSearchbox.fill(productName);
        } catch (error) {
            console.log(`Exception occurred while entering 'search text': ${error}`);
            throw error;
        }
    }

    // click search button
    async clickSearch() {
        try {
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'search': ${error}`);
            throw error;
        }
    }
}