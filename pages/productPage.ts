import { Browser, BrowserContext, chromium, firefox, webkit, Page as PlaywrightPage, Page } from 'playwright';
import { expect, Locator } from "playwright/test";
import HomePage from './homePage';
import homePage from './homePage';

class ProductPage {
    public page: Page;
    public homepage : HomePage;
    public productPageLink:Locator;
    public productPageTitle:Locator;
    public productPageList:Locator;
    public firstProduct:Locator;
    public productDetail:Locator;
    

    constructor(page:Page, homePage:HomePage) {
        this.page = page; 
        this.homepage = homePage;
        this.productPageLink = page.locator(".material-icons.card_travel");
        this.productPageTitle = page.getByTitle("Automation Exercise - All Products");
        this.productPageList = page.locator("features_items");
        this.firstProduct = page.locator(".nav.nav-pills.nav-justified").first();
       this.productDetail = page.locator("product-information");
    }

   
    
}
export default ProductPage;
