const mongoose = require("mongoose");
const { database } = require("./keys");

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    
})
.then(() => console.log("Base de datos conectada"))
.catch(err => console.error("Error de conexión:", err));
