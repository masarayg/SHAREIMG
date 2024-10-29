const { Timestamp } = require("mongodb");
const mongoose = require ("mongoose");
const {Schema} = mongoose;
const path = require ("path");


const ImageSchema = new Schema ({
    title:{type: String},
    description:{type: String},
    filename: { type: String},
    Timestamp:{type: Date, default: Date.now}
    
});

ImageSchema.set('toJSON', { virtuals: true });
ImageSchema.set('toObject', { virtuals: true });

ImageSchema.virtual("uniqueId")
.get(function(){// le quitamos la extensión //variable virtual

    return this.filename.replace(path.extname(this.filename), "");
});

module.exports = mongoose.model ("Image", ImageSchema);



