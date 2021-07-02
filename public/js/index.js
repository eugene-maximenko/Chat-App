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

window.onload = () => {
    let joinButton = document.querySelector('#join-button');

    joinButton.addEventListener('click', () => {
        console.log('Join button was clicked!');
        // window.location.href = 'http://localhost:3000/chat.html?asd'

        const username = document.querySelector('#username').value;
        const room = document.querySelector('#room').value;
        const selected = document.querySelector('#rooms').value;
        console.log(username, room, selected);

    });
}
/*
I need to add an event listener on join button in index.html (Done!)
Inside of the event listener I'll check if the fields were filled out and redirect the user.
I'll fill the query parameters on my own with the value from Room field or the value of select HTML element, so chat.js can get them as usual
*/