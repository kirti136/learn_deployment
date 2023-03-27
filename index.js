const express = require("express")
require("dotenv").config()
const { connectionDB } = require("./db")
const { userRouter } = require("./routes/user.route")
const { noteRouter } = require("./routes/note.route")
const { auth } = require("./middlewares/auth.middleware")
var cors = require('cors')

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

app.use("/user", userRouter);
app.use(auth)
app.use("/note", noteRouter);


// Server listening on port and connected to DB
app.listen(process.env.port, () => {
    connectionDB()
    console.log(`Server listening on port ${process.env.port}`);
})
