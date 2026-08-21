import { test, expect } from '@playwright/test';

import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataGeneratorUtil } from '../utils/RandomDataGeneratorUtil';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appURL); //Navigate to application URL 

    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
})


test.afterEach(async ({ page }) => {
    await page.close();
});


test('User registration validation', { tag: ["@master", "@santiy", "@regression"] }, async () => {

    const firstName:string = RandomDataGeneratorUtil.getFirstName();
    const lastName:string = RandomDataGeneratorUtil.getlastName();
    const email:string = RandomDataGeneratorUtil.getEmail();
    const phoneNumber:string = RandomDataGeneratorUtil.getPhoneNumber();
    const password:string = RandomDataGeneratorUtil.getPassword();

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

});
