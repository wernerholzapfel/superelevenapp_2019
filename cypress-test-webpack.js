const loaders = [{
    test: /\.ts$/,
    use: {
        loader: 'babel-plugin-istanbul',
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