const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//exclusively for heroku
const port = process.env.PORT || 3000

//setting up paths for views
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

//static hosting
app.use(express.static(publicDirectoryPath));

//most important step for setting up hbs and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Bhavesh Kushwaha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "HEYY THERE ARE YOU INJOYING THIS TECHNOLOGY",
    title: "HELP",
    name: "BHAVESH KUSHWAHA",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    msg: "CONTACT IF YOU NEED ANY HELP",
    title: "ABOUT ME",
    name: "BHAVESH KUSHWAHA",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
       error:"Please provide address",
    });
  }
  geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
    if (error) {
      return res.send({error:error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        forecast: forecastData,
        location,
        address:req.query.address
      })
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    msg: "Help article not found",
    name: "BHAVESH KUSHWAHA",
    title: "404 Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    msg: "Page not found",
    name: "BHAVESH KUSHWAHA",
    title: "404 Page Not Found",
  });
});

app.listen(port, () => {
  console.log("server is up on port "+port);
});
