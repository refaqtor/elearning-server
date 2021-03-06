'use strict';

var express = require('express');
var debug = require('debug')('elearning-login');
var redis = require('../helpers/redis');
var stringifier = require('../helpers/stringifier');
var config = require('../config')();

var router = express.Router();

router.post('/', function(req, res) {
    let sessionId = req.body.sessionId;
    if (!sessionId) {
        res.status(400).send(stringifier.stringify({
            message: 'No sessionId in request.'
        }));
        return;
    }
    redis.delete(sessionId, function(error) {
        let requestId = req.id;
        let errorMsg = stringifier.stringify(error);
        debug('Request ID: %s, redis.delete(%s) completed, error: %s', requestId, sessionId, errorMsg);
        if (error) {
            res.send(stringifier.stringify({
                resultCode: 1,
                errorMessage: config.mode === 'production' ? 'Logout failed because of an error. Request ID: ' + requestId : errorMsg
            }));
        } else {
            res.send(stringifier.stringify({
                resultCode: 0
            }));
        }
    });
});

module.exports = router;