const express = require("express");

const ScrapController = require("../controllers/scraps");

const router = express.Router();

router.get("", ScrapController.getScraps);

router.get("/:id", ScrapController.getScrap);
module.exports = router;
