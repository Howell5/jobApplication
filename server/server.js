const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const app = new koa();

app.use(bodyParser());
app.use(router);

app.listen(9090, () => {
  console.log('****** Koa server run in localhost:9090 ******');
});
