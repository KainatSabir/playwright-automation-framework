import { Locator, Page } from "playwright";
import SignupPage from "./signupPage";
import { expect } from "playwright/test";

class HomePage{
    public page:Page;
    private signupPage: SignupPage;
    public homepagelogo:Locator;
    public loginSignuplink:Locator;
    public loggedinas:Locator;
    public deleteaccount:Locator;

    constructor(page:Page, signupPage: SignupPage){
        this.page = page; 
        this.signupPage = signupPage;
        this.homepagelogo = page.getByAltText("Website for automation practice");
        this.loginSignuplink = page.getByText(" Signup / Login");
        this.loggedinas = page.locator('li >> b');
        this.deleteaccount = page.locator(".fa.fa-trash-o");
    }

    async deleteaccountfunc(){
        await this.deleteaccount.click();   //delete account
        await expect(this.signupPage.accountdeleted).toBeVisible();   //account deleted successfully
        await this.signupPage.continuebtn.click();
    }

}
export default HomePage;