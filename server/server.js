const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Chat = require('./model').getModel('chat');
const app = new koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const router = require('./router');
// const {} = require('../src/util')

io.on('connection', socket => {
  console.log('user login');
  socket.on('sendmsg', data => {
    console.log('sendmsg', data);
    const { targetUserId, sourceUserId, text } = data;
    const chatid = [targetUserId, sourceUserId].sort().join('_');
    Chat.create(
      { chatid, from: sourceUserId, to: targetUserId, content: text },
      (err, doc) => {
        if (!err) {
          console.log('!!!!!!!!err', doc);
          io.emit('recvmsg', Object.assign({}, doc._doc));
        }
      }
    );
  });
});

app.use(bodyParser());
app.use(router);

server.listen(9090, () => {
  console.log('****** Koa server run in localhost:9090 ******');
});
