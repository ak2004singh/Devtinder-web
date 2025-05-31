import io from "socket.io-client"
export const socketconnection=()=>
{
    return io("http://localhost:3000");
}