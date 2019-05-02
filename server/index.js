require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4000;
const axios = require("axios");
const { AUTH_TOKEN, DM_ID } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/acclaim", (req, res) => {
  console.log(req.body);
  axios
    .get(
      `https://api.youracclaim.com/v1/organizations/${DM_ID}/badges?filter=query::${
        req.body.name
      }`,
      {
        headers: {
          Authorization: AUTH_TOKEN
        }
      }
    )
    .then(results => {
      // console.log(results.data.evidence);

      res.json(results.data);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
