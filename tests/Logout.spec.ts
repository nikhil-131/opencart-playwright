import { test, expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { TestConfig } from "../test.config";

let homePage:HomePage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;
let logoutPage:LogoutPage;

let email:string;
let password:string;

test.beforeEach(async ({page}) => {
    const config = new TestConfig();
    email = config.email;
    password = config.password;

    page.goto(config.appURL);

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);
});

test.afterEach(async ({page}) => {
    await page.close();
});

test("validate Logout functionality", {tag: ["@master", "@sanity", "@regression"]}, async() => {
    await homePage.clickLinkMyAccount();
    await homePage.clickLogin();

    await loginPage.setEmail(email);
    await loginPage.setPassword(password);
    await loginPage.clickLogin();

    const myAccountPageExist:boolean = await myAccountPage.isMyAccountPageExists();
    expect(myAccountPageExist).toBeTruthy();

    const myAccountPageTitle:string = await myAccountPage.getPageTitle();
    expect(myAccountPageTitle).toEqual("My Account");

    await myAccountPage.clickLogout();

    const logoutContinueBtnVisible = await logoutPage.isContinueButtonVisible();
    expect(logoutContinueBtnVisible).toBeTruthy();
    await logoutPage.clickContinue();
});