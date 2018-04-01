const Router = require('koa-router');

const model = require('../model');

const User = model.getModel('user');

const router = new Router({ prefix: '/api/v1' });

const listUser = async ctx => {
  const users = await User.find({});
  ctx.body = {
    users
  };
};

const addUser = async ctx => {
  const data = ctx.request.body;
  const existData = await User.find(data);
  if (Array.isArray(existData) && existData.length !== 0) {
    console.log('this user data is exist', existData);
    ctx.body = {
      statusCode: 302,
      msg: 'the user is exist'
    };
    return;
  }
  try {
    await User.create(data);
    ctx.body = {
      statusCode: 200,
      msg: 'new user create successd'
    };
  } catch (err) {
    console.log('user create get error', err);
    ctx.body = {
      statusCode: 500,
      msg: 'create user get error'
    };
  }
};
const userLogin = async ctx => {
  const { name, pwd } = ctx.request.body;
  const doc = await User.findOne({ name, pwd });
  if (!doc) {
    return (ctx.body = {
      statusCode: 400,
      msg: '用户名或密码不存在'
    });
  }
  ctx.cookies.set('userid', doc._id);
  ctx.body = {
    statusCode: 200,
    data: doc
  };
};
const detectUserCookie = async ctx => {
  const userid = ctx.cookies.get('userid');
  console.log('11111', userid);
  if (!userid) {
    console.log('22222');
    return (ctx.body = {
      statusCode: 400,
      msg: 'get cookies failed'
    });
  }
  try {
    const user = await User.findById(userid);
    console.log('333333');
    return (ctx.body = {
      statusCode: 200,
      data: user
    });
  } catch (error) {
    console.log('44444');
    return (ctx.body = {
      statusCode: 400,
      msg: 'failed in find user'
    });
  }
};

router.get('/user', listUser);
router.post('/user', addUser);
router.post('/user/login', userLogin);
router.get('/user/cookieInfo', detectUserCookie);

module.exports = router;
