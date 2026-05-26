const express = require("express");
const cors = require("cors");

const resultsRoute = require("./routes/resultsRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/results", resultsRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});