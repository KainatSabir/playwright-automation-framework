import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv';
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import SignupPage from '../pages/signupPage';
import ContactusPage from '../pages/contactusPage';
import { channel } from 'diagnostics_channel';
dotenv.config();  //load env variables from .env file

const BASE_URL = process.env.BASE_URL || 'http://localhost';

    test('Test Case-6: Contact Us Form', async()=>{
        const pageManager = new openPage('chrome', false);
        await pageManager.initialize();

        const page= await pageManager.gotoUrl(BASE_URL);
        const signupPage = new SignupPage(page);
        const homePage = new HomePage(page,signupPage);
        const contactusPage = new ContactusPage(page, homePage);

        const homepagelogovisible = await homePage.homepagelogo.isVisible();
        await expect(homepagelogovisible).toBe(true);

        await homePage.contactuspagelink.click();
        await contactusPage.getintouchtxt.isVisible();

        await contactusPage.submitcontactform("kainat","kainat@gmail.com", "contact me", "I want to learn the playwright with js");

        await contactusPage.chooseFile.setInputFiles("README.md");
        await page.waitForTimeout(3000);

        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        
        await contactusPage.submitbtn.click();
        await contactusPage.successmsg.isVisible();

        await homePage.homepagelink.click();
        await expect(homepagelogovisible).toBe(true);

    });