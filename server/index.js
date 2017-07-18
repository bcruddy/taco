const bodyParser = require('body-parser'),
    express = require('express'),
    urlCleaner = require('express-url-cleaner'),
    helmet = require('helmet'),
    noSlash = require('no-slash');

const app = express();
const eventbright = require('./eventbright');

app
.use(helmet())
.use(urlCleaner())
.use(noSlash())

.get('/api/health', (req, res) => {
    return res.json({alive: true});
})

.use('/api/eventbright', eventbright);

// abstract this out into a separate file
app.listen(3009, () => {
    console.log('proxy server listening on 3009');
});
