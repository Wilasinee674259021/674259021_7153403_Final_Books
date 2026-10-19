const { Op } = require("sequelize");
// ✅ แก้ไขบรรทัดนี้: เพิ่ม { Book } เพื่อรับค่าโมเดลให้ถูกต้อง
const { Book } = require("../model/bookModel");

// Helper: ตรวจสอบว่าเป็นจำนวนเต็มบวกหรือไม่
const isPositiveInteger = (val) => {
  const num = Number(val);
  return Number.isInteger(num) && num > 0;
};

// GET /api/books (อ่านรายการ / ค้นหา / กรอง) -> 200
exports.getBooks = async (req, res) => {
  try {
    const { search, category } = req.query;
    const whereCondition = {};

    if (search && search.trim() !== "") {
      whereCondition.title = { [Op.like]: `%${search.trim()}%` };
    }

    if (category && category.trim() !== "") {
      whereCondition.category = category.trim();
    }

    const books = await Book.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error("Error in getBooks:", error);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// GET /api/books/:id (อ่านรายละเอียดหนึ่งรายการ) -> 200 / 400 / 404
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "รหัสหนังสือต้องเป็นจำนวนเต็มบวกเท่านั้น",
      });
    }

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลหนังสือตามรหัสที่ระบุ",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// POST /api/books (เพิ่มรายการ) -> 201 / 400
exports.createBook = async (req, res) => {
  try {
    const { title, author, category, publishedDate, description, status } =
      req.body;

    if (
      !title ||
      typeof title !== "string" ||
      !title.trim() ||
      !author ||
      typeof author !== "string" ||
      !author.trim() ||
      !category ||
      typeof category !== "string" ||
      !category.trim() ||
      !publishedDate ||
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "ข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน (ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุข้อมูล)",
      });
    }

    const newBook = await Book.create({
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      status: status !== undefined ? Boolean(status) : true,
    });

    return res.status(201).json({
      success: true,
      message: "เพิ่มข้อมูลหนังสือสำเร็จ",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// PUT /api/books/:id (แก้ไขทุกฟิลด์) -> 200 / 400 / 404
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "รหัสหนังสือต้องเป็นจำนวนเต็มบวกเท่านั้น",
      });
    }

    const { title, author, category, publishedDate, description, status } =
      req.body;

    if (
      !title ||
      typeof title !== "string" ||
      !title.trim() ||
      !author ||
      typeof author !== "string" ||
      !author.trim() ||
      !category ||
      typeof category !== "string" ||
      !category.trim() ||
      !publishedDate ||
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "ข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน",
      });
    }

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลหนังสือที่ต้องการแก้ไข",
      });
    }

    await book.update({
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      status: status !== undefined ? Boolean(status) : book.status,
    });

    return res.status(200).json({
      success: true,
      message: "แก้ไขข้อมูลหนังสือสำเร็จ",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// DELETE /api/books/:id (ลบรายการ) -> 200 / 400 / 404
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "รหัสหนังสือต้องเป็นจำนวนเต็มบวกเท่านั้น",
      });
    }

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลหนังสือที่ต้องการลบ",
      });
    }

    await book.destroy();

    return res.status(200).json({
      success: true,
      message: "ลบข้อมูลหนังสือสำเร็จ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};
