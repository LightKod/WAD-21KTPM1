const mongoose = require('mongoose');

const connect=async () => mongoose.connect('mongodb://localhost:27017/midterm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))
module.exports = connect;