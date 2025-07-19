const path = require("path"); // Core Node.js module for handling file paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate HTML with injected bundle
const Dotenv = require("dotenv-webpack"); // Plugin to load environment variables from .env files

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production"; // Check if the build is for production

    return {
        // Set the mode to 'development' for unminified code and better debugging.
        mode: isProduction ? "production" : "development",
        // Entry point where Webpack starts bundling
        entry: {
            bundle: path.resolve(__dirname, "src/index.js"), // Named entry point "bundle"
        },

        // Output configuration
        output: {
            // Output filename: [name] = 'bundle'; [contenthash] = cache-busting hash
            filename: "[name].[contenthash].js",

            // Output directory: absolute path to 'dist' folder
            path: path.resolve(__dirname, "dist"),

            // Clean the output directory before each build to remove old files
            clean: true,
        },

        module: {
            rules: [
                // Rule to handle .scss (SASS) files
                {
                    test: /\.scss$/, // Target all .scss files
                    use: [
                        "style-loader", // Injects styles into the DOM
                        "css-loader", // Interprets @import and url() like import/require()
                        "sass-loader", // Compiles SASS to CSS
                    ],

                    // Alternative for production: extract CSS to a separate file
                    // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                },

                // Rule to transpile JavaScript using Babel
                {
                    test: /\.js$/, // Target .js files
                    exclude: /node_modules/, // Skip transpiling libraries in node_modules
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"], // Transpile modern JS (ES6+) to older JS based on target environments
                        },
                    },

                    // Tip: Add '@babel/preset-react' if using React
                    // presets: ["@babel/preset-env", "@babel/preset-react"]
                },

                // Rule to handle image assets
                {
                    test: /\.(png|jpg|jpeg|svg|gif)$/i, // Match common image formats
                    type: "asset/resource", // Emits a file and returns the URL
                    generator: {
                        filename: "assets/[name][ext]", // Output path and naming for images
                    },

                    // Tip: Use 'asset' type for automatic inlining of small files
                    // type: 'asset',
                    // parser: { dataUrlCondition: { maxSize: 8 * 1024 } }
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack App", // Sets the document title
                filename: "index.html", // Output HTML filename
                template: path.resolve(__dirname, "src/template.html"), // HTML template to use
            }),
            new Dotenv(), // Loads environment variables from .env file into process.env

            // Tip: Add MiniCssExtractPlugin here in production to extract styles
            // new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
        ],

        // Enable source maps for easier debugging (maps compiled code back to source)
        devtool: "source-map", // Better quality than 'eval-source-map', suitable for dev or prod

        devServer: {
            static: {
                directory: path.resolve(__dirname, "dist"), // Serve static files from 'dist'
            },
            port: 3000, // Dev server runs on localhost:3000
            open: true, // Automatically open the browser
            hot: true, // Enable Hot Module Replacement (no full reloads)
            compress: true, // Enable gzip compression for assets
            historyApiFallback: true, // Support client-side routing (e.g. React Router)
            proxy: [
                {
                    context: ["/api"],
                    target: "http://localhost:5001",
                    changeOrigin: true,
                    secure: false,
                },
            ],
        },
    };
};
