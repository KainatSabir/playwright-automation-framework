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
    public productName:Locator;
    public category:Locator;
    public price:Locator;
    public availability:Locator;
    public condition:Locator;
    public brand:Locator;
    public searchproducttxtbox:Locator;
    public searchbtn;


    constructor(page:Page, homePage:HomePage) {
        this.page = page; 
        this.homepage = homePage;
        this.productPageLink = page.locator(".material-icons.card_travel");
        this.productPageTitle = page.getByTitle("Automation Exercise - All Products");
        this.productPageList = page.locator("features_items");
        this.firstProduct = page.locator(".nav.nav-pills.nav-justified").first();
        this.productDetail = page.locator('div.product-information');
        this.productName = this.productDetail.filter({has: page.getByRole('heading', {name:"Blue Top" })});
        this.category = this.productDetail.filter({has: page.getByRole('paragraph', {name:"Category: Women > Tops"})});
        this.price = page.locator('//div[@class="product-information"]//span[text()="Rs. 500"]');
        this.availability= page.locator('div.product-information p').filter({hasText: " In Stock"});
        this.condition= page.locator('div.product-information p').filter({hasText: " New"});
        this.brand= page.locator('div.product-information p').filter({hasText: " Polo"});
        this.searchproducttxtbox=page.locator('.form-control.input-lg');
        this.searchbtn= page.locator('.btn.btn-default.btn-lg');
        

    }

   
    
}
export default ProductPage;
