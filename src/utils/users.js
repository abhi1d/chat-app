const users = []

// addUser, removeUser, getUser, getUserInRoom
const addUser = ({ id, username, room }) => {
    
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()


    // Validates the data
    if ( !username || !room ) {
        return {
            error: ' Username and room are required.'
        }
    }

    // Check for existing users
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    
    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)

    return {user}

}

const removeUser = (id) => {
    const index = users.findIndex( (user) => user.id === id )

    if (index !== -1) {
        return users.splice(index, 1)
    }


}

const getUser = (id) => {
    return users.find( (user) => user.id == id)


}

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter( ( user ) => user.room === room)
} 

// addUser({
//     id: 22,
//     username: 'Andrew',
//     room: '  South Philly'
// })

// addUser({
//     id: 42,
//     username: 'abhi',
//     room: 'South Philly'
// })

// addUser({
//     id: 32,
//     username: 'Andrew',
//     room: 'Center City'
// })



// console.log(users)

// const user = getUser(42)
// console.log(user)

// const userList = getUserInRoom('South Philly')
// console.log(userList)
// const removedUser = removeUser(22) 
// console.log(removedUser)
// console.log(users)


module.exports = {
    addUser,
    removedUser,
    getUser,
    getUserInRoom
}