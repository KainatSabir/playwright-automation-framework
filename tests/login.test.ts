import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import openPage from '../pages/openPage';
import homePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import signupPage from '../pages/signupPage';
import HomePage from '../pages/homePage';
import SignupPage from '../pages/signupPage';
import * as dotenv from 'dotenv';
dotenv.config();  //load env variables from .env file

const BASE_URL = process.env.BASE_URL || 'http://localhost';

test.describe.configure({ mode: 'parallel' });
test.describe('login tests', () => {

    //declaring global variables
    let page: Page;
    let signupPage: SignupPage;
    let homePage: HomePage;
    let loginPage: LoginPage;

    //open fresh instance of page before each test
    test.beforeEach(async ({ browser }) => {
        const pageManager = new openPage('firefox', false);
        await pageManager.initialize();
        page = await pageManager.gotoUrl(BASE_URL);
        
        signupPage = new SignupPage(page);
        homePage = new HomePage(page, signupPage);
        loginPage = new LoginPage(page, signupPage, homePage);
      });
    
    
    test('Test Case-2: Login User with correct email and password', async () => {
        const homepagelogovisible = await homePage.homepagelogo.isVisible();
        await expect(homepagelogovisible).toBe(true);
    
        await homePage.loginSignuplink.click();
        await loginPage.login(process.env.TEST_USER_EMAIL || '', process.env.TEST_USER_PASSWORD || '');
    
        await expect(homePage.loggedinas).toBeVisible(); // Ensure this matches HomePage class
    
        const loggedinastext = await homePage.loggedinas.textContent();
        await expect(loggedinastext?.trim()).toEqual('Kainat Sabir');
    
        await homePage.deleteaccountfunc();
      });

test('Test Case-3: Login User with incorrect email and password', async()=>{
    const pageManager = new openPage('firefox', false);
    await pageManager.initialize();

    const page = await pageManager.gotoUrl(BASE_URL);

    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page, signupPage);  //instance of homepage class
    const loginPage = new LoginPage(page,signupPage,homePage);  //instance of loginpage class

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await homePage.loginSignuplink.click();

    await loginPage.login(process.env.TEST_USER_EMAIL || '', process.env.TEST_USER_PASSWORD || '');

    const errortxt = await loginPage.incorrectEmailPasswordError.textContent();
    await expect(errortxt).toBe("Your email or password is incorrect!");

});    

});
