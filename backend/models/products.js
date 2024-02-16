const mongoose = require('mongoose');


const productsSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    catagory: {
        type: String,
        require: true
    },

    color: {
        type: String,
        require: true
    },

    image: {
        type: String,
        require: true
    },

    desc: {
        type: String,
        require: true
    }

})


const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
