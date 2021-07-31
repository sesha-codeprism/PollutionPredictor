const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/localstore";

const Init = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to store');
    } catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = Init;