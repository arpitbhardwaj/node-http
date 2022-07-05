const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});
app.listen(8082, () => console.log('Koa Server is listening on port 8082'));