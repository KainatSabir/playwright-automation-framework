import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import openPage from '../pages/openPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import SignupPage from '../pages/signupPage';
import ContactusPage from '../pages/contactusPage';
import * as dotenv from 'dotenv';
dotenv.config();  //load env variables from .env file

const BASE_URL = process.env.BASE_URL || 'http://localhost';

test('Test Case 10: Verify Subscription in home page', async()=>{
   const pageManager = new openPage('chrome', false);
   await pageManager.initialize();

   const page= await pageManager.gotoUrl(BASE_URL);

   const signupPage = new SignupPage(page);
   const homePage = new HomePage(page,signupPage);

    await homePage.subscription.scrollIntoViewIfNeeded();
    await homePage.subscription.fill("kainat@gmail.com");
    await homePage.subscriptionsubmitbtn.click();
    await homePage.subscriptionsuccess.isVisible();

   
   await page.waitForTimeout(5000);
});