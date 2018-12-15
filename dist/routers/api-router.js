'use strict';

var Express = require('express');
var router = Express.Router();

router.get('/test', function (req, res) {

        res.send("Ok");
});

module.exports = router;