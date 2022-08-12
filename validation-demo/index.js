const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongodbExercises01')
    .then(() => console.log('Connected to server ...'))
    .catch(err => console.log('Could not connected to server ...') )





const courseSchema = mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [ String ],
    date: { type: String, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        // name: 'Python Course new',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    })

    try {
        course.validate((err)=>{
            if(err) {
                // do some logic
            }
        })
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        console.log(ex.message)
    }
}

createCourse()