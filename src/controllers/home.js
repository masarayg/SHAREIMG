

const ctrl = {};
const  {Image}   = require ("../models")




ctrl.index = async(req, res) =>{
   const images = await Image.find().sort({Timestamp: -1}) //ordena
   console.log(images);
   //const {image} = res.render("partials/index", {images});
   res.render('partials/index', { images: images.map(image => image.toJSON()) });
}

module.exports = ctrl;