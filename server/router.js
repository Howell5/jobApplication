const combineRouters = require('koa-combine-routers');
const userRouter = require('./controller/user');

const router = combineRouters([userRouter]);

module.exports = router;
