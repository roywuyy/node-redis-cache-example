//Import packages
const Koa = require("koa");
const fetch = require("node-fetch");
const redis = require("redis");
const app = new Koa();
const Router = require("koa-router")();

//Declare express server port and redis client port
const PORT = process.env.PORT || 3000;
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

//Create Redis client on Redis port
const redisClient = redis.createClient();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

//Make request to GitHub for data
async function getPublicReposNumber(ctx, next) {
    try {
        const { username } = ctx.params;
        console.log("username:", username);
        let data = null;
        //访问缓存，没有再请求
        await new Promise((resolve,reject)=>{
            try {
                redisClient.get(username, (error, cachedData) => {
                    if (error) throw error;
                    if (cachedData != null) {
                        data = cachedData;
                        console.log("use cache...",cachedData);
                    }
                    resolve()
                }); 
            } catch (error) {
                console.error('error',error);
            }
            
        })
        
        if(!data){
            console.log("requert github data...");
            const response = await fetch(`https://api.github.com/users/${username}`);
            data = await response.json();
            //set to redis
            redisClient.set(username,JSON.stringify(data),redis.print);
        }
        ctx.response.type = "json";
        ctx.response.body = data;
    } catch (error) {
        console.error('error',error);
    }
}
Router.get("/repos/:username", getPublicReposNumber);

app.use(Router.routes()).use(Router.allowedMethods());
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});