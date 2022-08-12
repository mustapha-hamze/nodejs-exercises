const { Double } = require('bson')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/mongodbExercises01')
    .then(() => console.log('connected to database server ...'))
    .catch(() => console.log('could not connect to database server'))


const courseSchema = mongoose.Schema({
    tags: [String],
    date: { type: String, default: Date.Now},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    return await Course.find({isPublished: true, tags: 'backend'})
        .sort({name: 1}) // OR sort('-name')
        .select({name: 1, author: 1})
}

async function Run() {
    const courses = await getCourses()
    console.log(courses)
}

Run()