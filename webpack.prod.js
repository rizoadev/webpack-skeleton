const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = (env) => {
  return merge(common(env), {
    mode: "production", //process.env.NODE_DEV
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true,
      }),
      new FaviconsWebpackPlugin({
        logo: "src/img/icon.png", // svg works too!
        mode: "light", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
        devMode: "light", // optional can be 'webapp' or 'light' - 'light' by default
        cache: true,
        publicPath: "/icons",
        outputPath: "icons/assets",
        favicons: {
          appName: "my-app",
          appDescription: "My awesome App",
          developerName: "Me",
          developerURL: null, // prevent retrieving from the nearest package.json
          background: "#fff",
          theme_color: "#f1ceaa",
          icons: {
            coast: false,
            yandex: false,
          },
        },
      }),
    ],
    module: {
      rules: [
        // SCSS
        {
          test: /\.scss$/,
          use: [
            // fallback to style-loader in development
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              "default",
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
        "...",
      ],
    },
  });
};
