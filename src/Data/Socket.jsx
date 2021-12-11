//IMPORT SOCKET
import io from 'socket.io-client';
import { SOCKETURL } from "../Config/api";
let socket;


export const initiateSocket = () => {
    socket = io(SOCKETURL);
    console.log(`Connecting socket...`);
    // if (socket && room) socket.emit('join', room);
}


export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}


export const userSocketInitiated = (userData) => {
    console.log(userData);
    if (!socket) 
    return (true);
    socket.emit('userSocketInitiated', { userId: userData });
}


// export const subscribeToChat = (cb) => {
//     if (!socket) return (true);
//     socket.on('chat', msg => {
//         console.log('Websocket event received!');
//         return cb(null, msg);
//     });
// }


export const bookingStatus = (id) => {
    if (!socket) 
    return (true);
    console.log(id,'bookingStatus');
    // socket.emit("getCurrentBookingStatus", { userId: id });
    socket.emit("getCurrentBookingStatus", { userId: id });
    socket.on('getCurrentBookingStatus', (data) => {
        // we get settings data and can do something with it
        console.log(data);
      });
    console.log("getCurrentBookingStatus" ,socket.emit("getCurrentBookingStatus"))
}
