import { Page, test, expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";
import { ShopppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { TestConfig } from "../test.config";
import { RandomDataGeneratorUtil } from "../utils/RandomDataGeneratorUtil";

let homePage: HomePage;
let registrationPage: RegistrationPage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;
let searchResultPage: SearchResultPage;
let productPage: ProductPage;
let shoppingCartPage: ShopppingCartPage;
let checkoutPage: CheckoutPage;

let productName: string;
let brandName: string;
let productQuantity: string;
let unitPrice:string;
let netPrice: string;

let firstName: string;
let lastName: string;
let email: string;
let phoneNumber: string;
let password: string;
let companyName:string;
let address1:string;
let address2:string;
let city:string;
let postalCode:string;
let country:string;
let state:string;


test.beforeEach(async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appURL);

    productName = config.productName;
    brandName = config.brandName;
    productQuantity = config.productQuantity;
    unitPrice = config.unitPrice;
    netPrice = config.netPrice;

    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);
    searchResultPage = new SearchResultPage(page);
    productPage = new ProductPage(page);
    shoppingCartPage = new ShopppingCartPage(page);
    checkoutPage = new CheckoutPage(page);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("End to End functionality - Register, Login, Search, Finding product, adding to cart, checkout", { tag: ["@master", "@sanity", "@regression"] }, async () => {
    await accountRegistration();
    console.log("Account Registered Successfully...");
    
    await loginRegisteredUser();
    console.log("Login Registered user successfully...");
    
    await addProductToCart();
    console.log("Product added to cart successfully...");
    
    await productCheckout();
    console.log("Product chrckout successfully...");
    
});

// Register
async function accountRegistration() {
    firstName = RandomDataGeneratorUtil.getFirstName();
    lastName = RandomDataGeneratorUtil.getlastName();
    email = RandomDataGeneratorUtil.getEmail();
    phoneNumber = RandomDataGeneratorUtil.getPhoneNumber();
    password = RandomDataGeneratorUtil.getPassword();

    //Go to 'My Account' and click 'Register'
    await homePage.clickLinkMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    await registrationPage.setFirstName(firstName);
    await registrationPage.setLastName(lastName);
    await registrationPage.setEmail(email);
    await registrationPage.setTelephone(phoneNumber);

    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation message
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    await registrationPage.clickContinue();

    expect(await myAccountPage.isMyAccountPageExists()).toBe(true);
    expect(await myAccountPage.getPageTitle()).toEqual("My Account");
    await myAccountPage.clickLogout();

    expect(await logoutPage.isContinueButtonVisible()).toBeTruthy();
    await logoutPage.clickContinue();
}

async function loginRegisteredUser() {
    //Navigate to Login page via Home page
    await homePage.clickLinkMyAccount();
    await homePage.clickLogin();

    //Enter valid credentials and log in
    await loginPage.setEmail(email);
    await loginPage.setPassword(password);
    await loginPage.clickLogin();

    //Verify successful login by checking 'My Account' page presence
    const isLoggedIn = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();
}

async function addProductToCart() {
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    expect(await searchResultPage.isSearchPageExists()).toBeTruthy();
    expect(await searchResultPage.searchHeadingExists()).toBe(true);
    await searchResultPage.clickSearchProduct(productName);

    expect(await productPage.isProductPageExist()).toBeTruthy();
    expect(await productPage.checkBrandName(brandName)).toBe(true);
    expect(await productPage.checkProductName(productName)).toBeTruthy();

    await productPage.enterProductQuantity(productQuantity);
    await productPage.clickAddToCart();
    expect(await productPage.checkSuccessMsg()).toBeTruthy();

    await productPage.clickCart();
    await productPage.clickViewCart();
}

async function productCheckout() {

    companyName = RandomDataGeneratorUtil.getRandomCompanyName();
    address1 = RandomDataGeneratorUtil.getRandomAddress();
    address2 = RandomDataGeneratorUtil.getRandomSecondaryAddress();
    city = RandomDataGeneratorUtil.getRandomCity();
    postalCode = RandomDataGeneratorUtil.getRandomPin();
    country = "United States";
    state = "Texas";

    expect(await shoppingCartPage.isShoppingCartExists()).toBeTruthy();
    expect(await shoppingCartPage.checkCartHeading()).toBe(true);
    expect(await shoppingCartPage.checkProductName(productName)).toBeTruthy();
    // expect(await shoppingCartPage.checkQuantity(productQuantity)).toBe(true);
    expect(await shoppingCartPage.checkUnitPrice(unitPrice)).toBeTruthy();
    expect(await shoppingCartPage.checkNetPrice(netPrice)).toBe(true);
    
    await shoppingCartPage.clickCheckout();

    await checkoutPage.enterFirstName(firstName);
    await checkoutPage.enterLastName(lastName);
    await checkoutPage.enterCompanyName(companyName);
    await checkoutPage.enterAddress1(address1);
    await checkoutPage.enterAddress2(address2);
    await checkoutPage.enterCityName(city);
    await checkoutPage.enterPostalCode(postalCode);
    await checkoutPage.selectCountry(country);
    await checkoutPage.selectState(state);

    await checkoutPage.clickContinue();
}
