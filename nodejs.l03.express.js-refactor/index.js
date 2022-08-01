const startUpDebugger = require('debug')('app:startup') // we can define a namespace like app:startup 
// when we call this function with this argument, we got a function for writing
// messages in this namespace
const dbDebugger = require('debug')('app:db')

const courses = require('./routes/courses')
const home = require('./routes/home')

const logger = require('./middleware/logger')
const auth = require('./middleware/authentication')

const helmet = require('helmet')
const morgan = require('morgan')

const express = require('express')
const app = express()

const config = require('config')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())

app.use(logger)

app.use(auth)

app.use(express.static('public'))

app.use(helmet())

app.use('/api/courses', courses)

console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
console.log(`Mail Server Password: ${config.get('mail.password')}`)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startUpDebugger('app is development mode')
    dbDebugger('app is development mode')
}

app.use('/', home)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port} ...`))