const Router = require("@koa/router");
const {
  getClient,
  addClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const router = new Router();

router.get("/", getClient);
router.get("/:id", getClientById);
router.post("/", addClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = () => router.routes();
