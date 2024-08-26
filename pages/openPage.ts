import { Browser, BrowserContext, chromium, firefox, webkit, Page as PlaywrightPage } from 'playwright';

class BrowserManager {
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;

    constructor(private browserType: 'chromium' | 'firefox' | 'webkit' | 'chrome' , private headless: boolean = true) {}

    public async initialize() {
        try {
            this.browser = await this.launchBrowser(this.browserType, this.headless);
            this.context = await this.browser.newContext();
        } 
        catch (error) {
            console.error('Failed to initialize browser:', error);
        }
    }

    public async launchBrowser(browserType: 'chromium' | 'firefox' | 'webkit' | 'chrome', headless: boolean) {
        switch (browserType) {
            case 'chromium':
                return chromium.launch({ headless:false });
            case 'firefox':
                return firefox.launch({ headless:false });
            case 'webkit':
                return webkit.launch({ headless:false });
            case 'chrome':
                return chromium.launch({ headless:false, channel:'chrome' });
            default:
                throw new Error('Unsupported browser type');
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

export default BrowserManager;
