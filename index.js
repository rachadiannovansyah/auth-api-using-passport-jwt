const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//API Server
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

//PASSPORT config
app.use(passport.initialize());
require("./config/passport")(passport);

//ROUTE Apis
app.use("/api/users", users);

//Server listen for
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));