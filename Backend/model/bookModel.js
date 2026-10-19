const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// หมวดหมู่ตามโจทย์ชุด A
const ALLOWED_CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุชื่อหนังสือ" },
        notEmpty: { msg: "ชื่อหนังสือต้องไม่เป็นค่าว่าง" },
        len: { args: [1, 150], msg: "ชื่อหนังสือต้องมีความยาว 1-150 ตัวอักษร" },
        customTrimCheck(value) {
          if (!value || value.trim().length === 0) {
            throw new Error("ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุข้อมูล");
          }
        },
      },
    },
    author: {
      // ผู้รับผิดชอบ: ผู้แต่ง (ชุดที่ 1)
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุชื่อผู้แต่ง" },
        notEmpty: { msg: "ชื่อผู้แต่งต้องไม่เป็นค่าว่าง" },
        len: { args: [1, 100], msg: "ชื่อผู้แต่งต้องมีความยาว 1-100 ตัวอักษร" },
        customTrimCheck(value) {
          if (!value || value.trim().length === 0) {
            throw new Error("ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุข้อมูล");
          }
        },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: {
          args: [ALLOWED_CATEGORIES],
          msg: `หมวดหมู่ต้องเป็นหนึ่งใน: ${ALLOWED_CATEGORIES.join(", ")}`,
        },
      },
    },
    publishedDate: {
      // วันที่: วันที่เผยแพร่ (ชุดที่ 1)
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุรายละเอียด" },
        len: {
          args: [1, 2000],
          msg: "รายละเอียดต้องมีความยาว 1-2,000 ตัวอักษร",
        },
        customTrimCheck(value) {
          if (!value || value.trim().length === 0) {
            throw new Error("ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุข้อมูล");
          }
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  },
);

module.exports = { Book, ALLOWED_CATEGORIES };
