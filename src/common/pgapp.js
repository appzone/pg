const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Express = require('express');
const Logger = require('morgan');

// const Session = require('express-session');
// const RedisStore = require('connect-redis')(Session);

class PgApp {

    constructor(port) {
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
   

    initSession() {
        let app = this.app;
        let properties = this.resources.getProperties();

        let redisStore = new RedisStore({
            client: this.resources.getRedis()
        });

        let session = Session({
            secret: properties.session_secret,
            cookie: {
                httpOnly : true,
                secure : true
            },
            proxy : true,
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

    initStatic(path) {
        this.app.use(Express.static(path));
    }

    initViews(path) {
        this.app.set('views', path);
        this.app.set('view engine', 'pug');
    }

    checkJsonValidity(req,res,next){
        console.log("check json " , req);
        var contype = req.headers['content-type'];
        console.log("con type ", contype);
        if (typeof contype != 'undefined')
        {
            if(contype.indexOf('application/json') !== 0)
            {
                console.log("skip not json");
            }
            else {
                console.log("check json" , req.body);
                try {
                    JSON.parse(JSON.stringify(req.body));
                    console.log("json is valid");
                }
                catch(e){
                    console.log("not valid json " , e);
                    return res.send(400);
                }
            }
        }
        next();

    }

    initMiddelware() {
        let app = this.app;
        console.log("init middle ware");

        app.use(Logger('dev'));
        app.use(BodyParser.json({limit:'10mb'}));
        app.use(BodyParser.urlencoded({extended: false}));
        app.use(BodyParser.text());
        app.use(CookieParser());
        app.set('trust proxy', 1);
        app.disable('x-powered-by');
        app.use(this.checkJsonValidity);

    }

    listen() {
        this.app.listen(this.port, () => console.log(`listening on port ${this.port}!`));
    }
}

module.exports = PgApp;
