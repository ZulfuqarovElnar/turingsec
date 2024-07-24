// import { useCallback, useEffect, useState } from "react";
// //import * as io from "socket.io-client";
// import { io} from "socket.io-client";

// export const useSocket = (room) => {
//     const [socket, setSocket] = useState();
//     const [socketResponse, setSocketResponse] = useState({
//         content: "",
//         isReplied: false,
//         replyToMessageId: null,
//     });
//     const [isConnected, setConnected] = useState(false);
//     const sendData = useCallback(
//         (payload) => {
//             socket.emit("send_message", {
//                 content: payload.content,
//                 isReplied: payload.isReplied,
//                 replyToMessageId: payload.replyToMessageId,
//             });
//         },
//         [socket,room]
//     );
//     useEffect(() => {
//         const userDataString = localStorage.getItem("user");
//         const userData = userDataString ? JSON.parse(userDataString) : null;
//         const accessToken = userData?.accessToken;
//         const s = io("http://localhost:6000", {
//             reconnection: false,
//             query: {room:room},  
//             extraHeaders: {
//                 Authorization: `Bearer ${accessToken}`,
//             },

//             transports: ['websocket'],
//         });
//         setSocket(s);
//         s.on("connect", () => setConnected(true));
//         s.on("read_message", (res) => {
//             console.log(res);
//             setSocketResponse({
                
//                 content: res.content,
//                 isReplied: res.isReplied,
//                 replyToMessageId: res.replyToMessageId,
//             });
//         });
//         return () => {
//             s.disconnect();
//         };
//     }, [room]);

//     return { socketResponse, isConnected, sendData };
// };