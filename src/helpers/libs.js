//tendra funciones para reutilizar
const helpers={};

helpers.randomNumber =()=>{
    const possible ="abcdefghijklmnopqrstuvwxyz0123456789"
    let randomNumber = 0;
    for (let i=0; i <6; i++){
      randomNumber +=  possible.charAt( Math.floor( Math.random()* possible.length))//devuelve numeros randoms del0 al 1

}
return randomNumber;
};

module.exports = helpers;