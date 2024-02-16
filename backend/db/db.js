const mongoose = require('mongoose');
const db = process.env.DATABASE;


mongoose.connect(db).then(() => {
    console.log("connection successfull");
}).catch((error) => {
    console.log("no connection", error);
})
