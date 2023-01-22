const express = require("express");

const PORT = 3001;

const app = express();

app.get("/api", (_req, res) => {
  res.json({ message: "Hello world!" });
});

app.listen(PORT, () => {
  console.log(`Server up and running and listening on ${PORT}`);
});