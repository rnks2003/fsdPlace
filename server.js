const express = require("express");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fsdPlace", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', new mongoose.Schema({userName: String, password: String, email: String, description: String, isAdmin: Boolean, isActive: Boolean}));
exports.User = User;

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/html/index.html");
})

app.use(userRouter);

app.listen(port);