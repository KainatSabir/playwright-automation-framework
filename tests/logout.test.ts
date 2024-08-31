import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import BrowserManager from '../pages/openPage';
import SignupPage from '../pages/signupPage';

test('Test Case-4: Logout User', async()=>{
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
    await loginPage.login("kainatsabir+3@gmail.com", "Password123!");

    await expect(homePage.loggedinas).toBeVisible();

    await homePage.logout.click();
    await loginPage.logintxt.isVisible();

});