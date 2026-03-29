const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server running...");
});

app.listen(3000, () => console.log("Server started"));