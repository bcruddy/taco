const express = require('express'),
    router = express.Router(),
    fetch = require('node-fetch');

router.get('/events', (req, res, next) => {
    fetch('https://www.eventbriteapi.com/v3/users/me/owned_events', {
            headers: {
                Authorization: `Bearer ${process.env.EVENTBRITE_OCS_TOKEN}`
            }
        })
        .then(r => r.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(err.status || 500).json(err.message || 'No error message generated');
        });
});

module.exports = router;
