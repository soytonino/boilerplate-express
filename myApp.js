require("dotenv").config();

let bodyParser = require("body-parser");
let express = require("express");
let app = express();
console.log("Hello World");

// Mount express.static() middleware
staticPath = __dirname + "/public";
app.use("/public", express.static(staticPath));

// Middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Route for GET /name
app
  .get("/name", (req, res) => {
    const firstName = req.query.first; // Extract first name from the query string
    const lastName = req.query.last; // Extract last name from the query string
    res.json({ name: `${firstName} ${lastName}` }); // Respond with JSON object
  })

  .post((req, res) => {
    const firstName = req.body.first; // Extract first name from the POST body
    const lastName = req.body.last; // Extract last name from the POST body
    res.json({ name: `${firstName} ${lastName}` });
  });

// POST handler at /name
app.post("/name", (req, res) => {
  const firstName = req.body.first; // Access first name from req.body
  const lastName = req.body.last; // Access last name from req.body
  res.json({ name: `${firstName} ${lastName}` }); // Respond with JSON object
});

// Middleware and route handler chained for the /now endpoint
app.get(
  "/now",
  (req, res, next) => {
    const date = new Date(); // Current date and time in UTC
    // Adjust time to UTC+1
    const offset = 1; // UTC+1 offset in hours
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);
    req.time = localTime.toString(); // Add the adjusted time to req.time
    next();
  },
  (req, res) => {
    res.json({ time: req.time }); // Respond with the adjusted time in JSON format
  }
);

// Echo server routey78
app.get("/:word/echo", (req, res) => {
  const word = req.params.word; // Extract the word from the route parameter
  res.json({ echo: word }); // Respond with a JSON object
});

// Respond to GET requests on the root path "/"
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

// Serve the index.html file for GET requests to "/"
absolutePath = __dirname + "/views/index.html";
app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

// Serve JSON with a conditional transformation based on MESSAGE_STYLE
app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

module.exports = app;
