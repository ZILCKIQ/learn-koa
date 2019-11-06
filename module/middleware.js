import jwt from 'jsonwebtoken';
import MongoDB from './MongoDrive.js';
import { SECRET, DB_URL, DB_NAME, COLLECTION_NAME } from '../config/config.js';

const DB = new MongoDB(DB_URL, DB_NAME, COLLECTION_NAME);

//token验证
export async function tokenAuth(ctx, next) {
    try {
        const raw = String(ctx.request.headers.authorization).split(' ').pop();
        const tokenData = jwt.verify(raw, SECRET);
        const userInfo = await DB.findOne({ username: tokenData.username });
        ctx.req.userInfo = userInfo;
        next();
    } catch (error) {
        ctx.body = { "msg": "无效的Token！" };
    }
}