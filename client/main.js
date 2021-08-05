
let url = new URL(window.location.href);
let user_id = url.searchParams.get("id_user") || 0;
let user_username = url.searchParams.get("user_username") || '';

const socket = io("http://localhost:4000/socket-api", {
    query: {
        "user_id": user_id,
        "user_username": user_username
    },
    extraHeaders: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoiaGljaGFtX2xlaG91ZWRqIiwicm9sZSI6ImFkbWluIiwiYWN0aXZhdGlvbiI6ImFjdGl2ZSIsImlkX3BlcnNvbiI6MSwiaWF0IjoxNjI3MjM4MDY5LCJleHAiOjE2Mjc4NDI4Njl9.T8VcCEeymelRD0se5RYHsxLsfW7t0ET8J1W-q0X232U"
    }
});

let form = document.getElementById("form")
let socket_id = null;

socket.on("connect", () => {
    socket_id = socket.id;

    console.log(socket_id);
    
    socket.emit("private message", socket_id, "test test test test test test test" );

    socket.on("private message", (anotherSocketId, msg) => {
        console.log('private message => ', {anotherSocketId, msg});
    })

    socket.onAny((eventName, ...args) => {
        console.log('Any event => ', eventName, args);
    });

    socket.prependAny((eventName, ...args) => {
        console.log('Any prepend => ', eventName, args);
    });

    //socket.removeAllListeners("private message")
});

socket.on("connect_error", (err) => {
    console.error(err);
});

// function getInputs(params) {
//     const user_name = document.getElementById("user_name").value
//     const password = document.getElementById("password").value
//     const role = document.getElementById("role").value
//     const activation = document.getElementById("activation").value
//     const id_person = document.getElementById("id_person").value

//     console.log(user_name, password, role, activation, id_person);

//     socket.emit("post-data", {
//         "user_name": user_name, 
//         "password": password, 
//         "role": role, 
//         "activation": activation, 
//         "id_person": id_person
//     });

// }

// socket.on("data-respond", (arg) => {
//     console.log(arg);
// })