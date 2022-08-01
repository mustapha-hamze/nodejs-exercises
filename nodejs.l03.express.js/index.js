const startUpDebugger = require('debug')('app:startup') // we can define a namespace like app:startup 
// when we call this function with this argument, we got a function for writing
// messages in this namespace
const dbDebugger = require('debug')('app:db')

const Joi = require('joi')

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

console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
console.log(`Mail Server Password: ${config.get('mail.password')}`)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startUpDebugger('app is development mode')
    dbDebugger('app is development mode')
}

const courses = [{
        id: 1,
        name: 'Python'
    },
    {
        id: 2,
        name: 'Java Script'
    },
    {
        id: 3,
        name: 'C Sharp'
    }
]

const courseSchema = Joi.object({
    name: Joi.string().min(3).required()
})

function courseIsValid(course) {
    const {
        error
    } = courseSchema.validate(course)
    if (error) return error.details[0].message || true
}

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'My Express App',
        message: 'Hello'
    })
})

app.get('/api/courses', (req, res) => {
    return res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send('The course with the given ID was not found') ///404 code means not found

    return res.send(course)
})

app.post('/api/courses', (req, res) => {

    const validationResult = courseIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    var course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);

    return res.send(course)
})

app.put('/api/courses/:id', (req, res) => {

    const validationResult = courseIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    var course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    course.name = req.body.name

    return res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    return res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port} ...`))