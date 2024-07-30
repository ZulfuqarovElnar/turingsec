import { useCallback, useEffect, useState } from "react";
import * as io  from 'socket.io-client'

export const useSocket = (room) => {
   
    const [socket, setSocket] = useState();
    const [socketResponse, setSocketResponse] = useState({
        content: "",
        isReplied: "",
        replyToMessageId: "",
    });
    const [isConnected, setConnected] = useState(false);
    const sendData = useCallback(
        (payload) => {
            socket.emit("message", {
                content: payload.content,
                isReplied: payload.isReplied,
                replyToMessageId: payload.replyToMessageId,
            });
            console.log("I am here")
            useEffect(() => {

                const userDataString = localStorage.getItem("user");
                const userData = userDataString ? JSON.parse(userDataString) : null;
                const accessToken = userData?.accessToken;
                const s = io("http://localhost:6000", {
                    reconnection: false,
                    query: { room: room },
                    extraHeaders: {
                        Authorization: `Bearer ${accessToken}`,
                    },

                    transports: ['websocket'],
                });
                setSocket(s);
                // console.log(socket)
                s.on("connect", () => setConnected(true));
                s.on("error", (error) => {
                    console.error("Error received:", error);
                })
                s.on("message", (res) => {
                    console.log(res);
                    setSocketResponse({
                        content: res.content,
                        isReplied: res.isReplied,
                        replyToMessageId: res.replyToMessageId,
                    });
                });
                console.log(isConnected)
                return () => {
                    s.disconnect();
                };
            }, [room]);
        },
        
        [socket, room]
    );
     

    return { socketResponse, isConnected, sendData };
};