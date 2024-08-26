import { Locator, Page } from "playwright";


class SignupPage{

    public page:Page;
    public signupName:Locator;
    public emailadd:Locator;
    public signupbtn:Locator;
    public signuptitle:Locator;
    public accountInfoPageText:Locator;
    public titleMr : Locator;
    public titleMrs : Locator;
    public gender:Locator;
    public name:Locator;
    public email:Locator;
    public password:Locator;
    public dropdownDay: Locator;
    public dropdownMonth : Locator;
    public dropdownYear : Locator;
    public newsletter : Locator;
    public specialOffers : Locator;
    public addressFirstName : Locator;
    public addressLastName : Locator;
    public company:Locator;
    public address : Locator;
    public address2 : Locator;
    public dropdownCountry : Locator;
    public state : Locator;
    public city : Locator;
    public zipcode : Locator;
    public mobile : Locator;


    constructor(page:Page){
        this.page = page
        this.signuptitle = page.getByText("New User Signup!");
        this.signupName = page.getByPlaceholder("Name");
        this.emailadd = page.getByTestId("signup-email");
        this.signupbtn = page.getByTestId("signup-button");
        this.accountInfoPageText = page.locator("//*[contains(text(), 'Enter Account Information')] ");
        this.titleMr = page.locator("//div[@id='uniform-id_gender1']");
        this.titleMrs = page.locator("//input[@value='Mrs']");
        this.gender = page.locator("#uniform-id_gender1");
        this.name = page.getByTestId("name");
        this.email = page.getByTestId("email");
        this.password = page.getByTestId("password");
        this.dropdownDay = page.locator("#days");
        this.dropdownMonth = page.locator("#months"); 
        this.dropdownYear = page.locator("#years");
        this.newsletter = page.getByText("Sign up for our newsletter!");
        this.specialOffers = page.getByText("Receive special offers from our partners!");
        this.addressFirstName = page.getByTestId("first_name");
        this.addressLastName = page.getByTestId("last_name");
        this.company = page.getByTestId("company");
        this.address = page.locator("#address1");
        this.address2 = page.locator("#address2");
        this.dropdownCountry = page.locator("#country");
        this.state = page.locator("#state");
        this.city = page.getByTestId("city");
        this.zipcode = page.getByTestId("zipcode");
        this.mobile = page.getByTestId("mobile_number");

    }

    async signupToApp(username:string,email:string){
       await this.signupName.fill(username);
       await this.emailadd.fill(email);
       await this.signupbtn.click();
    }

    async enterAccountInfo(title:string, name:string, password:string, day:string, month:string, year:string){
        const normalizedtitle = title.replace(/\./g , "").toLowerCase();
        if(normalizedtitle === "mr"){
            await this.titleMr.click();
        } else if(normalizedtitle === "mrs"){
            await this.titleMrs.click();
        }
        
        await this.name.fill(name);
        await this.password.fill(password);
        await this.dropdownDay.selectOption(day);
        const formattedmonth = await month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
        await this.dropdownMonth.selectOption(formattedmonth);
        await this.dropdownYear.selectOption(year); 
    
    }
    
}

export default SignupPage;
