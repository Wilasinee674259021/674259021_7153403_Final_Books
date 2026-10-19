import React, { useState, useEffect } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../services/api";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import BookDetailModal from "../components/BookDetailModal";

const CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [editingBook, setEditingBook] = useState(null);
  const [viewBook, setViewBook] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await getBooks(search, selectedCategory);
      if (res.success) {
        setBooks(res.data);
      }
    } catch (err) {
      setErrorMsg("ไม่สามารถเชื่อมต่อระบบหลังบ้านได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, selectedCategory]);

  const handleClearFilter = () => {
    setSearch("");
    setSelectedCategory("");
  };

  const handleCreateOrUpdate = async (formData) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      if (editingBook) {
        const res = await updateBook(editingBook.id, formData);
        if (res.success) {
          setSuccessMsg("แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว");
          setEditingBook(null);
          fetchBooks();
        }
      } else {
        const res = await createBook(formData);
        if (res.success) {
          setSuccessMsg("เพิ่มข้อมูลหนังสือสำเร็จเรียบร้อยแล้ว");
          fetchBooks();
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
      setErrorMsg(msg);
    }
  };

  const handleDelete = async (book) => {
    const confirmed = window.confirm(
      `คุณต้องการลบหนังสือเรื่อง "${book.title}" ใช่หรือไม่?`,
    );
    if (!confirmed) return;

    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await deleteBook(book.id);
      if (res.success) {
        setSuccessMsg(`ลบหนังสือ "${book.title}" สำเร็จแล้ว`);
        fetchBooks();
      }
    } catch (err) {
      setErrorMsg("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };

  const totalBooks = books.length;
  const publishedBooks = books.filter((b) => b.status).length;
  const draftBooks = books.filter((b) => !b.status).length;

  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: "'Prompt', sans-serif",
        paddingBottom: "3rem",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
          color: "#ffffff",
          padding: "1.5rem 2rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontWeight: "700",
                fontSize: "1.5rem",
                letterSpacing: "-0.5px",
              }}
            >
              Book Management System
            </h2>
            <p
              style={{
                margin: "4px 0 0 0",
                opacity: 0.85,
                fontSize: "0.875rem",
              }}
            >
              รายวิชา 7153403 เทคโนโลยีการบริการเว็บ |
              ระบบบริหารจัดการข้อมูลหนังสือ
            </p>
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "1.25rem 1.5rem",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <span
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              หนังสือทั้งหมด
            </span>
            <div
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#111827",
                marginTop: "0.25rem",
              }}
            >
              {totalBooks}{" "}
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  fontWeight: "400",
                }}
              >
                รายการ
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#ffffff",
              padding: "1.25rem 1.5rem",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <span
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              สถานะเผยแพร่
            </span>
            <div
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#10b981",
                marginTop: "0.25rem",
              }}
            >
              {publishedBooks}{" "}
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  fontWeight: "400",
                }}
              >
                รายการ
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#ffffff",
              padding: "1.25rem 1.5rem",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <span
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              สถานะฉบับร่าง
            </span>
            <div
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginTop: "0.25rem",
              }}
            >
              {draftBooks}{" "}
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  fontWeight: "400",
                }}
              >
                รายการ
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div
            style={{
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #a7f3d0",
              padding: "0.875rem 1.25rem",
              borderRadius: "10px",
              marginBottom: "1.5rem",
              fontWeight: "500",
            }}
          >
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div
            style={{
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fca5a5",
              padding: "0.875rem 1.25rem",
              borderRadius: "10px",
              marginBottom: "1.5rem",
              fontWeight: "500",
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Form Component */}
        <BookForm
          currentBook={editingBook}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingBook(null)}
        />

        {/* Search & Filter Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "1.25rem",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="ค้นหาจากชื่อหนังสือ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "2",
              minWidth: "220px",
              padding: "0.625rem 1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.938rem",
              outline: "none",
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              flex: "1",
              minWidth: "180px",
              padding: "0.625rem 1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.938rem",
              outline: "none",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">-- แสดงทุกหมวดหมู่ --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleClearFilter}
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#f9fafb",
              color: "#374151",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ล้างการค้นหา
          </button>
        </div>

        {/* Table Component */}
        {loading ? (
          <div
            style={{ textAlign: "center", padding: "3rem 0", color: "#6b7280" }}
          >
            กำลังโหลดข้อมูลรายการหนังสือ...
          </div>
        ) : (
          <BookTable
            books={books}
            onViewDetail={(b) => setViewBook(b)}
            onEdit={(b) => setEditingBook(b)}
            onDelete={handleDelete}
          />
        )}

        <BookDetailModal book={viewBook} onClose={() => setViewBook(null)} />
      </div>
    </div>
  );
};

export default HomePage;
