var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const UserRoutes = require("./src/routes/userRoutes");
const supportRoutes = require("./src/routes/supportRoutes");
const teamRoutes = require("./src/routes/teamRoutes");

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
const PORT = 3001

// Allow CORS for specific origin
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // Include credentials (e.g., cookies)
  })
);

app.use("/api/team", teamRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/support", supportRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to APIs");
});
app.listen(PORT, '0.0.0.0',() => {
  console.log(`API is listening on port ${PORT}`);
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'testdb54',
//   port: '8889',
// })


// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_DATABASE || 'testdb54',
//   port: process.env.DB_PORT || '8889',
// })

//
// var db = mysql.createConnection({
//   host: 'test54.c580ccq46ol2.eu-north-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'admin123',
//   database: 'testdb54',
//   port: '3306'
// });



// app.post("/api/get_load", (req, res) => {
//   const { country_id=2,embassy_id=2 } = req?.body;
//   console.log('data',country_id,embassy_id)
//   let query = `SELECT * FROM visa WHERE country_id = ${country_id} AND embassy_id = ${embassy_id}`;
//   db.query(query, [country_id, embassy_id], function (err, result) {
//     return res.status(200).send({'code':'1','message':'success','data':result});
//     if (err) throw err;
//   });
// });

module.exports = app;


