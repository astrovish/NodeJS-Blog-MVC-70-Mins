const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blogRoute");

// configuring path to .env file
dotenv.config({path: "./config/config.env"});

// creating an express application
const app = express();

// application listening on assigned port
const PORT = process.env.PORT || 3101;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`);
});

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log("Application successfully connected with database.");
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`);
})

// setting up view engine
app.set("view engine", "ejs");

// setting up, the name of folder to be use for views
app.set("views", process.env.VIEWS_FOLDER);

// using /public folder for static files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// home page
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Home Page"
    })
})

// blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.render("404", {
        pageTitle: "OOPS!! Page Not Found",
    })
})