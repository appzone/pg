'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var Express = require('express');
var Logger = require('morgan');

// const Session = require('express-session');
// const RedisStore = require('connect-redis')(Session);

var PgApp = function () {
    function PgApp(port) {
        _classCallCheck(this, PgApp);

        this.port = port;
        this.app = Express();
        // this.initSession();
        this.initMiddelware();
        // if(staticPath) {
        //     this.initStatic(staticPath)
        // }

        // if(viewsPath) {
        //     this.initViews(viewsPath);
        // }
    }

    _createClass(PgApp, [{
        key: 'initSession',
        value: function initSession() {
            var app = this.app;
            var properties = this.resources.getProperties();

            var redisStore = new RedisStore({
                client: this.resources.getRedis()
            });

            var session = Session({
                secret: properties.session_secret,
                cookie: {
                    httpOnly: true,
                    secure: true
                },
                proxy: true,
                resave: true,
                saveUninitialized: true,
                store: redisStore
            });

            this.keycloak = new Keycloak({
                store: redisStore
            }, properties.keycloak.config);

            app.use(session);
            app.use(this.keycloak.middleware());
        }
    }, {
        key: 'initStatic',
        value: function initStatic(path) {
            this.app.use(Express.static(path));
        }
    }, {
        key: 'initViews',
        value: function initViews(path) {
            this.app.set('views', path);
            this.app.set('view engine', 'pug');
        }
    }, {
        key: 'checkJsonValidity',
        value: function checkJsonValidity(req, res, next) {
            console.log("check json ", req);
            var contype = req.headers['content-type'];
            console.log("con type ", contype);
            if (typeof contype != 'undefined') {
                if (contype.indexOf('application/json') !== 0) {
                    console.log("skip not json");
                } else {
                    console.log("check json", req.body);
                    try {
                        JSON.parse(JSON.stringify(req.body));
                        console.log("json is valid");
                    } catch (e) {
                        console.log("not valid json ", e);
                        return res.send(400);
                    }
                }
            }
            next();
        }
    }, {
        key: 'initMiddelware',
        value: function initMiddelware() {
            var app = this.app;
            console.log("init middle ware");

            app.use(Logger('dev'));
            app.use(BodyParser.json({ limit: '10mb' }));
            app.use(BodyParser.urlencoded({ extended: false }));
            app.use(BodyParser.text());
            app.use(CookieParser());
            app.set('trust proxy', 1);
            app.disable('x-powered-by');
            app.use(this.checkJsonValidity);
        }
    }, {
        key: 'listen',
        value: function listen() {
            var _this = this;

            this.app.listen(this.port, function () {
                return console.log('listening on port ' + _this.port + '!');
            });
        }
    }]);

    return PgApp;
}();

module.exports = PgApp;