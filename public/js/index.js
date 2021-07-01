const socket = io();

// Templates
const listOfRoomsTemplate = document.querySelector('#rooms-list-template').innerHTML;

// Displaying active rooms

const rooms = [
    { roomname: 'Odessa' },
    { roomname: 'Kiev' },
    { roomname: 'Nikolaev' }
]
const html = Mustache.render(listOfRoomsTemplate, { rooms });

document.querySelector('#rooms-list').innerHTML = html;