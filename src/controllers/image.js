const ctrl ={};
const path = require ("path");
const {randomNumber}= require("../helpers/libs");
const fs = require ("fs-extra");

const {Image} =  require ("../models");


ctrl.index = async(req, res)=>{
   const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean(); //método .lean() para obtener un objeto JavaScript puro en lugar de un documento Mongoose.
  console.log(image)
  res.render("partials/image", {image});
  


};

ctrl.create = async(req, res)=>{

  const saveImage = async ()=>{
    const imgUrl =randomNumber(); //nos devuelve un string aleatorio numeros y letras
    const  images =  await Image.find({filename:imgUrl});//validando nombres repetidos
    if(images.length>0){
     saveImage();
     
    } else {

    console.log(imgUrl);
    const imageTempPath = req.file.path;
   const ext = path.extname(req.file.originalname).toLowerCase(); // la extensión vaya dando solo el -png 
   const targetPath = path.resolve (`src/public/upload/${imgUrl}${ext}`) //

    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg"|| ext === ".gif"){
      await  fs.rename(imageTempPath, targetPath);//rename mueve un archivo de un directorio a otro

      const newImg = new Image({
        title: req.body.title,
        filename:imgUrl + ext,
        description: req.body.description
      });//crear un objeto neuvo para almacenar en la bd
       const imageSaved = await newImg.save(); //guardando el objeto en la bd
       res.redirect("/images/"+ imgUrl);
      // res.send ("funciona")
      
    } else{ //en caso no cumpla se eliminara de la carpeta temp
       await fs.unlink(imageTempPath);
       res.status(500).json({error:"solo imagenes en formato permitido"})
    }

   
};


  };
  saveImage()
   


    }
    

    
ctrl.like = (req, res)=>{
    
};
ctrl.comment = (req, res)=>{
    
};

ctrl.remove = async (req, res) => {
  try {
    // Buscar la imagen por el ID
    const image = await Image.findOneAndDelete({ filename: req.params.image_id });

    // Si no se encuentra la imagen
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    // Definir la ruta del archivo a eliminar
    const imagePath = path.resolve(`src/public/upload/${image.filename}`);

    // Eliminar el archivo físico
    await fs.unlink(imagePath);

   // Redirigir a la página principal
   res.status(200).json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la imagen" });
  }
};


module.exports = ctrl;