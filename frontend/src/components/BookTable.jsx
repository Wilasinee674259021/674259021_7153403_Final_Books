import React from "react";

const BookTable = ({ books, onViewDetail, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "3rem",
          textAlign: "center",
          border: "1px solid #e5e7eb",
        }}
      >
        <h4 style={{ margin: 0, color: "#4b5563", fontWeight: "600" }}>
          ไม่พบข้อมูลหนังสือ
        </h4>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          ไม่มีรายการที่ตรงกับเงื่อนไขการค้นหาของคุณ
        </p>
      </div>
    );
  }

  const getCategoryBadge = (cat) => {
    let bg = "#e0e7ff",
      color = "#3730a3";
    if (cat === "วิทยาศาสตร์") {
      bg = "#d1fae5";
      color = "#065f46";
    }
    if (cat === "วรรณกรรม") {
      bg = "#fef3c7";
      color = "#92400e";
    }
    return (
      <span
        style={{
          backgroundColor: bg,
          color: color,
          padding: "0.25rem 0.625rem",
          borderRadius: "6px",
          fontSize: "0.813rem",
          fontWeight: "600",
        }}
      >
        {cat}
      </span>
    );
  };

  const thStyle = {
    padding: "1rem",
    textAlign: "left",
    fontSize: "0.813rem",
    fontWeight: "600",
    color: "#4b5563",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e5e7eb",
  };

  const tdStyle = {
    padding: "1rem",
    fontSize: "0.938rem",
    borderBottom: "1px solid #f3f4f6",
    verticalAlign: "middle",
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        overflowX: "auto",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f9fafb" }}>
            <th style={{ ...thStyle, width: "70px" }}>ID</th>
            <th style={thStyle}>ชื่อหนังสือ</th>
            <th style={thStyle}>ผู้แต่ง</th>
            <th style={thStyle}>หมวดหมู่</th>
            <th style={thStyle}>วันที่เผยแพร่</th>
            <th style={thStyle}>สถานะ</th>
            <th style={{ ...thStyle, textAlign: "center", width: "220px" }}>
              การจัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td style={{ ...tdStyle, color: "#6b7280", fontWeight: "500" }}>
                #{book.id}
              </td>
              <td style={{ ...tdStyle, fontWeight: "600", color: "#111827" }}>
                {book.title}
              </td>
              <td style={{ ...tdStyle, color: "#4b5563" }}>{book.author}</td>
              <td style={tdStyle}>{getCategoryBadge(book.category)}</td>
              <td style={{ ...tdStyle, color: "#4b5563" }}>
                {book.publishedDate}
              </td>
              <td style={tdStyle}>
                {book.status ? (
                  <span
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "20px",
                      fontSize: "0.813rem",
                      fontWeight: "600",
                    }}
                  >
                    เผยแพร่
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: "#fee2e2",
                      color: "#991b1b",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "20px",
                      fontSize: "0.813rem",
                      fontWeight: "600",
                    }}
                  >
                    ฉบับร่าง
                  </span>
                )}
              </td>
              <td style={{ ...tdStyle, textAlign: "center" }}>
                <div style={{ display: "inline-flex", gap: "0.375rem" }}>
                  <button
                    onClick={() => onViewDetail(book)}
                    style={{
                      backgroundColor: "#0284c7",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.375rem 0.625rem",
                      borderRadius: "6px",
                      fontSize: "0.813rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    รายละเอียด
                  </button>
                  <button
                    onClick={() => onEdit(book)}
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.375rem 0.625rem",
                      borderRadius: "6px",
                      fontSize: "0.813rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => onDelete(book)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.375rem 0.625rem",
                      borderRadius: "6px",
                      fontSize: "0.813rem",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
