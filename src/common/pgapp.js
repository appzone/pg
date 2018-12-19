import BodyParser from 'body-parser'
import CookieParser from 'cookie-parser'
import Express from 'express'

class PgApp {

    constructor(port) {
        this.port = port
        this.app = Express()
        this.initMiddelware()
    }

    initMiddelware() {
        const app = this.app
        app.use(BodyParser.json({ limit: '10mb' }))
        app.use(BodyParser.urlencoded({ extended: false }))
        app.use(BodyParser.text())
        app.use(CookieParser())
        app.set('trust proxy', 1)
        app.disable('x-powered-by')
    }

    listen() {
        this.app.listen(this.port, () => console.log(`listening on port ${this.port}!`))
    }
}

module.exports = PgApp
