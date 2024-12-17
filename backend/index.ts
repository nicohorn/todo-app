import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Todo app backend running in port: ${port}`);
});