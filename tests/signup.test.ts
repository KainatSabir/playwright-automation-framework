import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import SignupPage from '../pages/signupPage'; 
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';

test('Test Case-1:Register User', async () => {
    
    const pageManager = new openPage('firefox', false); 
    await pageManager.initialize();

    
    const page = await pageManager.gotoUrl("https://www.automationexercise.com/");

    const signuppage = new SignupPage(page);  //instance of signuppage class
    const homePage = new HomePage(page, signuppage);  //instance of homepage class

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);


    await homePage.loginSignuplink.click();

    await expect(signuppage.signuptitle).toHaveText('New User Signup!');
    await signuppage.signupToApp("Kainat", "kainatsabir+16@gmail.com"); //signup 

    await expect(signuppage.accountInfoPageText).toHaveText("Enter Account Information");

    await signuppage.enterAccountInfo("Mr.", "Kainat Sabir", "Password123!", "21", "march", "2012"); //account info

    await signuppage.newsletter.click();
    await signuppage.specialOffers.click();

    await signuppage.enterAddressInfo("firstname", "lastname", "company", "address line 1", "address line 2", "canada", "state", "city", "54000", "738738373"); //address info

    const AccountCreatedtextContent = await signuppage.titleAccountCreated.textContent();
    await expect(AccountCreatedtextContent?.trim()).toEqual("Account Created!");   //account created successfullt

    await signuppage.continuebtn.click();

    await expect(homePage.loggedinas).toBeVisible();

    const loggedinastext=await homePage.loggedinas.textContent();

    await expect(loggedinastext?.trim()).toEqual('Kainat Sabir');

    await homePage.deleteaccountfunc();

});