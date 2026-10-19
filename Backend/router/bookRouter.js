const express = require("express");
const router = express.Router();

// นำเข้า controller ด้วยการ destructure ฟังก์ชันออกมาให้ตรงกัน
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

// กำหนด Route พร้อมส่งฟังก์ชันเข้าไปเป็น Handler
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
