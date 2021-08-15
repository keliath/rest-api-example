const express = require("express");

feedRoutes = require("./routes/feed");

const app = express();

app.use(
  //express.urlencoded({// x-www-form-urlencoded
  express.json({
    // application json
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * for all domains or domain1,domain2 for punctual domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Contet-Type, Authorization"); // or *
  next();
});

app.use("/feed", feedRoutes);
app.listen(8080);
