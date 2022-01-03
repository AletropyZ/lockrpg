const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/lockrpg";

mongoose.connect(mongoURI).then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.log(err));

module.exports = mongoose;