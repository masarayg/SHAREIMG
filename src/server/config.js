const express = require("express");
const path = require("path");
const exphbs  = require("express-handlebars").engine; // Importación correcta
const morgan = require("morgan");
const multer = require("multer");

const routes = require("../routes/index");
const errorHandler = require("errorhandler");



module.exports = app => {
    // settings
    app.set("port", process.env.PORT || 3000);
    app.set("views", path.join(__dirname, "../views"));
    app.engine(".hbs", exphbs({ 
        defaultLayout: "main",
        partialsDir: path.join(app.get("views"), "partials"),
        layoutDir: path.join(app.get("views"), "layouts"),
        extname: ".hbs",
        helpers: require("./helpers.js")
    }));
    app.set("view engine", ".hbs");

    // middlewares
    app.use(morgan("dev"));
    app.use(multer({ dest: path.join(__dirname, "../public/upload/temp") }).single("image"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // routes
    routes(app, );

    //static files

    app.use("/public", express.static(path.join(__dirname,"../public")));

    //errohandler
    if("development"=== app.get("env")){
        app.use(errorHandler);
    }

    return app;
};
