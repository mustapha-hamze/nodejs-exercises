

// this is how to create a promise
const p = new Promise((resolve, reject) => { // here the state of promise is pending 
    // kick of some async work
    setTimeout(() => {
        //resolve(1) // here the state changed to fulfilled 
        reject(new Error('an error occurred!!!!')) // here the state changed to reject
    }, 2000)
})

// this is how to consume a promise
p.then(result => console.log('Result: ', result))
    .catch(err => console.log('Error: ', err.message))


