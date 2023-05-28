const express = require("express");
const app = express();
app.use(express.json());
const Connector = require("./models/connector");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "8mb",
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", async (req, res) => {
  await Connector("book").insert({
    namaBook: "Pelajaran",
    hargaBeli: 134000,
  });

  app.get("/book", async (req, res) => {
    try {
      let book = await Connector("book");
      res.json(book);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/book", async (req, res) => {
    try {
      let namaBook = req.body.namaBook;
      let hargaBeli = req.body.hargaBeli;

      let id = await Connector("book").insert({
        namaBook: namaBook,
        hargaBeli: hargaBeli,
      });
      res.json({
        id: id[0],
        namaBook,
        hargaBeli,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

  app.put("/book/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let namaBook = req.body.namaBook;
      let hargaBeli = req.body.hargaBeli;

      await Connector("book").where("id", id).update({
        namaBook: namaBook,
        hargaBeli: hargaBeli,
      });
      res.json({
        id,
        namaBook,
        hargaBeli,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

  app.delete("/book/:id", async (req, res) => {
    try {
      let id = req.params.id;

      await Connector("book").where("id", id).del();
      res.json({
        id,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

  res.render("pages/index");
});

app.get("/hello", (req, res) => {
  res.render("pages/hello");
});

app.listen(4000, () => {
  console.log("Example app listening on port 3000!");
});
