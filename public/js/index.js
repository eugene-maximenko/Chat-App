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

    joinButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Join button was clicked!');

        const username = document.querySelector('#username').value;
        let room = document.querySelector('#room').value;
        const selected = document.querySelector('#rooms').value;

        if (room && selected !== "Choose your room") {
            return alert(`Please choose the room or only type it's name!`);
        }

        if (selected !== "Choose your room") {
            room = selected;
        }

        room = room;
        console.log(room);

        window.location.href = `http://localhost:3000/chat.html?username=${username}&room=${room}`

    });
}