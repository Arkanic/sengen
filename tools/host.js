const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const config = require("../webpack/webpack.dev");

const app = express();

if(process.env.NODE_ENV = "development") {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler));
} else {
    app.use(express.static("build"));
}

app.listen(process.env.PORT || "8080", () => {
    console.log("Server Started.");
});