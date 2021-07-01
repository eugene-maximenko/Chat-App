const socket = io();

socket.emit('joinPageGreeting');

// Templates
const listOfRoomsTemplate = document.querySelector('#rooms-list-template').innerHTML;

// Displaying active rooms
socket.on('roomList', rooms => {
    console.log(`Already get the rooms array and now processing it =)`)
    const html = Mustache.render(listOfRoomsTemplate, { rooms });
    
    document.querySelector('#rooms-list').innerHTML = html;
})


// const rooms = [
//     { roomname: 'Odessa' },
//     { roomname: 'Kiev' },
//     { roomname: 'Nikolaev' }
// ]