
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { connection } = require("./DB/db");
const { auth } = require('./middleware/auth.middleware');
const { userRouter } = require('./routes/user.routes');
const { todoRouter } = require('./routes/todo.routes');

const {limiter} = require('./utils/ratelimiter');
const { logger } = require('./utils/logger');


const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send("Welcome To Task Management Backend Server 💖.")
})



app.use(limiter);
app.use(logger);

app.use("/user", userRouter);

app.use(auth);
app.use("/todotask", todoRouter);


app.all('*', (req, res) => {
    return res.send({
        "error": "Invalid URL Detected !"
    })
})

app.listen(process.env.port, async () => {

    try {
        await connection;
        console.log("Connected to DB Successfully. Server is running at port : 3001.");

    } catch (error) {
        console.log(error);
    }
})



