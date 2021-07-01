const users = [{ id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'kiev' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'kiev' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'odessa' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'odessa' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'kiev' }];

const getUniqueRooms = () => {
    /* Мне нужно превратить  
    
    [ { id: '1lUZr3UKGhLKiyLeAAAH', username: 'фыва', room: 'фыва' } ] --> 
    [ { roomname: 'Odessa' } ]
    */
    const uniqueRooms = [{ roomname: '' }];

    users.forEach(userElement => {

        // console.log('Here is uniqueRooms arr at the beginning:', uniqueRooms);
        const existingRoom = uniqueRooms.find(roomElement => {
            return userElement.room === roomElement.roomname;
        })

        // Check the value of existingRoom
        // console.log(existingRoom);

        if (!existingRoom) {
            uniqueRooms.push({ roomname: userElement.room })
        }

        // console.log('Here is uniqueRooms arr at the end:', uniqueRooms);
    })
    return ('Here is uniqueRooms arr at the end:', uniqueRooms);
}

console.log('Here is a return value from users.js:', getUniqueRooms());

// Adding a user to the users array
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room };
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getUniqueRooms
}