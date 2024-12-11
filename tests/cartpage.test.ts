import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import openPage from '../pages/openPage';
import CartPage from '../pages/cartPage'
import * as dotenv from 'dotenv';
import SignupPage from '../pages/signupPage';
import HomePage from '../pages/homePage';

dotenv.config();  //load env variables from .env file

const BASE_URL = process.env.BASE_URL || 'http://localhost';


test('Test Case 11: Verify Subscription in Cart page', async()=>{
    const pageManager = new openPage("chrome", false);
    await pageManager.initialize();

    const page= await pageManager.gotoUrl(BASE_URL);

    const cartPage = new CartPage(page);
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page, signupPage);
    await cartPage.cartPageLink.click(); 
    
    await homePage.subscription.scrollIntoViewIfNeeded();
    await homePage.subscription.fill("kainat@gmail.com");
    await homePage.subscriptionsubmitbtn.click();
    await homePage.subscriptionsuccess.isVisible();


    await page.waitForTimeout(10000);
});