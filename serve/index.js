const path = require("path")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const route = require("./router/index")

const app = express();
app.use(express.json());

app.options("*", cors())

app.use(express.static(path.join(__dirname, 'client/public')))

route(app)

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.krtxo.mongodb.net/parallax?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`serve started on PORT ${PORT}`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
