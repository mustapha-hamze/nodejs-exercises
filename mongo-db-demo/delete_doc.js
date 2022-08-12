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

async function deleteCourse(id) {

    const result = await Course.findByIdAndDelete(id)

    console.log(result)
}

deleteCourse('5a6900fff467be65019a9001')