const socket = io("http://localhost:4000/");




let form = document.getElementById("form")



function getInputs(params) {
    const user_name = document.getElementById("user_name").value
    const password = document.getElementById("password").value
    const role = document.getElementById("role").value
    const activation = document.getElementById("activation").value
    const id_person = document.getElementById("id_person").value

    console.log(user_name, password, role, activation, id_person);

    socket.emit("post-data", {
        "user_name": user_name, 
        "password": password, 
        "role": role, 
        "activation": activation, 
        "id_person": id_person
    });
}

socket.on("data-respond", (arg) => {
    console.log(arg); // world
})