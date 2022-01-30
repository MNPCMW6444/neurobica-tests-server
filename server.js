const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10004;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://keen-saha-4d5980.netlify.app"],
    credentials: true,
  })
);

mongoose.connect(
  process.env.MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.use("/user", require("./routers/userRouter"));
app.use("/opinion", require("./routers/opinionRouter"));
app.use("/certification", require("./routers/certificationRouter"));
app.use("/footer", require("./routers/footerRouter"));
app.use("/mofa", require("./routers/mofaRouter"));
