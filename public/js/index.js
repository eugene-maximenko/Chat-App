// Setting up a connection with the server
const socket = io();

// Sending an event to the server in order to log out the new connection and get the event with the array of active rooms
socket.emit('joinPageGreeting');

// List of rooms template 
const listOfRoomsTemplate = document.querySelector('#rooms-list-template').innerHTML;

// Displaying active rooms
socket.on('roomList', rooms => {
    console.log(`Already get the rooms array and now processing it =)`)
    const html = Mustache.render(listOfRoomsTemplate, { rooms });

    document.querySelector('#rooms-list').innerHTML = html;
})

window.onload = () => {
    let joinButton = document.querySelector('#join-button');

    // Add a click event listener on join button
    joinButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Join button was clicked!');

        // Get the values of username, room and selected elements
        const username = document.querySelector('#username').value;
        let room = document.querySelector('#room').value;
        const selected = document.querySelector('#rooms').value;

        // Restrict user to fill room field and choose an option from select element at the same time 
        if (room && selected !== "Choose your room") {
            return alert(`Please choose the room or only type it's name!`);
        }

        // Assign the value of room variable either from selected element or room element
        if (selected !== "Choose your room") {
            room = selected;
        } else {
            room = room;
            console.log(room);
        }

        // Generate a link for redirecting
        window.location.href = `${window.location.href}chat.html?username=${username}&room=${room}`

    });
}