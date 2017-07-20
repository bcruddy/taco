const bodyParser = require('body-parser'),
    express = require('express'),
    urlCleaner = require('express-url-cleaner'),
    helmet = require('helmet'),
    noSlash = require('no-slash');

const app = express();

app
.use(helmet())
.use(urlCleaner())
.use(noSlash())

.get('/api/health', (req, res) => {
    return res.json({alive: true});
})

// abstract this out into a separate file
app.listen(3009, () => {
    console.log('proxy server listening on 3009');
});
