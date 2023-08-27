import express from "express";
import { userRoutes } from "./routes/user.routes";
import { videosRoutes } from "./routes/videos.routes";
import { config } from "dotenv";

const app = express();

config(); //AXIOS, keep that in mind. It'll make easier to make requests.
const cors = require("cors");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //It is permited receive request all over the place
  res.header(
    "Access-Control-Allow-Headres",
    "Origin, X-Requested-With, Context-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  ); //This line says what are the types of request that came to us
  next();
});

app.use(cors());

app.use(express.json());
app.use("/user", userRoutes);
app.use("/videos", videosRoutes);

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
