const LiveReloadPlugin = require('webpack-livereload-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

dotenv.config();

module.exports = {
    entry: './client/index.jsx',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'stage-2']
                }
            },
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.FIREBASE_WEB_API_KEY': JSON.stringify(process.env.FIREBASE_WEB_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DB_URL': JSON.stringify(process.env.FIREBASE_DB_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    }

    // When we're in development, we can use this handy live-reload plugin
    // to refresh the page for us every time we make a change to our client-side
    // files. It's like `nodemon` for the front end!

    // The line below is disabled because it's killing server on Win environment for some reason
    // plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true})] : []
}