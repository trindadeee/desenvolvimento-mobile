import { io } from "socket.io-client";


const socket = io('http://26.142.65.14:3000');
socket.on('connect', () => {
    console.log('WebSocket connected ' + socket.connected);  // Corrigido para socket.connected
    console.log(socket.id);
});

socket.on("disconnect", () => {
    console.log(socket.connected);
});

const webSocket = {
    sendMessage: (message: any) => {
        socket.emit('chat', message);
    }
}

export {
    webSocket,
    socket
}
