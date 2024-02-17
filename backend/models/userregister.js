const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userregisterSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    phone: {
        type: Number,
        require: true,
        unique: true
    },

    address: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]

})


userregisterSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();

})


userregisterSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        this.save();
        return token;
    } catch (error) {
        console.log(error, "error");
    }
}


const Userregister = mongoose.model("Userregister", userregisterSchema);


module.exports = Userregister;
