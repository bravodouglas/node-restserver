const mongoose = require("mongoose");

const dbConecction = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la BD");
  }
};

module.exports = {
  dbConecction,
};
