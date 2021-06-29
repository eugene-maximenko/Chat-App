/* 
Chat.js will gets the array with all active unique rooms
Chat.js will listen to an event with the array of all active unique rooms

Write a function, which will add unique rooms

*/

const rooms = [];

const addRoom = roomname => {
    console.log(rooms);
    // Clean the data
    roomname = roomname.trim().toLowerCase();

    // Validate the data
    if (!roomname) {
        return {
            error: 'Room is required!'
        }
    }

    // Check for existing room
    const existingRoom = rooms.find(room => room.roomname === roomname);

    // Validate room
    if (existingRoom) {
        return {
            error: 'Room is in list!'
        }
    }

    // Store room
    const room = { roomname };
    rooms.push(room);

    console.log(rooms);

}

const removeRoom = roomname => {
    console.log(rooms);
    const index = rooms.findIndex(room => room.roomname === roomname);

    if (index !== -1) {
        rooms.splice(index, 1);
        console.log(rooms);
    }
}
// const getRooms = ()

module.exports = {
    addRoom,
    removeRoom
}