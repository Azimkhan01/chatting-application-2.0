const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const { default: redis } = require("./lib/Redis");

const app = express();

// Create HTTP server from Express
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = new Server(server, {
    cors: {
        origin: "*", // allow frontend
    },
});

const userToSocketId = new Map();
const SocketIdToUser = new Map();


// Normal Express route
app.get("/", (req, res) => {
    res.send("Express + Socket.IO is running 🚀");
});

// Socket.IO connection
io.on("connection", (socket) => {
    // console.log("Client connected:", socket.id);

    // Receive message from client
    // socket.on("message", (data) => {
    //     console.log(data);
    //     io.emit("message", data); // broadcast
    // });

    socket.on("new_user", (data) => {
        // console.log("name", data.name);
        userToSocketId.set(data.name, socket.id);
        SocketIdToUser.set(socket.id, data.name);
        socket.broadcast.emit("new_user_joined", { new_user: data.name, allUser: Object.fromEntries(userToSocketId) });
        socket.emit("new_user_added", { name: data.name, allUser: Object.fromEntries(userToSocketId), sucess: true });
    });

    socket.on('message', (data) => {
        // console.log(data);

        socket.broadcast.emit("message", data);
    })

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
    socket.on("typing_remove", (data) => {
        socket.broadcast.emit("typing_remove", data)
    });

    socket.on('typing_dev', (data) => {
        socket.to("dev").emit("typing_dev", data)
    });
    socket.on("typing_remove_dev", (data) => {
        socket.to("dev").emit("typing_remove_dev", data)
    });

    socket.on("join_room", (data) => {
        socket.join('dev');
        console.log(`${data.user} joined room dev`);
    });
    socket.on("leave_room", (data) => {
        socket.leave("dev");
        console.log(`${data.user} left dev`);
    });

    socket.on("private_message",(data)=>{
        // console.log(data);
        // let t = data
        // t.senderName = SocketIdToUser.get(data.socketId)
        io.to(data.to).emit("private_message", data);
    })

    // Disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        if (SocketIdToUser.has(socket.id)) {
            // console.log("Removing ",SocketIdToUser.get(socket.id));
            userToSocketId.delete(SocketIdToUser.get(socket.id));
            SocketIdToUser.delete(socket.id);
        }
    });
});

// Start server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
