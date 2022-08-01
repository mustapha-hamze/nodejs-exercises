


const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to server ...'))
    .catch(err => console.log('Could not connected to server ...') )





const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: String, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Python Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    })

    const result = await course.save()
    console.log(course)
}

//createCourse()

async function getCourses() {
    var courses = await Course.find({author: 'Mosh'})
        .limit(10).sort({name: 1}) // 1 = ASC, -1 = DESC
        .select({name: 1, tags: 1}) // that or those property we want to show
    console.log(courses)

    var coursesCount = await Course.find({author: 'Mosh'}).count()
    console.log(coursesCount)
}

//getCourses()


async function pagination() {
    const pageNumber = 2
    const pageSize = 10
    var courses = await Course.find({author: 'Mosh'})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize).sort({name: 1})
    console.log(courses)
}

pagination()