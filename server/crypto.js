const router = require('express').Router(),
    fetch = require('node-fetch'),
    catchHandler = require('./utils/api-error');

router.get('/eth', (req, res) => {
    fetch('https://api.gemini.com/v1/pubticker/ethusd')
        .then(r => r.json())
        .then(eth => {
            eth.currency = 'ETH';
            res.json({ok: true, error: false, data: eth});
        })
        .catch(err => catchHandler(res, err));
});

router.get('/btc', (req, res) => {
    fetch('https://api.gemini.com/v1/pubticker/btcusd')
        .then(r => r.json())
        .then(btc => {
            btc.currency = 'BTC';
            res.json({ok: true, error: false, data: btc});
        })
        .catch(err => catchHandler(res, err));
});

module.exports = router;
