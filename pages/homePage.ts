import { Locator, Page } from "playwright";

class HomePage{
    public page:Page;
    public homepagelogo:Locator;
    public loginSignuplink:Locator;

    constructor(page:Page){
        this.page = page; 
        this.homepagelogo = page.getByAltText("Website for automation practice");
        this.loginSignuplink = page.getByText(" Signup / Login");
    }


}
export default HomePage;