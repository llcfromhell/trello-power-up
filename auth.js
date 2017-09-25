var express = require('express');

var router = express.Router();
var request = require('request');

var credentials = {
    "grant_type": "client_credentials",
    "client_id": "Q45hYpz2UU6UTiPRp425b3HyehyK3eaq",
    "client_secret": "3m9w9gpTRTp5i5YBTwxj1OHsrmoOzTlL78PxXxhficfiKPZZSiCu6cwiUfBh4hsO",
    "audience": "https://app.rdstation.com.br/api/v2/"
}

router.post('/token', function (req, res, next) {
    request({
        method: 'POST',
        headers: [{ name: 'content-type', value: 'application/json' }],
        uri: 'https://rdstation.auth0.com/oauth/token',
        json: true,
        body: credentials
    }).pipe(res);
});

module.exports = router;