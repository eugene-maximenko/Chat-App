const socket = io();

socket.on('message', (greeting) => {
    console.log(greeting);
})

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count);
// })

// document
//     .querySelector('#increment')
//     .addEventListener('click', () => {
//         console.log('Clicked');
//         socket.emit('increment');
//     });

