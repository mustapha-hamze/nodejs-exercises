

// here we change our method to using async funtion
// here change callback method to promise method

console.log('Before')
//========CallBack Method==============
getUser(1212, (user)=> {
    console.log('User: ', user);
    getRepositories(user, (repositories)=> {
        console.log(`${user.username} Repositories: `, repositories)
    })
})

//========Promise Method===================
getUser(1212)
    .then(user => getRepositories(user))
    .then(repositories => console.log(repositories))
    .catch(err => console.log('Error', err.message))
    // with this implementation if an error occurs during of these async operation
    // tha catch function will be called, so we have single error handler any of the errors 
    // that come from this async operation

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, username: 'mustapha'})
        }, 2000)
    })
}

function getRepositories(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['rep01', 'repo2', 'repo3', 'repo4'])
        }, 2000);
    });
}

console.log('After')



