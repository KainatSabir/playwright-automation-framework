import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv';
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import SignupPage from '../pages/signupPage';
dotenv.config();  //load env variables from .env file

const BASE_URL = process.env.BASE_URL || 'http://localhost';

    test('Test Case-6: Contact Us Form', async()=>{
        const pageManager = new openPage('chrome', false);
        await pageManager.initialize();

        const page= await pageManager.gotoUrl(BASE_URL);
        const signupPage = new SignupPage(page);
        const homePage = new HomePage(page,signupPage);

        const homepagelogovisible = await homePage.homepagelogo.isVisible();
        await expect(homepagelogovisible).toBe(true);

        await homePage.testcaseslink.click();
        await homePage.testcasespagetitle.isVisible();
    });