const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { VueLoaderPlugin } = require("vue-loader");

const dirApp = path.join(__dirname, "src/pages");

/**
 * Webpack Configuration
 */
module.exports = (env) => {
  return {
    entry: {
      main: "./src/js/main.js",
      vendor: "./src/js/vendor.js",
    },
    output: {
      filename: "js/[name].min.js",
    },
    plugins: [
      // new VueLoaderPlugin(),

      // halaman index
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(dirApp, "index.pug"),
        minify: true,
        inject: true,
        chunks: ["main", "vendor"],
        cache: true,
      }),

      // new webpack.DefinePlugin({
      //   __VUE_OPTIONS_API__: false,
      //   __VUE_PROD_DEVTOOLS__: false,
      // }),
    ],

    module: {
      rules: [
        // PUG
        {
          test: /\.pug$/,
          oneOf: [
            // this applies to <template lang="pug"> in Vue components
            {
              resourceQuery: /^\?vue/,
              use: ["pug-plain-loader"],
            },
            // this applies to pug imports inside JavaScript
            {
              use: ["raw-loader", "pug-plain-loader"],
            },
          ],
        },
        // VUE
        // {
        //   test: /\.vue$/,
        //   loader: "vue-loader",
        // },
        // JS
        {
          test: /\.js$/,
          loader: "babel-loader",
        },
        // CSS
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
