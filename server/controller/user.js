const Router = require('koa-router');

const model = require('../model');

const User = model.getModel('user');

const router = new Router({ prefix: '/api/v1' });

const listUser = async (ctx, next) => {
  const users = await User.find({});
  ctx.body = {
    users
  };
  console.log('返回的response', ctx.response);
  next();
};

const addUser = async (ctx, next) => {
  const data = ctx.request.body;
  const existData = await User.find(data);
  if (Array.isArray(existData) && existData.length !== 0) {
    console.log('this user data is exist', existData);
    ctx.body = {
      statusCode: 302,
      msg: 'the user is exist'
    };
    return next();
  }
  try {
    await User.create(data);
    ctx.body = {
      statusCode: 200,
      msg: 'new user create successd'
    };
    next();
  } catch (err) {
    console.log('user create get error', err);
    ctx.body = {
      statusCode: 500,
      msg: 'create user get error'
    };
    next(err);
  }
};

router.get('/user', listUser);
router.post('/user', addUser);

module.exports = router;
