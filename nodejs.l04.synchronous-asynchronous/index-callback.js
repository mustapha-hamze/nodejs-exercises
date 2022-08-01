

console.log('Before')
getUser(1212, (user)=> {
    console.log('User: ', user);
    getRepositories(user, (repositories)=> {
        console.log(`${user.username} Repositories: `, repositories)
    })
})
console.log('After')


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
