const express = require("express");
const controller = require("../controllers/motorcycleController");
const motorcycleRoutes = require("./motorcycleRoutes");
const cekApiKey = require("../middlewares/cekApiKey");

const router = express.Router();

router.get("/", controller.getInfo);
router.get("/brands", controller.getBrands);
router.post("/brands", cekApiKey, controller.createBrand);
router.use("/motorcycles", motorcycleRoutes);

module.exports = router;