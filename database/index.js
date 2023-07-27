const mongoose = require('mongoose');

// const mongoUs

const mongoUrl = 'mongodb://localhost:27017/chat';

module.exports = {

    async connect() {
        try {

            await mongoose.connect(mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');

        } catch (error) {
            console.log('Authentication failed for mongodb: ', error);
        }
    }
}






