const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(
  ["/api"],
  createProxyMiddleware({
    target: "http://192.168.100.218:5138/",
    changeOrigin: true,
  })
);
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Handle requests to root and return the React app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, "192.168.100.218", () => {
  console.log(`Server is running on port ${port}`);
});
