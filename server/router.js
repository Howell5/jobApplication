import userRouter from './controller/user';
import combineRouters from 'koa-combine-routers';
// const combineRouters = require('koa-combine-routers');
// const userRouter = require('./controller/user');

const router = combineRouters(userRouter);

// module.exports = router;
export default router;
