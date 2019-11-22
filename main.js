// import http from 'http';
// import https from 'https';
// import fs from 'fs';
import Koa from 'koa';
// import sslify from 'koa-sslify';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Static from 'koa-static';
import api from './routers/api.js';
import { HTTP_PORT } from './config/config.js';

const app = new Koa();
const router = new Router();
// const SSLify = sslify.default;

router
    .use('/api', api);

app
    // .use(SSLify())
    .use(Static('./static'))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

// const SSL = {
//     key: fs.readFileSync('./ssl/harmonious.tech.key'),  //ssl文件路径
//     cert: fs.readFileSync('./ssl/harmonious.tech.pem')  //ssl文件路径
// };
app.listen(HTTP_PORT);
// http.createServer(app.callback()).listen(HTTP_PORT);
console.log(`http://localhost:${HTTP_PORT}`);
// console.log(`http://www.harmonious.tech:${HTTP_PORT}`);
// https.createServer(SSL, app.callback()).listen(HTTPS_PORT);
// console.log(`https://localhost:${HTTPS_PORT}`);
// console.log(`https://www.harmonious.tech:${HTTP_PORT}`);
