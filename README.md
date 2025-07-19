
```
webpack-starter/
├── dist/               # Compiled output (auto-generated)
├── src/
│   ├── index.js        # JavaScript entry point
│   ├── styles.scss     # Example SCSS file
│   └── template.html   # HTML template for HtmlWebpackPlugin
├── webpack.config.js   # Webpack configuration
├── package.json        # NPM scripts and dependencies
└── README.md           # This documentation
```


## Webpack Configuration Overview

### Entry and Output

```js
entry: {
  bundle: path.resolve(__dirname, "src/index.js"),
},
output: {
  filename: "[name].[contenthash].js",
  path: path.resolve(__dirname, "dist"),
  clean: true,
},
```

* `entry`: Main JS file to start the dependency graph.
* `filename`: Output file with a content hash for cache-busting.
* `path`: Absolute path to `dist` directory.
* `clean`: Deletes old files in `dist` before each build.

---

### Loaders Configuration

```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
    {
      test: /\.(png|jpg|jpeg|svg|gif)$/i,
      type: "asset/resource",
      generator: {
        filename: "assets/[name][ext]",
      },
    },
  ],
},
```

* SCSS files are compiled and injected via `sass-loader`, `css-loader`, and `style-loader`.
* JavaScript files are transpiled with Babel (`@babel/preset-env`).
* Images are emitted to `assets/` using Webpack 5 asset modules.

---

### Plugins

```js
plugins: [
  new HtmlWebpackPlugin({
    title: "Webpack App",
    filename: "index.html",
    template: path.resolve(__dirname, "src/template.html"),
  }),
  new Dotenv()
],
```

* **HtmlWebpackPlugin** generates the final HTML file and injects the bundled JavaScript.
* **dotenv-webpack plugin** Loads environment variables from .env file into process.env

---

## Development Server

```js
devServer: {
  static: {
    directory: path.resolve(__dirname, "dist"),
  },
  port: 3000,
  open: true,
  hot: true,
  compress: true,
  historyApiFallback: true,
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
}
```

### Key Features

* **static**: Serves content from the `dist/` directory.
* **open**: Automatically opens the browser on server start.
* **hot**: Enables Hot Module Replacement (HMR).
* **compress**: Uses gzip compression for assets.
* **historyApiFallback**: Supports client-side routing (like React Router).
* **proxy**: Redirects API requests during development to avoid CORS issues. For example:

  * `GET /api/users` → `http://localhost:5000/users`

---

## Optimization for Production

```js
optimization: {
  splitChunks: {
    chunks: "all",
  },
  runtimeChunk: "single",
  usedExports: true,
  minimize: true,
  minimizer: [
    new TerserPlugin(),
    new CssMinimizerPlugin(),
  ],
},
```

### What It Does:

* **splitChunks**: Extracts common dependencies into separate chunks.
* **runtimeChunk**: Isolates Webpack runtime for better long-term caching.
* **usedExports**: Enables tree-shaking for unused code removal.
* **minimize**: Activates minification.
* **TerserPlugin & CssMinimizerPlugin**: Minifies JS and CSS for smaller bundle sizes.

---

## Available Scripts

```json
"scripts": {
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

---

## Installation Summary

### Core Dev Dependencies

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server \
html-webpack-plugin style-loader css-loader sass sass-loader \
babel-loader @babel/core @babel/preset-env
```

### Optimization Plugins

```bash
npm install --save-dev terser-webpack-plugin css-minimizer-webpack-plugin
```

---

## Learning Resources

* [Webpack Documentation](https://webpack.js.org/)
* [Babel Documentation](https://babeljs.io/)
* [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
* [SurviveJS - Webpack Guide](https://survivejs.com/webpack/)
* [Webpack Dev Server Proxy Docs](https://webpack.js.org/configuration/dev-server/#devserverproxy)

---
