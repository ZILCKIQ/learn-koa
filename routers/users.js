import Router from 'koa-router';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MongoDB from '../module/MongoDrive.js';
import { SECRET, DB_URL, DB_NAME, COLLECTION_NAME, } from '../config/config.js';
import { Auth } from '../module/middleware.js';

const router = new Router();
const DB = new MongoDB(DB_URL, DB_NAME, COLLECTION_NAME);

//测试路由
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = { "msg": "router works..." };
})

//用户注册
router.post('/register', async ctx => {
    let findResult = await DB.findMany({ "username": ctx.request.body.username });
    if (findResult.length > 0) {
        ctx.body = { "msg": "用户名已存在" };
    } else {
        ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 10);
        ctx.body = ctx.request.body;
        let result = await DB.insterOne(ctx.request.body)
        if (result.result.ok) {
            ctx.body = { "msg": "注册成功" };
        }
    }
});

//登录验证
router.post('/login', async ctx => {
    let result = await DB.findOne({ "username": ctx.request.body.username });
    if (!result) {
        ctx.body = { "msg": "用户不存在" };
    } else if (bcrypt.compareSync(ctx.request.body.password, result.password)) {
        const payload = { username: result.username, status: true };
        const token = jwt.sign(payload, SECRET, { expiresIn: 60 * 60 });
        ctx.body = { "msg": "登录成功", "token": token };
    } else {
        ctx.body = { "msg": "密码或用户名错误" };
    }
});

//token验证
router.get('/profile', Auth, async ctx => {
    ctx.body = ctx.req.userInfo;
});

export default router.routes();