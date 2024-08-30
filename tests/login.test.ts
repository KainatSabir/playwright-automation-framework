import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import BrowserManager from '../pages/openPage';
import SignupPage from '../pages/signupPage';

test('Test Case-2: Login User with correct email and password', async()=>{
    const pageManager = new openPage('firefox', false);
    await pageManager.initialize();

    const page = await pageManager.gotoUrl("https://www.automationexercise.com/");

    const loginPage = new LoginPage(page);  //instance of loginpage class
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);  //instance of homepage class

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await homePage.loginSignuplink.click();

    await loginPage.logintxt.isVisible();
    await loginPage.login("kainatsabir+1@gmail.com", "Password123!");

    await expect(homePage.loggedinas).toBeVisible();

    const loggedinastext=await homePage.loggedinas.textContent();

    await expect(loggedinastext?.trim()).toEqual('Kainat Sabir');

    await homePage.deleteaccount.click();   //delete account
    await expect(signupPage.accountdeleted).toBeVisible();   //account deleted successfully
    await signupPage.continuebtn.click();
    

});