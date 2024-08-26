import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import { chromium, firefox, webkit } from 'playwright'

test('login test', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const browserContext1: BrowserContext = await browser.newContext();
    const page:Page = await browserContext1.newPage();


   await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    const emailId:Locator = await page.locator("#input-email");
    const password:Locator = await page.locator("#input-password");
    const loginbtn:Locator = await page.locator("[value='Login']"); 


    await emailId.fill("pwtest@opencart.com");
    await password.fill("playwright@123");
    await loginbtn.click();

     const title = await page.title();
     console.log("title of page: ", title);

     await page.screenshot({path: 'homepage.png'});


     await expect(title).toEqual('Account Login');
     
     await browser.close();
});

test('select value from dropdown test', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const browserContext1: BrowserContext = await browser.newContext();
    const page:Page = await browserContext1.newPage();

 //   const username = 'admin';
   // const password = 'admin';
   // const authHeader = 'Basic ' + btoa(username+':'+password);

  //  page.setExtraHTTPHeaders({Authorization: authHeader});
 

//   await page.goto("https://the-internet.herokuapp.com/basic_auth");

  // await page.goto("https://www.orangehrm.com/en/30-day-free-trial/");
  // await page.locator('form#Form_getForm >> #Form_getForm_Name').fill("Kainat");
   
    const form = page.locator('form#Form_getForm');
    const buttonTrial = page.getByRole('button', {name:'Get Your Free Trial'});

    await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");
    const countrydropdown ="select#Contact_CountryCode";

    await page.selectOption(countrydropdown, {value : "AD"});

   
});


test('dropdown many elements', async()=>{

  const browser:Browser = await firefox.launch({headless:false});
  const browserContext2:BrowserContext = await browser.newContext();
  const newpage:Page= await browserContext2.newPage();

  await newpage.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");

    const countrydropdown ="select#Contact_CountryCode";
    const alloptions= await newpage.$$(countrydropdown + '> option');
    console.log(alloptions.length);

    for (const e of alloptions){
      const text = await e.textContent();

      if(text==="India"){
          newpage.selectOption(countrydropdown, {label: 'India'});
          break;
      }
    }
      await newpage.waitForTimeout(16000);
});

test('hover over elements', async()=>{

  const browser:Browser = await firefox.launch({headless:false});
  const browserContext2:BrowserContext = await browser.newContext();
  const newpage:Page= await browserContext2.newPage();

  await newpage.goto("https://www.spicejet.com/");
  /*const addons:Locator =*/ await newpage.getByText('Add-ons').first().hover();
  await newpage.getByText('Taxi').first().click();

    
      await newpage.waitForTimeout(10000);
});

test('clicks', async()=>{
  const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});
  const browserContext3:BrowserContext = await browser.newContext();
  const mypage:Page = await browserContext3.newPage();

  await mypage.goto('https://jqueryui.com/resources/demos/droppable/default.html');
  await mypage.locator("#draggable").dragTo(mypage.locator("#droppable"));

});