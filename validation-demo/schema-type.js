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
        uppercase: true
        // match: /pattern/   => validation base on regular expression
    },
    category: {
        type: String,
        enum: ['web', 'network', 'mobile'], // the string must one of these array item
        lowercase: true,
        trim: true // if we have padding around our string it will removed it
    },
    author: {
        type: String,
        trim: true // if we have padding around our string it will removed it
    },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                      const result = value && value.length > 0;
                      resolve(result);
                    }, 500);
                });
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
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: '.Net MAUI',
        author: '   Mosh   ',
        category: 'mobile',
        tags: ['fronent'],
        isPublished: true,
        price: 35.6
    })

    try {
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        for (field in ex.errors)
            //console.log(ex.errors[field])
            console.log(ex.errors[field].message)
    }
}

createCourse()