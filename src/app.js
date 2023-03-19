const express = require("express");

const fs = require("fs");

const multer = require("multer");

const upload = multer({ dest: "./uploads/imagenes" });

const exphbs = require("express-handlebars");

const hbs = exphbs.create();

const PORT = 8080;

const app = express();

const equipos = require("./data/equipos.json");

const findTeam = (id) => equipos.find((team) => team.id === id);

const addTeam = (newTeam) => {
  const teamData = fs.readFileSync("data/equipos.json");
  const team = JSON.parse(teamData);

  team.push(newTeam);
  const parsedTeam = JSON.stringify(team);
  /*
  fs.writeFile('./data/equipos.json', parsedTeam, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  */
  console.log(parsedTeam);
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.listen(PORT);

app.get("/", (req, res) => {
  const teams = JSON.parse(fs.readFileSync(`${__dirname}/data/equipos.json`));
  res.render("teamsOverview", {
    layout: "main",
    data: { total: teams.length, teams },
  });
});

app.get("/teamAdd", (req, res) => {
  res.render("teamAdd", {
    layout: "main",
  });
});

app.post("/teamAdd", upload.single("imagen"), (req, res) => {
  app.use(express.text({ type: "*/*" }));
  addTeam(req.body);
  res.render("teamAdd", {
    layout: "main",
  });
  res.redirect(`/teamView/${req.body.id}`);
});

app.get("/teamEdit/:id", (req, res) => {
  res.render("teamEdit", {
    layout: "main",
    data: findTeam(Number(req.params.id)),
  });
});

app.get("/teamView/:id", (req, res) => {
  res.render("teamView", {
    layout: "main",
    data: findTeam(Number(req.params.id)),
  });
});

app.use("/", (req, res) => {
  res.end("404 Not Found");
});
