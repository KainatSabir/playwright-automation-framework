import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import SignupPage from "./signupPage";
import HomePage from "./homePage";

class LoginPage{

    public page:Page;
    private signupPage:SignupPage;
    private homePage:HomePage;
    public logintxt:Locator;
    public loginEmail:Locator;
    public loginPassword:Locator;
    public loginbtn:Locator;
    public incorrectEmailPasswordError:Locator;

    constructor(page:Page, signupPage: SignupPage, homePage:HomePage){
        this.page = page; 
        this.signupPage = signupPage;
        this.homePage = homePage;
        this.logintxt = page.getByText('Login to your account');
        this.loginEmail = page.getByTestId('login-email');
        this.loginPassword = page.getByTestId('login-password');
        this.loginbtn = page.getByTestId('login-button');
        this.incorrectEmailPasswordError=page.getByText('Your email or password is incorrect!');

    }

    async login(email:string, password:string){
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginbtn.click();
    }

}
export default LoginPage;