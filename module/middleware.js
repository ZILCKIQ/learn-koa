import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.js';

//token验证
export async function tokenAuth(ctx, next) {
    try {
        const raw = String(ctx.request.headers.authorization).split(' ').pop();
        const tokenData = jwt.verify(raw, SECRET);
        ctx.req.tokenData = tokenData;
        await next();
    } catch (error) {
        ctx.body = { "msg": "无效的Token！" };
    }
}