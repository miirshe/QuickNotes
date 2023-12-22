const mongoose = require('mongoose');
async function QuickNotesDB() {
    try {
        await mongoose.connect('mongodb+srv://miirshe:miirshe123@cluster.9rwb442.mongodb.net/QuickNotesDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Connect to database')
        }).catch((error) => {
            console.log(`Error connecting to database ${error.message}`)
        })
    } catch (error) {
        console.log('Error occurred while creating QuickNotes database', error.message);
    }
}

module.exports = QuickNotesDB;