import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import SignupPage from '../pages/signupPage'; 
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import * as dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.BASE_URL || 'http://localhost';
let emailCounter = 1;

test.describe('signup tests', () => {

    //declaring global variables
    let page: Page;
    let signupPage: SignupPage;
    let homePage: HomePage;

    //open fresh instance of page before each test
    test.beforeEach(async ({ browser }) => {
        const pageManager = new openPage('firefox', false);
        await pageManager.initialize();
        page = await pageManager.gotoUrl(BASE_URL);
        
        signupPage = new SignupPage(page);
        homePage = new HomePage(page, signupPage);
      });

test('Test Case-1:Register User', async () => {

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await homePage.loginSignuplink.click();

    await expect(signupPage.signuptitle).toHaveText('New User Signup!');
    const email = `kainatsabir+${emailCounter}@gmail.com`; // Generate unique email
    await signupPage.signupToApp("Kainat", email); //signup 

    await expect(signupPage.accountInfoPageText).toHaveText("Enter Account Information");

    await signupPage.enterAccountInfo("Mr.", "Kainat Sabir", "Password123!", "21", "march", "2012"); //account info
    await signupPage.enterAddressInfo("firstname", "lastname", "company", "address line 1", "address line 2", "canada", "state", "city", "54000", "738738373"); //address info
    await signupPage.continuebtn.click();

    await expect(homePage.loggedinas).toBeVisible();
    const loggedinastext=await homePage.loggedinas.textContent();
    await expect(loggedinastext?.trim()).toEqual('Kainat Sabir');

    await homePage.deleteaccountfunc();
    emailCounter++;

});

test('Test Case-5:Register User with existing email', async () => {
    
    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await homePage.loginSignuplink.click();

    await expect(signupPage.signuptitle).toHaveText('New User Signup!');
    await signupPage.signupToApp("Kainat", 'kainatsabir122@gmail.com');

    const recievedErrortxt = await signupPage.alreadyexistAccountError.textContent();
    await expect(recievedErrortxt).toBe("Email Address already exist!");

});

});