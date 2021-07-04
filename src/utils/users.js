const users = [{ id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'kiev' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'kiev' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'odessa' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'odessa' }, { id: 'HhO_wnIprKraVchGAAAD', username: 'eugenef', room: 'kiev' }];

// Get the list of unique rooms to render it dynamic on join page
const getUniqueRooms = () => {
    const uniqueRooms = [];
    
    users.forEach(userElement => {
        // Check for existing room
        const existingRoom = uniqueRooms.find(roomElement => {
            return userElement.room === roomElement.roomname;
        })

        // Validate data and fill up the uniqueRooms array
        if (!existingRoom) {
            uniqueRooms.push({ roomname: userElement.room })
        }
    })
    return uniqueRooms;
}

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

// Removing a user from users array
const removeUser = (id) => {
    // Find a user
    const index = users.findIndex(user => user.id === id)

    // Removing a user
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get a user from users array
const getUser = (id) => {
    return users.find(user => user.id === id);
}

// Get all users from one room
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