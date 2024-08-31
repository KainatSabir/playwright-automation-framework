import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import BrowserManager from '../pages/openPage';
import SignupPage from '../pages/signupPage';

test.describe.configure({ mode: 'parallel' });
test.describe('login tests', () => {
    
test('Test Case-2: Login User with correct email and password', async()=>{
    const pageManager = new openPage('firefox', false);
    await pageManager.initialize();

    const page = await pageManager.gotoUrl("https://www.automationexercise.com/");

    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page, signupPage);  //instance of homepage class
    const loginPage = new LoginPage(page,signupPage,homePage);  //instance of loginpage class

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await homePage.loginSignuplink.click();

    await loginPage.logintxt.isVisible();
    await loginPage.login("kainatsabir+2@gmail.com", "Password123!");

    await expect(homePage.loggedinas).toBeVisible();

    const loggedinastext=await homePage.loggedinas.textContent();
    await expect(loggedinastext?.trim()).toEqual('Kainat Sabir');

    await homePage.deleteaccountfunc();
    
});
test('Test Case-3: Login User with incorrect email and password', async()=>{
    const pageManager = new openPage('firefox', false);
    await pageManager.initialize();

    const page = await pageManager.gotoUrl("https://www.automationexercise.com/");

    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page, signupPage);  //instance of homepage class
    const loginPage = new LoginPage(page,signupPage,homePage);  //instance of loginpage class

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await homePage.loginSignuplink.click();

    await loginPage.logintxt.isVisible();
    await loginPage.login("kainatsabir+2@gmail.com", "Password123");

    const errortxt = await loginPage.incorrectEmailPasswordError.textContent();
    await expect(errortxt).toBe("Your email or password is incorrect!");

});    

});
