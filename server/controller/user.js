const Router = require('koa-router');
const util = require('utility');

const model = require('../model');

const User = model.getModel('user');

const router = new Router({ prefix: '/api/v1' });

const _filter = { pwd: 0, __v: 0 };

const toMd5Pwd = pwd => {
  const salt = 'imthesuperhandsomeboy@ (●ﾟωﾟ●)';
  return util.md5(util.md5(pwd + salt));
};

const listUser = async ctx => {
  const users = await User.find({});
  ctx.body = {
    users
  };
};

const addUser = async ctx => {
  const { name, pwd, type } = ctx.request.body;
  const existData = await User.findOne({ name, pwd: toMd5Pwd(pwd) });
  if (Array.isArray(existData) && existData.length !== 0) {
    console.log('this user data is exist', existData);
    ctx.body = {
      statusCode: 302,
      msg: 'the user is exist'
    };
    return;
  }
  try {
    const userModel = new User({ name, type, pwd: toMd5Pwd(pwd) });
    const doc = await userModel.save();
    ctx.cookies.set('userid', doc._id); //set cooikes
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
  const doc = await User.findOne({ name, pwd: toMd5Pwd(pwd) }, _filter);
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
  if (!userid) {
    return (ctx.body = {
      statusCode: 400,
      msg: 'get cookies failed'
    });
  }
  try {
    const user = await User.findById(userid, _filter);
    return (ctx.body = {
      statusCode: 200,
      data: user
    });
  } catch (error) {
    return (ctx.body = {
      statusCode: 400,
      msg: 'failed in find user'
    });
  }
};

const updateUser = async ctx => {
  const userid = ctx.cookies.get('userid');
  if (!userid) {
    return (ctx.body = {
      statusCode: 400,
      msg: 'faid auth user'
    });
  }
  const updateData = ctx.request.body;
  let doc = await User.findOneAndUpdate({ _id: userid }, updateData);
  doc = Object.assign(
    {},
    {
      name: doc.name,
      type: doc.type
    },
    updateData
  );
  ctx.body = {
    statusCode: 200,
    data: doc
  };
};

const getListUser = async ctx => {
  console.log('ctx.query', ctx.params);
  const { type } = ctx.params;
  if (!type) {
    ctx.body = {
      statusCode: 400,
      msg: '获取参数错误'
    };
  }
  try {
    const docs = await User.find({ type });
    ctx.body = {
      statusCode: 200,
      data: docs
    };
  } catch (error) {
    ctx.body = {
      statusCode: 400,
      msg: 'get users failed'
    };
  }
};

router.get('/user', listUser);
router.post('/user', addUser);
router.post('/user/login', userLogin);
router.get('/user/cookieInfo', detectUserCookie);
router.post('/user/update', updateUser);
router.get('/user/list/:type', getListUser);

module.exports = router;
