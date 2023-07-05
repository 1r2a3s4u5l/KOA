const Koa = require("koa");
const config = require("config");

const cors = require("@koa/cors");

const bodyParser = require("koa-bodyparser");

const router = require("./routes/index.routes");

const app = new Koa();

const PORT = config.get("port") || 3030;

app.use(bodyParser());
app.use(cors());
app.use(router());

// // context => ctx

// app.use((ctx) => {
//   // console.log(ctx);
//   // console.log(ctx.req);
//   ctx.body = "Salom KOA";
// });

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-da ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
