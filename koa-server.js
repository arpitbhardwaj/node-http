const Koa = require('koa');
const Router = require('koa-router');
const HttpStatus = require('http-status');
const request = require('request');

const port = 8082
const app = new Koa();
const router = new Router();

/*app.use(async ctx => {
    ctx.body = 'Hello Koa';
});*/

router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello Koa'
    })
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
    })
    .get('/crash', async (ctx, next) =>{
        await next();
        const intentsList = await getAgentIntents();
        ctx.status = HttpStatus.OK;
        ctx.body = intentsList;
    });

const getAgentIntents = async () => {
    const intents = await requestIntents("xyz", "xyz", "xyz");
    return intents;
}

const requestIntents = (token, projectId, regionId) => {
    const options = {
        url: `https://${regionId}-dialogflow.googleapis.com/v2/projects/${projectId}/locations/${regionId}/agent/intents`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            response = undefined
            if (response && response.statusCode === 200) {
                const intentList = JSON.parse(body);
                const allowed = ['name', 'displayName'];
                const intents = _.map(intentList.intents, _.partialRight(_.pick, allowed));
                resolve(intents);
            } else if (/*response && Crashes Server*/response.statusCode === 404) {
                const errorMessage = JSON.stringify(body).error ? JSON.stringify(body).error.message : `Invalid regionId ${regionId}`;
                reject(errorMessage);
            } else {
                //const errorMessage = JSON.parse(body).error ? JSON.parse(body).error.message : 'Unknown error occurred while fetching intents';
                reject('Unknown error occurred while fetching intents');
            }
        });
    });
};

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => console.log('Koa Server is listening on port 8082'));