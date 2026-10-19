import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// อ่านรายการทั้งหมด / ค้นหา / กรอง
export const getBooks = async (search = "", category = "") => {
  const response = await api.get("/books", {
    params: { search, category },
  });
  return response.data;
};

// อ่านรายละเอียดรายการเดียว
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// เพิ่มรายการใหม่
export const createBook = async (data) => {
  const response = await api.post("/books", data);
  return response.data;
};

// แก้ไขข้อมูล
export const updateBook = async (id, data) => {
  const response = await api.put(`/books/${id}`, data);
  return response.data;
};

// ลบข้อมูล
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;
