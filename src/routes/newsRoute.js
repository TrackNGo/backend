const express = require("express");
const router = express.Router();
const { fetchAndStoreNews, getStoredNews } = require("../controller/newsController");

router.post("/fetch-and-store-news", fetchAndStoreNews);
router.get("/get-stored-news", getStoredNews);

module.exports = router;