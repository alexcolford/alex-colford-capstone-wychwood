const express = require("express");
const app = express();
const usersRoutes = require("./routes/users");
const commentsRoutes = require("./routes/comments");
const productsRoutes = require("./routes/products");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/comments", commentsRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
