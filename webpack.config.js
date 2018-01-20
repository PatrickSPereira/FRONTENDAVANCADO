const path = require("path");

module.exports = {
    entry: {
        sample1: "./src/index.ts"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loaders: ["ts-loader"] },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./www/js/"),
        publicPath: '/js'
    },
    devServer: {
        contentBase: path.resolve("./www"),
        compress: true,
        hot: true,
        port: 5000
    }
};