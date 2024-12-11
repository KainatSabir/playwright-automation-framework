import { Locator, Page } from "playwright";

class CartPage{
    public page:Page;
    public cartPageLink:Locator;



    constructor(page:Page){
        this.page = page;
        this.cartPageLink =page.locator('//li/a').filter({hasText: " Cart"});
    }

}
export default CartPage;