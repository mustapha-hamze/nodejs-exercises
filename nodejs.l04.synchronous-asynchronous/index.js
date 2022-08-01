// console.log('Before')

// setTimeout(() => {
//     console.log('Reading from database .....')
// }, 2000)

// console.log('After')


// console.log('--------------------------')

// console.log('Before')
// getUser(1212, (user)=> {
//     console.log('User: ', user);
//     getRepositories(user, (repositories)=> {
//         console.log(`${user.username} Repositories: `, repositories)
//     })
// })
// console.log('After')



getUser(1212, displayUser)

function displayUser(user) {
    console.log('User: ', user);
    getRepositories(user, displayRepositories)
}

function displayRepositories(user, repositories) {
    console.log(user.username + ' Repositories: ', repositories)
}

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id, username: 'mustapha'})
    }, 2000)
}

function getRepositories(user, callback) {
    setTimeout(() => {
        callback(user, ['rep01', 'repo2', 'repo3', 'repo4'])
    }, 2000);
}



