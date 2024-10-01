import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import SignupPage from '../pages/signupPage'; 
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import * as dotenv from 'dotenv';
import homePage from '../pages/homePage';
import ProductPage from '../pages/productPage';

dotenv.config();
const BASE_URL = process.env.BASE_URL || 'http://localhost';

test('Test Case-8: Verify All Products and product detail page', async()=>{
    const pageManager = new openPage('chrome', false);
    await pageManager.initialize();
    

    const page= await pageManager.gotoUrl(BASE_URL);
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page,signupPage);
    const productPage = new ProductPage(page, homePage);

    const homepagelogovisible = await homePage.homepagelogo.isVisible();
    await expect(homepagelogovisible).toBe(true);

    await productPage.productPageLink.click();
    await productPage.productPageTitle.isVisible();
    
    await productPage.productPageList.isVisible();

    await productPage.firstProduct.scrollIntoViewIfNeeded();
    await productPage.firstProduct.click();

    await productPage.productDetail.isVisible();

    await page.waitForTimeout(10000);


    
});