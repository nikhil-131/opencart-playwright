import { Page, Locator } from "@playwright/test";

export class SearchResultPage {
    private readonly page:Page;

    private readonly searchHeadingTxt:Locator;
    private readonly searchProductsList:Locator;

    constructor(page:Page) {
        this.page = page;

        this.searchHeadingTxt = page.locator("h1:has-text('Search')");
        this.searchProductsList = page.locator("h4>a");
    }

    async isSearchPageExists():Promise<boolean> {
        const pageURL = this.page.url();
        const pageTitle = await this.page.title();

        if(pageURL.includes("/search") && pageTitle.includes("Search")) {
            return true;
        }
        return false;
    }

    async searchHeadingExists():Promise<boolean> {
        return await this.searchHeadingTxt.isVisible();
    }

    async clickSearchProduct(productName:string) {
        const count = await this.searchProductsList.count();

        for (let i=0; i<count; i++) {
            const product = this.searchProductsList.nth(i);
            const pName = await product.innerText();

            if(pName === productName) {
                await product.click();
                break;
            }
        }
    }


}