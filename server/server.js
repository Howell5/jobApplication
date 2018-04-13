import React from 'react';
// const koa = require('koa');
import koa from 'koa';
import send from 'koa-send';
import serve from 'koa-static';
import path from 'path';
import cors from 'koa2-cors';

import model from './model';
import router from './router';

import csshook from 'css-modules-require-hook/preset'; // import hook before routes
import assetHook from 'asset-require-hook';

//client
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import bodyParser from 'koa-bodyparser';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App';
import reducer from '../src/reducer';
import staticPath from '../build/asset-manifest.json';
assetHook({
  extensions: ['png']
});
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
  if (ctx.url.startsWith('/api/') || ctx.url.startsWith('/static/')) {
    return next();
  }
  const store = createStore(reducer, compose(applyMiddleware(thunk)));
  const context = {};
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const htmlRes = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="${staticPath['main.css']}">
    </head>
  
      <body>
      <div id="root">${markup}</div>
        <script src="${staticPath['main.js']}"></script>
      </body>
  
  </html>`;

  // await send(ctx, htmlRes);
  console.log('htmlresssssss', htmlRes);
  ctx.body = htmlRes;
  // await send(ctx, 'index.html', { root: 'build' });
});
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
);
app.use(serve(path.resolve('build')));
server.listen(9090, () => {
  console.log('****** Koa server run in localhost:9090 ******');
});
