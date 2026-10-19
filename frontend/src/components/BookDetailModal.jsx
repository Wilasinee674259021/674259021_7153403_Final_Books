import React from "react";

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(17, 24, 39, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
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
            รายละเอียดหนังสือ
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.25rem",
              cursor: "pointer",
              color: "#9ca3af",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <span
              style={{
                fontSize: "0.813rem",
                color: "#6b7280",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              ชื่อหนังสือ
            </span>
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#111827",
              }}
            >
              {book.title}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.813rem",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                ผู้แต่ง
              </span>
              <div
                style={{
                  fontSize: "0.938rem",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                {book.author}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.813rem",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                หมวดหมู่
              </span>
              <div
                style={{
                  fontSize: "0.938rem",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                {book.category}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.813rem",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                วันที่เผยแพร่
              </span>
              <div
                style={{
                  fontSize: "0.938rem",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                {book.publishedDate}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.813rem",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                สถานะ
              </span>
              <div
                style={{
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  color: book.status ? "#059669" : "#dc2626",
                }}
              >
                {book.status ? "เผยแพร่" : "ฉบับร่าง"}
              </div>
            </div>
          </div>

          <div>
            <span
              style={{
                fontSize: "0.813rem",
                color: "#6b7280",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              รายละเอียด
            </span>
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "0.875rem",
                color: "#4b5563",
                whiteSpace: "pre-line",
              }}
            >
              {book.description}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
            textAlign: "right",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#6b7280",
              color: "#ffffff",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
