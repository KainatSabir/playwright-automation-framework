import { Browser, BrowserContext, chromium, firefox, webkit, Page as PlaywrightPage } from 'playwright';

class openPage {
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;

    constructor(private browserType: 'chromium' | 'firefox' | 'webkit' | 'chrome' , private headless: boolean = true) {}

    public async initialize() {
        try {
            switch (this.browserType) {
                case 'chromium':
                    this.browser= await chromium.launch({ headless:false });
                    break;
                case 'firefox':
                    this.browser= await firefox.launch({ headless:false });
                    break;
                case 'webkit':
                    this.browser= await webkit.launch({ headless:false });
                    break;
                case 'chrome':
                    this.browser= await chromium.launch({ headless:false, channel:'chrome' });
                    break;
                default:
                    throw new Error('Unsupported browser type');
            }
            this.context = await this.browser.newContext();
        } 
        catch (error) {
            console.error('Failed to initialize browser:', error);
        }
    }

    public async gotoUrl(url: string){
        if (!this.context) {
            throw new Error('Browser context is not initialized');
        }

        const page = await this.context.newPage();
        await page.goto(url);
        return page;
    }

    public async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

export default openPage;
