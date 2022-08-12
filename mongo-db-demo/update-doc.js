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

async function updateCourse_qf(id) {

    const course = await Course.findById(id)
    
    if(!course) return;

    course.isPublished = true
    course.author = 'Mustapha hamze'

    const result = await course.save()
    console.log(result)
}

//updateCourse_qf('5a68fde3f09ad7646ddec17e')

async function updateCourse_uf(id) {

    const result = await Course.updateOne({_id: id}, {
        $set: {
            author: "Mustapha Hamze",
            isPublished: false
        }
    })

    console.log(result)
}

//updateCourse_uf('5a68ff090c553064a218a547')

async function updateCourse_uf_object(id) {

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "Mustapha Hamze New Two",
            isPublished: false
        }
    }, {new: true})

    console.log(course)
}

updateCourse_uf_object('5a68ff090c553064a218a547')