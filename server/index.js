const Koa = require('koa')
const next = require('next')
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const koaLogger = require('koa-logger')
const router = require('./router')
const koa2Connect = require('koa2-connect');
const httpProxyMiddleware = require('http-proxy-middleware');

const devProxy = {
    '/api': {
        target: 'http://127.0.0.1:3100',
        changeOrigin:true,
        pathRewrite: {}
    }
}
const port = parseInt(process.env.PORT, 10) || 3100
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

function koaProxyMiddleware(context, options) {
    let proxy

    if (typeof options == 'string') {
        options = { target: options }
    }
    proxy = httpProxyMiddleware(context, options)

    return async function(ctx, next) {
        await koa2Connect(proxy)(ctx, next)
    }
}

app.prepare().then(() => {
    const server = new Koa()

    server.keys = ['some secret hurr'];
    server.use(koaSession({key:'123456'},server));
    //配置控制台日志中间件
    server.use(koaLogger())
    server.use(koaBody());

    server.use(router.routes())
    server.use(router.routes()).use(router.allowedMethods());
    if (dev && devProxy) {
        Object.keys(devProxy).forEach((context) => {
            server.use(koaProxyMiddleware(context, devProxy[context]))
        })
    }

    server.use((ctx,next) => {
        return handle(ctx.req, ctx.res)
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
