const loaders = [{
    test: /\.ts$/,
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {esModules: true}
    },
    enforce: 'post',
    exclude: /node_modules|\.spec\.ts$/,
}];

module.exports = {
    module: {
        rules: loaders
    }
};