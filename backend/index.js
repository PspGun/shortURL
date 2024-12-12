const express = require("express");
const app = express();
const port = 8080;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const shortid = require("shortid");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/", express.static("public/build"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await prisma.url.findFirst({ where: { path: id } });
  res.redirect(data.url);
});

app.post("/shorten", async (req, res) => {
  const url = req.body.url;
  let path = req.body.path;

  if (!path) path = shortid.generate();

  console.log(req.body);
  await prisma.url.create({ data: { url, path } });
  res.send({
    url,
    path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
