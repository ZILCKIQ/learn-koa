import http from 'http';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import sslify from 'koa-sslify';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Static from 'koa-static';
import users from './routers/users.js';
import { HTTP_PORT, HTTPS_PORT } from './config/config.js';

const app = new Koa();
const router = new Router();
const SSLify = sslify.default;

app
    .use(SSLify())
    .use(Static('./public'))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

router.get('/', async (ctx) => {
    ctx.body = { "msg": "Koa NodeJS Web Server" };
});

router
    .use('/users', users);

const SSL = {
    key: fs.readFileSync('./ssl/harmonious.tech.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/harmonious.tech.pem')  //ssl文件路径
};
http.createServer(app.callback()).listen(HTTP_PORT);
// console.log(`http://localhost:${HTTP_PORT}`);
console.log('http://www.harmonious.tech');
https.createServer(SSL, app.callback()).listen(HTTPS_PORT);
// console.log(`https://localhost:${HTTPS_PORT}`);
console.log('https://www.harmonious.tech');
