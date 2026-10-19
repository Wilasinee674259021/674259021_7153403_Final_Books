const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const bookRouter = require("./router/bookRouter");
const Book = require("./model/bookModel");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ แก้ไขปัญหา CORS ให้ครอบคลุม Preflight (OPTIONS)
app.use(cors());
app.options("*", cors()); // อนุญาตทุก HTTP Request methods (GET, POST, PUT, DELETE, OPTIONS)

app.use(express.json());

// Routes
app.use("/api/books", bookRouter);

app.get("/", (req, res) => res.send("API Running OK"));

// Seed ข้อมูลอย่างน้อย 10 รายการ
const seedInitialData = async () => {
  try {
    const count = await Book.count();
    if (count === 0) {
      await Book.bulkCreate([
        {
          title: "การพัฒนาเว็บแอปพลิเคชันด้วย React",
          author: "สมชาย ใจดี",
          category: "เทคโนโลยี",
          publishedDate: "2026-01-15",
          description: "คู่มือพัฒนา React ขั้นพื้นฐานถึงขั้นสูง",
          status: true,
        },
        {
          title: "วิทยาศาสตร์ระบบสุริยะ",
          author: "วิภาดา สว่าง",
          category: "วิทยาศาสตร์",
          publishedDate: "2026-02-01",
          description: "เจาะลึกโครงสร้างดวงดาวและดาราศาสตร์",
          status: true,
        },
        {
          title: "สามก๊ก ฉบับแปลใหม่",
          author: "เจ้าพระยาพระคลัง (หน)",
          category: "วรรณกรรม",
          publishedDate: "2025-11-20",
          description: "วรรณกรรมจีนคลาสสิกทรงคุณค่า",
          status: true,
        },
        {
          title: "Node.js & Express RESTful API Guide",
          author: "อนันต์ สุขเสริฐ",
          category: "เทคโนโลยี",
          publishedDate: "2026-03-10",
          description: "การสร้าง REST API ด้วย Express.js",
          status: false,
        },
        {
          title: "ฟิสิกส์ควอนตัมสำหรับผู้เริ่มต้น",
          author: "ดร.กิตติพงษ์ วิชาการ",
          category: "วิทยาศาสตร์",
          publishedDate: "2026-01-05",
          description: "ความรู้พื้นฐานเกี่ยวกับฟิสิกส์สมัยใหม่",
          status: true,
        },
        {
          title: "ข้างหลังภาพ",
          author: "ศรีบูรพา",
          category: "วรรณกรรม",
          publishedDate: "2025-08-12",
          description: "นวนิยายรักโรแมนติกทรงคุณค่า",
          status: true,
        },
        {
          title: "การจัดการฐานข้อมูลด้วย Sequelize ORM",
          author: "ธนกฤต มั่นคง",
          category: "เทคโนโลยี",
          publishedDate: "2026-04-01",
          description: "เชื่อมต่อ PostgreSQL/MySQL ใน Node.js",
          status: true,
        },
        {
          title: "ชีววิทยาระดับเซลล์",
          author: "ผศ.ดร. นภา สว่าง",
          category: "วิทยาศาสตร์",
          publishedDate: "2025-12-18",
          description: "เจาะลึกกลไกการทำงานของเซลล์",
          status: false,
        },
        {
          title: "สี่แผ่นดิน",
          author: "ม.ร.ว.คึกฤทธิ์ ปราโมช",
          category: "วรรณกรรม",
          publishedDate: "2025-09-09",
          description: "เรื่องราวประวัติศาสตร์ผ่านชีวิตแม่พลอย",
          status: true,
        },
        {
          title: "Web Security Standard Practices",
          author: "ปรีชา มั่นคง",
          category: "เทคโนโลยี",
          publishedDate: "2026-02-28",
          description: "การป้องกันภัยคุกคามระบบเว็บ",
          status: false,
        },
      ]);
      console.log("✅ Seeded 10 initial records successfully.");
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};

// Sync DB & Start Server
sequelize
  .sync({ alter: false })
  .then(async () => {
    console.log("✅ Database connected & synced.");
    await seedInitialData();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
