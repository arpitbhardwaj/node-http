const Koa = require('koa');
const Router = require('koa-router');

const port = 8082
const app = new Koa();
const router = new Router();

app.use(async ctx => {
    ctx.body = 'Hello Koa';
});

router
    .get('/users', (ctx, next) => {
        ctx.body = 'Get a random user'
    })
    .post('/users', (ctx, next) => {
        ctx.body = 'Add a user'
    })
    .put('/users', (ctx, next) => {
        ctx.body = 'Update the user'
    })
    .del('/users', (ctx, next) => {
        ctx.body = 'Delete the user'
    });

app.listen(port, () => console.log('Koa Server is listening on port 8082'));