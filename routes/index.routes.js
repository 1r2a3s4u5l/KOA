const Router = require("@koa/router");

const clientRoutes = require("./client.routes");

const router = new Router();

router.use("/api/client", clientRoutes());

module.exports = () => router.routes();
