


// var p1 = Promise.resolve({id: 1212}) // its mean the promise already resolved 
// p1.then(result => console.log(result))

// var p2 = Promise.reject(new Error('some error happened....')) // its mean the promise already rejected 
// p2.catch(err => console.log(err))


var p_fb = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(1)
    }, 2000)
})

var p_tw = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(2)
    }, 2000)
})

Promise.race([p_fb, p_tw])
    .then(result => console.log(result))

Promise.all([p_fb, p_tw])
    .then(result => console.log(result))






