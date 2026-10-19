import React, { useState, useEffect } from "react";

const CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

const BookForm = ({ currentBook, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "เทคโนโลยี",
    publishedDate: "",
    description: "",
    status: true,
  });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (currentBook) {
      setFormData({
        title: currentBook.title || "",
        author: currentBook.author || "",
        category: currentBook.category || "เทคโนโลยี",
        publishedDate: currentBook.publishedDate || "",
        description: currentBook.description || "",
        status: currentBook.status !== undefined ? currentBook.status : true,
      });
    } else {
      setFormData({
        title: "",
        author: "",
        category: "เทคโนโลยี",
        publishedDate: "",
        description: "",
        status: true,
      });
    }
    setValidationError("");
  }, [currentBook]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.description.trim()
    ) {
      setValidationError("ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุข้อมูล");
      return;
    }
    setValidationError("");
    onSubmit(formData);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.938rem",
    boxSizing: "border-box",
    marginTop: "0.375rem",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        marginBottom: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1rem 1.5rem",
          backgroundColor: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          {currentBook ? "แก้ไขข้อมูลหนังสือ" : "เพิ่มรายการหนังสือใหม่"}
        </h3>
        {currentBook && (
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#92400e",
              padding: "0.25rem 0.75rem",
              borderRadius: "20px",
              fontSize: "0.813rem",
              fontWeight: "600",
            }}
          >
            แก้ไข ID: #{currentBook.id}
          </span>
        )}
      </div>

      <div style={{ padding: "1.5rem" }}>
        {validationError && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fca5a5",
              padding: "0.75rem",
              borderRadius: "8px",
              marginBottom: "1.25rem",
              fontSize: "0.875rem",
            }}
          >
            {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                ชื่อหนังสือ <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                style={inputStyle}
                placeholder="กรอกชื่อหนังสือ"
                maxLength={150}
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>
                ผู้แต่ง <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="author"
                style={inputStyle}
                placeholder="กรอกชื่อผู้แต่ง"
                maxLength={100}
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>
                หมวดหมู่ <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="category"
                style={{ ...inputStyle, backgroundColor: "#ffffff" }}
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>
                วันที่เผยแพร่ <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="date"
                name="publishedDate"
                style={inputStyle}
                value={formData.publishedDate}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#f9fafb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  สถานะการเผยแพร่
                </span>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: formData.status ? "#059669" : "#6b7280",
                    }}
                  >
                    {formData.status ? "เผยแพร่" : "ฉบับร่าง"}
                  </span>
                </label>
              </div>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                รายละเอียด <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="กรอกรายละเอียดหนังสือ"
                maxLength={2000}
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button
              type="submit"
              style={{
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                border: "none",
                padding: "0.625rem 1.5rem",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "0.938rem",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)",
              }}
            >
              {currentBook ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}
            </button>
            {currentBook && (
              <button
                type="button"
                onClick={onCancel}
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "0.938rem",
                  cursor: "pointer",
                }}
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
