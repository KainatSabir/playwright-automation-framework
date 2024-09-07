import { Locator, Page } from "playwright";
import SignupPage from "./signupPage";
import { expect } from "playwright/test";
import HomePage from "./homePage";
import { FileOptions } from "buffer";

class ContactusPage{
    private page:Page;
    private homePage:HomePage;
    public getintouchtxt:Locator;
    public name:Locator
    public email:Locator;
    public subject:Locator;
    public yourMsg:Locator;
    public chooseFile:Locator;
    public submitbtn:Locator;
    public successmsg:Locator;



    constructor(page:Page, homePage:HomePage) {
        this.page= page;
        this.homePage= homePage;
        this.getintouchtxt= page.locator('//h2[text()="Get In Touch"]');
        this.name = page.locator('[name="name"]');
        this.email = page.locator('[name="email"]');
        this.subject = page.locator('[name="subject"]');
        this.yourMsg = page.locator('[name="message"]');
        this.chooseFile = page.locator('[name="upload_file"]');
        this.submitbtn = page.locator('[name="submit"]');
        this.successmsg = page.locator('#success-subscribe');
    }

    async submitcontactform(name:string, email:string, subject:string, msg:string){
        await this.name.fill(name);
        await this.email.fill(email);
        await this.subject.fill(subject);
        await this.yourMsg.fill(msg);

    }
}
export default ContactusPage;