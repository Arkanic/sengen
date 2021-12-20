const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    stats: {
        children: true
    },

    entry: {
        body: path.resolve(__dirname, "../src/index.ts")
    },
    output: {
        filename: "[contenthash].js",
        path: path.resolve(__dirname, "../build")
    },
    
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        moduleIds: "deterministic"
    },

    resolve: {
        extensions: [
            ".ts", ".tsx",
            ".js",
            ".css"
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-modules-typescript-loader",
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../src/assets"),
                    to: ""
                }
            ]
        }),
        new MiniCSSExtractPlugin({
            filename: "[contenthash].css"
        }),
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../src/templates/index.html"),
            chunks: ["body"],
            inject: "body"
        }),
        new CleanWebpackPlugin()
    ]
}