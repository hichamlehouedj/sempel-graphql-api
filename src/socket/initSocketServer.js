import { Server }               from "socket.io";
import { AuthMiddleware } from "../middlewares/authSocket";

// const io = new Server(httpServer, {
//     cors: ["http://localhost:5500"]
// });

// io.on("connection", (socket) => {
//     console.log("new user connected", socket.id);

//     socket.on("post-data", async (args) => {
//         console.log(args); // world
        
//         try {

//             let user =  await User.findOne({ where: { user_name: args.user_name } });

            
//             console.log(user);
//             if (user) { return socket.emit("data-respond", 'Username is already Exist.');}

//             user =  await User.findOne({ where: { id_person: args.id_person } });

//             console.log(user);

//             if (user) { return socket.emit("data-respond", 'Person is already registred.');}

//             // Hash the user password
//             let hashPassword = await hash(args.password, 10);

//             let result = await User.create({
//                 user_name: args.user_name,
//                 password: hashPassword,
//                 role: args.role,
//                 activation: args.activation,
//                 id_person: args.id_person
//             })

//             result = await serializeUser(result);

//             let token = await issueAuthToken(result);

//             return socket.emit("data-respond", {
//                 user: result,
//                 token: token
//             });
//         } catch (error) {
//             return socket.emit("data-respond", error.message);
//         }

//     });

// });

export class socketServer {

    constructor(httpServer) {
		this.io = new Server(httpServer, {
			path: "/socket.io/",
			cors: ["http://localhost:3000"]
		});
		
		//instrument(this.io, { auth: false })
		this.online_users = [];
		this.current_user = {};
	}

	socketConfig(){
		this.io.use( async (socket, next)=>{

			console.log(socket.handshake);

			let token = socket.handshake.headers.authorization || socket.handshake.auth.token ;

			const auth = await AuthMiddleware(token);
			socket['id'] = socket.handshake.query.user_id;

			if (!auth.isAuth || !auth.user) {
				console.log("not authorized");
				const err = new Error("not authorized");
				err.data = { content: "Please retry later" }; // additional details
				next(err);
			} else {
				next();
			}

			next();
		});
	}

    connection() {

		this.socketConfig();

		this.io.of("/socket-api").on('connection', async (socket)=>{
			
			this.current_user = socket.handshake.query;

			console.info('\a new visitor here as session => ', this.current_user);

			this.online_users = [];

			await (await this.io.fetchSockets()).map(socket => {
				this.online_users.push(socket.id)
			});

			console.log("\nonline_users ========> ", this.io.engine.clientsCount, "\n", this.online_users);

			socket.on("private message", (anotherSocketId, msg) => {
				let another_user = this.online_users.filter(user => {
					return user !== anotherSocketId
				});
				console.log("\nanother user", another_user);
				socket.to(another_user).emit("private message", socket.id, "test private message");
				console.info('\nprivate message => ', {anotherSocketId, msg});
			})

			this.socketDisconnect(socket);

		});
	}

	socketDisconnect(socket) {
		socket.on('disconnect',(data)=>{
			console.info('visitor disconnect');
			console.log(data)
		});
	}

}