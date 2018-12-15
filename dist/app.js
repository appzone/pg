'use strict';

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _apiRouter = require('./routers/api-router');

var _apiRouter2 = _interopRequireDefault(_apiRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const PgCommon = require('./common');
// const apiRouter = require('./routers/api-router');

var PgApp = new _common2.default.lib.PgApp(3000);

PgApp.app.get('/monitor', function (req, res) {
    res.send('Ok');
});

PgApp.app.use('/api', _apiRouter2.default);

PgApp.listen();