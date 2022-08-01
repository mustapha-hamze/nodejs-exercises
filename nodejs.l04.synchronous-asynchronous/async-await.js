


async function displayRepositories() {
    try {
        var user = await getUser(1212);
        var repositories = await getRepositories(user);
        console.log(repositories)
    } catch (error) {
        console.log('Error', err.message)
    }
}

displayRepositories()

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



