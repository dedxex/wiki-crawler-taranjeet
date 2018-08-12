const puppeteer = require("puppeteer");
const { WaitFor } = require('./common');
//-------------------------------------------
class Crawler {

    constructor(config=null) {
        this.browser = {};
        this.page = {};
        this.error = "";
        this.config = config || {
            headless : true,
            args : ['--no-sandbox']
        };
    }

    async beforeEach() {

        console.log("Initialising browser and page");

        this.browser = await puppeteer.launch(this.config);

        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1366, height: 768});
        await this.page._client.send('Network.clearBrowserCookies');
    }

    async click(selector,page=this.page) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
            return true;
        }
        catch(e) {
            return false;
            throw new Error('Error : '+e.message);
        }
    }

    async selectAndType(selector,text) {
        try {
            await this.page.waitForSelector(selector);
            await this.page.click(selector);
            await this.page.keyboard.type(text);
            return true;
        }
        catch(e) {
            console.error("Error:SelectAndType",e.message);
            throw new Error('Error : '+e.message);
            return false;
        }
    }

    async selectOption(selector,value) {
        try {
            await this.page.waitForSelector(selector);
            await this.page.select(selector,value);
            return true;
        }
        catch(e) {
            console.log("Error:Select Option",e.message);
            throw new Error('Error : '+e.message);
            return false;
        }
    }

    async checkJQueryLoaded() {

        const that = this;

        const waitFor = new WaitFor();
        await waitFor.waitFor(check,()=> console.log(".."),15);

        async function check() {
            try{
                return await that.page.evaluate(() => {
                    let isLoaded = false;
                    if(!window.jQuery) isLoaded = false;
                    else isLoaded = true;
                    return isLoaded;
                });
            }
            catch (e) {
                console.log("Error in checking jQuery :"+e.message);
                return false;
            }
        }
    }

    async goTo(url) {
        await this.page.goto(url);
    }
}
//-------------------------------------------
module.exports = Crawler;
//-------------------------------------------