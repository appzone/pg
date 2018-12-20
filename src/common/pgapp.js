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
        this.app.use(BodyParser.json({ limit: '10mb' }))
        this.app.use(BodyParser.urlencoded({ extended: false }))
        this.app.use(BodyParser.text())
        this.app.use(CookieParser())
        this.app.set('trust proxy', 1)
        this.app.disable('x-powered-by')
    }

    listen() {
        this.app.listen(this.port, () => console.log(`listening on port ${this.port}!`))
    }
}

module.exports = PgApp
