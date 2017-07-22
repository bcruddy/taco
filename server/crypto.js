const router = require('express').Router(),
    fetch = require('node-fetch'),
    catchHandler = require('./utils/api-error');

router.get('/eth', (req, res) => {
    fetch('https://api.gemini.com/v1/pubticker/ethusd')
        .then(r => r.json())
        .then(data => {
            const eth = {
                name: 'ETH',
                price: data.last,
                timestamp: data.volume.timestamp
            };
            res.json({ok: true, error: false, data: eth});
        })
        .catch(catchHandler(res));
});

router.get('/btc', (req, res) => {
    fetch('https://api.gemini.com/v1/pubticker/btcusd')
        .then(r => r.json())
        .then(data => {
            const btc = {
                name: 'BTC',
                price: data.last,
                timestamp: data.volume.timestamp
            };
            res.json({ok: true, error: false, data: btc});
        })
        .catch(catchHandler(res));
});

router.get('/ltc', (req, res) => {
    fetch('https://api.cryptonator.com/api/ticker/ltc-usd')
        .then(r => r.json())
        .then(({ticker, timestamp}) => {
            const ltc = {
                name: 'LTC',
                price: parseFloat(ticker.price, 10).toFixed(2),
                timestamp: timestamp * 1000
            };
            res.json({ok: true, error: false, data: ltc})
        })
        .catch(catchHandler(res));
});

module.exports = router;
