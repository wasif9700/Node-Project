const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://Admin:jYUOFNf8Is1lXO0a@cluster0.0kvcbjd.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
const connectToDatabase = async () => {
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to database');
    } catch (error) {
      console.error('Error connecting to database', error);
    }
  };
connectToDatabase();





