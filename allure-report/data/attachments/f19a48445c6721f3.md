# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndTest.spec.ts >> End to End functionality - Register, Login, Search, Finding product, adding to cart, checkout
- Location: tests\EndToEndTest.spec.ts:70:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
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
  113 |     await registrationPage.clickContinue();
  114 | 
  115 |     expect(await myAccountPage.isMyAccountPageExists()).toBe(true);
  116 |     expect(await myAccountPage.getPageTitle()).toEqual("My Account");
  117 |     await myAccountPage.clickLogout();
  118 | 
  119 |     expect(await logoutPage.isContinueButtonVisible()).toBeTruthy();
  120 |     await logoutPage.clickContinue();
  121 | }
  122 | 
  123 | async function loginRegisteredUser() {
  124 |     //Navigate to Login page via Home page
  125 |     await homePage.clickLinkMyAccount();
  126 |     await homePage.clickLogin();
  127 | 
  128 |     //Enter valid credentials and log in
  129 |     await loginPage.setEmail(email);
  130 |     await loginPage.setPassword(password);
  131 |     await loginPage.clickLogin();
  132 | 
  133 |     //Verify successful login by checking 'My Account' page presence
  134 |     const isLoggedIn = await myAccountPage.isMyAccountPageExists();
  135 |     expect(isLoggedIn).toBeTruthy();
  136 | }
  137 | 
  138 | async function addProductToCart() {
  139 |     await homePage.enterProductName(productName);
  140 |     await homePage.clickSearch();
  141 | 
  142 |     expect(await searchResultPage.isSearchPageExists()).toBeTruthy();
  143 |     expect(await searchResultPage.searchHeadingExists()).toBe(true);
  144 |     await searchResultPage.clickSearchProduct(productName);
  145 | 
  146 |     expect(await productPage.isProductPageExist()).toBeTruthy();
  147 |     expect(await productPage.checkBrandName(brandName)).toBe(true);
  148 |     expect(await productPage.checkProductName(productName)).toBeTruthy();
  149 | 
  150 |     await productPage.enterProductQuantity(productQuantity);
  151 |     await productPage.clickAddToCart();
  152 |     expect(await productPage.checkSuccessMsg()).toBeTruthy();
  153 | 
  154 |     await productPage.clickCart();
  155 |     await productPage.clickViewCart();
  156 | }
  157 | 
  158 | async function productCheckout() {
  159 | 
  160 |     companyName = RandomDataGeneratorUtil.getRandomCompanyName();
  161 |     address1 = RandomDataGeneratorUtil.getRandomAddress();
  162 |     address2 = RandomDataGeneratorUtil.getRandomSecondaryAddress();
  163 |     city = RandomDataGeneratorUtil.getRandomCity();
  164 |     postalCode = RandomDataGeneratorUtil.getRandomPin();
  165 |     country = "United States";
  166 |     state = "Texas";
  167 | 
  168 |     expect(await shoppingCartPage.isShoppingCartExists()).toBeTruthy();
  169 |     expect(await shoppingCartPage.checkCartHeading()).toBe(true);
  170 |     expect(await shoppingCartPage.checkProductName(productName)).toBeTruthy();
  171 |     // expect(await shoppingCartPage.checkQuantity(productQuantity)).toBe(true);
> 172 |     expect(await shoppingCartPage.checkUnitPrice(unitPrice)).toBeTruthy();
      |                                                              ^ Error: expect(received).toBeTruthy()
  173 |     expect(await shoppingCartPage.checkNetPrice(netPrice)).toBe(true);
  174 |     
  175 |     await shoppingCartPage.clickCheckout();
  176 | 
  177 |     await checkoutPage.enterFirstName(firstName);
  178 |     await checkoutPage.enterLastName(lastName);
  179 |     await checkoutPage.enterCompanyName(companyName);
  180 |     await checkoutPage.enterAddress1(address1);
  181 |     await checkoutPage.enterAddress2(address2);
  182 |     await checkoutPage.enterCityName(city);
  183 |     await checkoutPage.enterPostalCode(postalCode);
  184 |     await checkoutPage.selectCountry(country);
  185 |     await checkoutPage.selectState(state);
  186 | 
  187 |     await checkoutPage.clickContinue();
  188 | }
  189 | 
```