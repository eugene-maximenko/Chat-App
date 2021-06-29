/* 
Chat.js will gets the array with all active unique rooms
Chat.js will listen to an event with the array of all active unique rooms

Write a function, which will add unique rooms

*/

const rooms = [];

const addRoom = (roomname) => {
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
    const existingRoom = rooms.find(room => rooms.roomname === roomname);

    // Validate room
    if (existingRoom) {
        return {
            error: 'Room is in list!'
        }
    }

    // Store room
    const room = {roomname};
    rooms.push(room);

    console.log(rooms);
    
}

module.exports = {
    addRoom
}