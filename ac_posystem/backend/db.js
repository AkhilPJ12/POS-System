import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
//Create a mysql pool and get access of mySQL
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "achievers_schema",
});
//get categories from mySQL database
app.get("/categories", (req, res) => {
  const q = "SELECT * FROM achievers_schema.categories";
  pool.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);

      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});
//get sub-categories with given categories id from mySQL database
app.get("/sub_categories/:id", (req, res) => {
  const sb_c =
    "SELECT * FROM achievers_schema.sub_categories WHERE c_id = " +
    req.params.id;
  pool.query(sb_c, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});
//test url to check
app.get("/", (req, res) => {
  res.json("Hello backend");
});

//check the connection
app.listen(8803, () => {
  console.log("Connect to backed");
});

//DATA coming from payment page get it here and send it to database to update the inventory
//fetch daata from front end
app.post("/updateInventory", function (req, res) {
  var countValue = req.body;
  for (var i of countValue) {
    let no_avail = i["no_avail"] - i["count"];
    let query =
      "update sub_categories set no_avail = " +
      no_avail +
      " where sc_id = " +
      i["sc_id"] +
      " and c_id = " +
      i["c_id"];
    console.log(query);
    pool.query(query, (err, data) => {
      if (err) {
        console.log("Error: ", err);
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
  console.log("99999 CountValue is", countValue);
});
