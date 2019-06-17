const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const path = require("path");
const fs = require('fs')

// 您的antd-custom.less文件存在于何处
const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assets/less/antd.less'), 'utf8')
)

module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // 使你的antd自定义生效
    },
    webpack: (config,{ isServer }) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }
        config.resolve.alias['~'] = path.resolve(__dirname,"./");
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles))
                        return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })

        } else {
            
            // console.log("config",config.resolve.extensions,config.resolve);
        }
        return config
    }
})
