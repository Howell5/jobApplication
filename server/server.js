import router from './router';
import React from 'react';
// const koa = require('koa');
import koa from 'koa';
import send from 'koa-send';
import serve from 'koa-static';
import path from 'path';
import fs from 'fs';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// const bodyParser = require('koa-bodyparser');
import bodyParser from 'koa-bodyparser';
import model from './model';

function App(props) {
  return (
    <div>
      <p>howell</p>
      <p>change change</p>
    </div>
  );
}

console.log('renderToString', renderToString(<App />));

const Chat = model.getModel('chat');
const app = new koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
// const router = require('./router');
// const {} = require('../src/util')

io.on('connection', socket => {
  console.log('user login');
  socket.on('sendmsg', data => {
    const { targetUserId, sourceUserId, text } = data;
    const chatid = [targetUserId, sourceUserId].sort().join('_');
    Chat.create(
      { chatid, from: sourceUserId, to: targetUserId, content: text },
      (err, doc) => {
        if (!err) {
          io.emit('recvmsg', Object.assign({}, doc._doc));
        }
      }
    );
  });
});

app.use(bodyParser());
app.use(router);
app.use(async (ctx, next) => {
  // if (ctx.request.url)

  if (ctx.url.startsWith('/api/') || ctx.url.startsWith('/static/')) {
    return next();
  }
  const filePath = path.resolve('build/index.html');
  await send(ctx, 'index.html', { root: 'build' });
  // const sendFile = async (file) => {
  //   const data = fs.readFile(file)
  // }
  // fs.readFile(path.resolve('build/index.html'), (err, data) => {
  //   console.log('===============get it', data);
  //   ctx.body = data;
  // });
  // app.use(serve('../build'));
  // send(ctx, '../build/index.html');
  // static()
  // ctx.type = 'html';
  // ctx.body = fs.createReadStream(path.resolve('build/index.html'));
});
app.use(serve(path.resolve('build')));
server.listen(9090, () => {
  console.log('****** Koa server run in localhost:9090 ******');
});
