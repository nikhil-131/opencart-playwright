# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndTest.spec.ts >> End to End functionality - Register, Login, Search, Finding product, adding to cart, checkout
- Location: tests\EndToEndTest.spec.ts:70:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Test source

```ts
  13  | import { RandomDataGeneratorUtil } from "../utils/RandomDataGeneratorUtil";
  14  | 
  15  | let homePage: HomePage;
  16  | let registrationPage: RegistrationPage;
  17  | let loginPage: LoginPage;
  18  | let myAccountPage: MyAccountPage;
  19  | let logoutPage: LogoutPage;
  20  | let searchResultPage: SearchResultPage;
  21  | let productPage: ProductPage;
  22  | let shoppingCartPage: ShopppingCartPage;
  23  | let checkoutPage: CheckoutPage;
  24  | 
  25  | let productName: string;
  26  | let brandName: string;
  27  | let productQuantity: string;
  28  | let unitPrice:string;
  29  | let netPrice: string;
  30  | 
  31  | let firstName: string;
  32  | let lastName: string;
  33  | let email: string;
  34  | let phoneNumber: string;
  35  | let password: string;
  36  | let companyName:string;
  37  | let address1:string;
  38  | let address2:string;
  39  | let city:string;
  40  | let postalCode:string;
  41  | let country:string;
  42  | let state:string;
  43  | 
  44  | 
  45  | test.beforeEach(async ({ page }) => {
  46  |     const config = new TestConfig();
  47  |     await page.goto(config.appURL);
  48  | 
  49  |     productName = config.productName;
  50  |     brandName = config.brandName;
  51  |     productQuantity = config.productQuantity;
  52  |     unitPrice = config.unitPrice;
  53  |     netPrice = config.netPrice;
  54  | 
  55  |     homePage = new HomePage(page);
  56  |     registrationPage = new RegistrationPage(page);
  57  |     loginPage = new LoginPage(page);
  58  |     myAccountPage = new MyAccountPage(page);
  59  |     logoutPage = new LogoutPage(page);
  60  |     searchResultPage = new SearchResultPage(page);
  61  |     productPage = new ProductPage(page);
  62  |     shoppingCartPage = new ShopppingCartPage(page);
  63  |     checkoutPage = new CheckoutPage(page);
  64  | });
  65  | 
  66  | test.afterEach(async ({ page }) => {
  67  |     await page.close();
  68  | });
  69  | 
  70  | test("End to End functionality - Register, Login, Search, Finding product, adding to cart, checkout", { tag: ["@master", "@sanity", "@regression"] }, async () => {
  71  |     await accountRegistration();
  72  |     console.log("Account Registered Successfully...");
  73  |     
  74  |     await loginRegisteredUser();
  75  |     console.log("Login Registered user successfully...");
  76  |     
  77  |     await addProductToCart();
  78  |     console.log("Product added to cart successfully...");
  79  |     
  80  |     await productCheckout();
  81  |     console.log("Product chrckout successfully...");
  82  |     
  83  | });
  84  | 
  85  | // Register
  86  | async function accountRegistration() {
  87  |     firstName = RandomDataGeneratorUtil.getFirstName();
  88  |     lastName = RandomDataGeneratorUtil.getlastName();
  89  |     email = RandomDataGeneratorUtil.getEmail();
  90  |     phoneNumber = RandomDataGeneratorUtil.getPhoneNumber();
  91  |     password = RandomDataGeneratorUtil.getPassword();
  92  | 
  93  |     //Go to 'My Account' and click 'Register'
  94  |     await homePage.clickLinkMyAccount();
  95  |     await homePage.clickRegister();
  96  | 
  97  |     //Fill in registration details with random data
  98  |     await registrationPage.setFirstName(firstName);
  99  |     await registrationPage.setLastName(lastName);
  100 |     await registrationPage.setEmail(email);
  101 |     await registrationPage.setTelephone(phoneNumber);
  102 | 
  103 |     await registrationPage.setPassword(password);
  104 |     await registrationPage.setConfirmPassword(password);
  105 | 
  106 |     await registrationPage.setPrivacyPolicy();
  107 |     await registrationPage.clickContinue();
  108 | 
  109 |     //Validate the confirmation message
  110 |     const confirmationMsg = await registrationPage.getConfirmationMsg();
  111 |     expect(confirmationMsg).toContain('Your Account Has Been Created!');
  112 | 
> 113 |     expect(await myAccountPage.isMyAccountPageExists()).toBe(true);
      |                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  114 |     expect(await myAccountPage.getPageTitle()).toEqual("Your Account Has Been Created!");
  115 |     await myAccountPage.clickLogout();
  116 | 
  117 |     expect(await logoutPage.isContinueButtonVisible()).toBeTruthy();
  118 |     await logoutPage.clickContinue();
  119 | }
  120 | 
  121 | async function loginRegisteredUser() {
  122 |     //Navigate to Login page via Home page
  123 |     await homePage.clickLinkMyAccount();
  124 |     await homePage.clickLogin();
  125 | 
  126 |     //Enter valid credentials and log in
  127 |     await loginPage.setEmail(email);
  128 |     await loginPage.setPassword(password);
  129 |     await loginPage.clickLogin();
  130 | 
  131 |     //Verify successful login by checking 'My Account' page presence
  132 |     const isLoggedIn = await myAccountPage.isMyAccountPageExists();
  133 |     expect(isLoggedIn).toBeTruthy();
  134 | }
  135 | 
  136 | async function addProductToCart() {
  137 |     await homePage.enterProductName(productName);
  138 |     await homePage.clickSearch();
  139 | 
  140 |     expect(await searchResultPage.isSearchPageExists()).toBeTruthy();
  141 |     expect(await searchResultPage.searchHeadingExists()).toBe(true);
  142 |     await searchResultPage.clickSearchProduct(productName);
  143 | 
  144 |     expect(await productPage.isProductPageExist()).toBeTruthy();
  145 |     expect(await productPage.checkBrandName(brandName)).toBe(true);
  146 |     expect(await productPage.checkProductName(productName)).toBeTruthy();
  147 | 
  148 |     await productPage.enterProductQuantity(productQuantity);
  149 |     await productPage.clickAddToCart();
  150 |     expect(await productPage.checkSuccessMsg()).toBeTruthy();
  151 | 
  152 |     await productPage.clickCart();
  153 |     await productPage.clickViewCart();
  154 | }
  155 | 
  156 | async function productCheckout() {
  157 | 
  158 |     companyName = RandomDataGeneratorUtil.getRandomCompanyName();
  159 |     address1 = RandomDataGeneratorUtil.getRandomAddress();
  160 |     address2 = RandomDataGeneratorUtil.getRandomSecondaryAddress();
  161 |     city = RandomDataGeneratorUtil.getRandomCity();
  162 |     postalCode = RandomDataGeneratorUtil.getRandomPin();
  163 |     country = "United States";
  164 |     state = "Texas";
  165 | 
  166 |     expect(await shoppingCartPage.isShoppingCartExists()).toBeTruthy();
  167 |     expect(await shoppingCartPage.checkCartHeading()).toBe(true);
  168 |     expect(await shoppingCartPage.checkProductName(productName)).toBeTruthy();
  169 |     expect(await shoppingCartPage.checkQuantity(productQuantity)).toBe(true);
  170 |     expect(await shoppingCartPage.checkUnitPrice(unitPrice)).toBeTruthy();
  171 |     expect(await shoppingCartPage.checkNetPrice(netPrice)).toBe(true);
  172 |     
  173 |     await shoppingCartPage.clickCheckout();
  174 | 
  175 |     await checkoutPage.enterFirstName(firstName);
  176 |     await checkoutPage.enterLastName(lastName);
  177 |     await checkoutPage.enterCompanyName(companyName);
  178 |     await checkoutPage.enterAddress1(address1);
  179 |     await checkoutPage.enterAddress2(address2);
  180 |     await checkoutPage.enterCityName(city);
  181 |     await checkoutPage.enterPostalCode(postalCode);
  182 |     await checkoutPage.selectCountry(country);
  183 |     await checkoutPage.selectState(state);
  184 | 
  185 |     await checkoutPage.clickContinue();
  186 | }
  187 | 
```