const express = require('express')
const Joi = require('joi')
const router = express.Router()

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

router.get('/', (req, res) => {
    return res.send(courses)
})

router.get('/:id', (req, res) => {
    course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send('The course with the given ID was not found') ///404 code means not found

    return res.send(course)
})

router.post('/', (req, res) => {

    const validationResult = courseIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    var course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);

    return res.send(course)
})

router.put('/:id', (req, res) => {

    const validationResult = courseIsValid(req.body)
    if (validationResult !== true) return res.status(400).send(validationResult) // 400 code means bad request

    var course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    course.name = req.body.name

    return res.send(course)
})

router.delete('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    return res.send(course)
})

module.exports = router