import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import SignupPage from '../pages/signupPage'; 
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';

test('Signup then create account and then delete', async () => {
    
    const pageManager = new openPage('firefox', false); 
    await pageManager.initialize();

    
    const page = await pageManager.gotoUrl("https://www.automationexercise.com/");

    const signuppage = new SignupPage(page);  //instance of signuppage class
    const homePage = new HomePage(page);  //instance of homepage class

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);


    await homePage.loginSignuplink.click();

    await expect(signuppage.signuptitle).toHaveText('New User Signup!');
    await signuppage.signupToApp("Kainat", "kainatsabir122@gmail.com");

    await expect(signuppage.accountInfoPageText).toHaveText("Enter Account Information");

    await signuppage.enterAccountInfo("Mr.", "Kainat Sabir", "Password123!", "21", "march", "2012");

    await signuppage.newsletter.click();
    await signuppage.specialOffers.click();

    await page.waitForTimeout(10000);

 

});
