function helloWorld(name) {
    console.log("Hello World " + name)
}

helloWorld("Mustapha Hamze")

// setTimeout(helloWorld('Mustapha Hamze STO'), 2000)

setInterval(function () {
    helloWorld('Mustapha Hamze ST')
}, 1000);