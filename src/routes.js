const crawler = require('./crawler');

module.exports = (app) => {
    app.get('/get-data',async  function (req, res) {
        //start crawler
        await crawler();
        res.send("working");
    });
}