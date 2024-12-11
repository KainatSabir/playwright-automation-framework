import { test, expect, Browser,BrowserContext, Page } from '@playwright/test';
import SignupPage from '../pages/signupPage'; 
import openPage from '../pages/openPage';
import HomePage from '../pages/homePage';
import * as dotenv from 'dotenv';
import homePage from '../pages/homePage';
import ProductPage from '../pages/productPage';
import { describe } from 'node:test';

dotenv.config();
const BASE_URL = process.env.BASE_URL || 'http://localhost';

test.describe('Test Cases related to products', ()=>{
    let page:Page;
    let signupPage:SignupPage;
    let homePage:HomePage;
    let productPage:ProductPage;

    test.beforeEach(async ()=>{
        const pageManager = new openPage('chrome', false);
        await pageManager.initialize();
        page= await pageManager.gotoUrl(BASE_URL);


     signupPage = new SignupPage(page);
     homePage = new HomePage(page,signupPage);
     productPage = new ProductPage(page, homePage);

     const homepagelogovisible = await homePage.homepagelogo.isVisible();
     await expect(homepagelogovisible).toBe(true);
     await productPage.productPageLink.click();
     await productPage.productPageTitle.isVisible(); 

    })

test('Test Case-8: Verify All Products and product detail page', async()=>{

    
    await productPage.productPageList.isVisible();

    await productPage.firstProduct.scrollIntoViewIfNeeded();
    await productPage.firstProduct.click();

    await productPage.productDetail.isVisible();
    await productPage.productName.isVisible();
    await productPage.category.isVisible();
    await productPage.price.isVisible();
    await productPage.availability.isVisible();
    await productPage.condition.isVisible();
    await productPage.brand.isVisible();

    
});

test('Test Case 9: Search Product', async() =>{
    await productPage.searchproducttxtbox.isVisible();
    const searchTerm = "blue"
    await productPage.searchproducttxtbox.fill(searchTerm);
    await productPage.searchbtn.click();
    await productPage.productName.isVisible();
    const productCount = await productPage.productName.count();
  for (let i = 0; i < productCount; i++) {
    await expect(productPage.productName).toBeVisible();
    const productNameText = await productPage.productName.nth(i).textContent();
    await expect(productNameText?.toLowerCase()).toContain(searchTerm.toLowerCase());
  }

 /*test('Test Case 12: Add Products in Cart', async()=>{

 })
*/

});
});