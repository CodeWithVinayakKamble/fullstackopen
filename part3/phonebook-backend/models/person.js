const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

console.log('Connecting to MongoDB Atlas...');

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log(`error coneccting to MongoDB ${error.message}`);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedobject) => {
        returnedobject.id = returnedobject._id.toString()
        delete returnedobject._id
        delete returnedobject.__v
    }
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;