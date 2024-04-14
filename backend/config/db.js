const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database connected successfully`);
    })
    .catch((err) => {
      console.log(`Unable to connect with the database ${err}`);
    });
};

module.exports = connectDB;