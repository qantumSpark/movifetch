const express = require("express");
const router = express.Router();
const axios = require("axios");

const lang = "&language=en-US";

router.get("/:query", (req, res) => {
  console.log("request");

  const query = `&query=${req.params.query}`;
  console.log("Query ==> " + query);

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.KEY}${lang}${query}&include_adult=false`;
  console.log("Url builded ===> " + url);

  axios
    .get(url)
    .then(response => {
      let list = response.data.results;
      console.log("Request Succesful // Sending to client");

      res.json(list);
    })
    .catch(err => {
      res.send({ msg: "Error: " + err });
    });
});

router.get("/details/:id", (req, res) => {
  console.log("Request details for id: " + req.params.id);

  let url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.KEY}${lang}`;
  console.log("Url builded ===> " + url);

  axios
    .get(url)
    .then(response => {
      let detail = response.data;
      console.log("Request Succesful // Sending to client");

      res.json(detail);
    })
    .catch(err => {
      res.send({ msg: "Error: " + err });
    });
});

module.exports = router;
