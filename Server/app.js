const express = require("express");
const path = require("path");
const db = require("./config/db.js");
const appRouter = require("./routes/index.js");
const cors = require("cors");
const dotenv = require("dotenv");
const { createAdminUser } = require("./scripts/setup.js");

dotenv.config();

db();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "views")));

app.use(express.json());
app.use(cors());
createAdminUser();

app.use("/api", appRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
