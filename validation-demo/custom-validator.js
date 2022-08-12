const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongodbExercises01')
    .then(() => console.log('Connected to server ...'))
    .catch(err => console.log('Could not connected to server ...') )





const courseSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlenght: 5,
        maxlenght: 255,
        // match: /pattern/   => validation base on regular expression
    },
    category: {
        type: String,
        enum: ['web', 'network', 'mobile'] // the string must one of these array item
    },
    author: String,
    tags: {
        type: Array,
        validate: { // this sample of custom validation
            validator: function(value) {
                return value && value.length > 0
                //if value has Value, and the length property is greater than 0, then this property is valid
            },
            message: 'each course has to has atleast one tag'
        }
    },
    date: { type: String, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished }, // conditional required, when the isPublished is true, price will be required
        min: 10,
        max: 200
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: '.Net MAUI',
        author: 'Mosh',
        category: 'mobile',
        tags: [],
        isPublished: true,
        price: 35
    })

    try {
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        console.log(ex.message)
    }
}

createCourse()