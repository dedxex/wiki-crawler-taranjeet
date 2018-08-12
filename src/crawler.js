const Crawler = require('./methods/crawler');
const { WaitFor } = require('./methods/common');

const config = {
    headless : false,
    devtools : true,
    args : ['--no-sandbox']
};

async function crawler() {

    const crawler = new Crawler(config);

    await initRemedy();

    await process();

    await crawler.browser.close();

    /*
    ***** Methods
    */

    async function initRemedy() {
        await crawler.beforeEach();
    }

    async function process() {

        try{
            //visit the website

            await crawler.checkJQueryLoaded();


        }
        catch (e) {
            //If Error is encountered restart process
            await crawler.log("Error:"+e.message);
            await process();
        }
    }



}

module.exports = crawler;