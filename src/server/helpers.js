
//conviertiendo el formato timesstap a un formato legible aca se utiliza el paquete "moment"
const moment = require ("moment");
const { Timestamp } = require("mongodb");
const helpers ={};


helpers.timeago = Timestamp => {
   return moment(Timestamp).startOf("minute").fromNow(); //esta configuracion devuelve eltiempo que ha pasado tras lapublicacion
}


module.exports = helpers;