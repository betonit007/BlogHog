const mongoose = require('mongoose')

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,  //suggested options by mongodb response to be passed in
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log('MongoDB connect')
  } catch (error) {
    console.error(error.message);

    process.exit(1); //exit process with failure
  }
}

module.exports = connectDB