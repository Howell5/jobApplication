const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/job-chat';

mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
  console.log('mongodb connect succesd');
});
const models = {
  user: {
    name: { type: String, require: true },
    age: { type: Number, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    //头像
    avatar: { type: String },
    // 个人简介或者职位简介
    desc: { type: String },
    // 职位名
    title: { type: String },
    // 如果你是boss 还有两个字段
    company: { type: String },
    money: { type: String }
  },
  chat: {}
};

for (let m in models) {
  mongoose.model(m, mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};
