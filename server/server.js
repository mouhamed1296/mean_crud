const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:4200",
};

const db = require("./models");
//const { application } = require("express");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post("/addProduit", (req, res) => {
  console.log(req.body);
  //db.products(req.body).save();
  console.log(
    db.products.find({ libelle: "rrr" }, (err, products) => {
      console.log(products);
    })
  );
  res.json({ added: true });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
