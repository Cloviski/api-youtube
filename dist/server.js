"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const videos_routes_1 = require("./routes/videos.routes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
console.log(process.env.SECRET);
app.use(express_1.default.json());
app.use("/user", user_routes_1.userRoutes);
app.use("/videos", videos_routes_1.videosRoutes);
app.listen(4000);
// app.listen(4000) inside this is our port
// Browser has get route by default
//app.get() - this is how we create routes. Note inside () we put our route
// responde.json({name: 'Godielvs', age: 22}) - send user data
// npm i nodemon -D
// Note: -D means install this dependence when we are on ongoing progress
// npm run dev
// Route Params - Give some value via route. Ex: localhost:4000/userdata/69420
// Query Params - Doesn't need to wait the route localhost:4000/userdata/69420/votecume@hotmail.com?name=Godielvs&age=20. The query param is after ?
/*app.get('/users', (request, response) => {
    response.json([{name: 'Godielvs', age: 33}, {name: 'JJ', age: 32}]);
})

app.get('/users/new', (request, response) => {
    response.json([{name: 'Godielvs', age: 33}, {name: 'JJ', age: 32}]);
})

app.post('/userdata/:id/:email', (request, response) => {
    console.log(request.body)
    console.log(request.params)
    console.log(request.query)
    console.log(request.headers)
    response.status(200).json({success: true})
})*/
/*app.get('/', (request, response) => {
    const { name, email, password } = request.body;
    pool.getConnection((err: any, connection: any) => {
        connection.query(
            '',
            [],
            (error, result, fields) => {

            }
        )
    })
})*/ //How a query params is made
// npm i uuid - unique id
// npm i bcrypt
// Type package needs to be "-D"
// JSON WEB TOKEN - Make op which the user must be authenticated Ex: j98t29tj2g8982jnhgh9
// Aall the things that make reference to the user must be in the folder "routes"
// Middleware: Something that stands in the middle. Ex: before made a video a need to do something, if the user is authenticated
// What are Ambient Variables? Variable that are store in the PC. Assign values that differ depending in what ambient is running
