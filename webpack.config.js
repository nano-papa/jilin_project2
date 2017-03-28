module.exports = {
    entry: "./js/main.js",
    output: {
        path: './js/',
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {test: /\.css$/, loaders: ["style", "css","postcss"], exclude: './node_modules/'},
            {test: /.(png)|(jpg)|(gif)$/, loader: 'url?limit=1000000', exclude: './node_modules/'}
        ]
    },
    postcss:[
        require('autoprefixer')({
            broswers:['last 5 versions']
        })
    ]

}