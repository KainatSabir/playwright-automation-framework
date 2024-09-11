import { Locator, Page } from "playwright";
import SignupPage from "./signupPage";
import { expect } from "playwright/test";

class HomePage{
    public page:Page;
    private signupPage: SignupPage;
    public homepagelogo:Locator;
    public loginSignuplink:Locator;
    public contactuspagelink:Locator;
    public loggedinas:Locator;
    public logout:Locator;
    public deleteaccount:Locator;
    public homepagelink:Locator;
    public testcaseslink:Locator;
    public testcasespagetitle:Locator;

    constructor(page:Page, signupPage: SignupPage){
        this.page = page; 
        this.signupPage = signupPage;
        this.homepagelogo = page.getByAltText("Website for automation practice");
        this.loginSignuplink = page.getByText(" Signup / Login");
        this.loggedinas = page.locator('li >> b');
        this.deleteaccount = page.locator(".fa.fa-trash-o");
        this.logout = page.locator(".fa.fa-lock");
        this.contactuspagelink = page.locator(".fa.fa-envelope");
        this.homepagelink = page.locator(".fa.fa-home");
        this.testcaseslink = page.locator('//a[text()=" Test Cases"]');
        this.testcasespagetitle = page.locator(".title.text-center");
    }

    async deleteaccountfunc(){
        await this.deleteaccount.click();   //delete account
        await expect(this.signupPage.accountdeleted).toBeVisible();   //account deleted successfully
        await this.signupPage.continuebtn.click();
    }

}
export default HomePage;