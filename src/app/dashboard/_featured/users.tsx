"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type User = {
  _id: string;
  company: string;
  name: string;
  email: string;
  role: string;
  allowPersonalData: boolean;
  isAdmin: boolean;
  createdAt: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/company/all-users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Хэрэглэгчид авахад алдаа гарлаа:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = ["№", "Нэр", "Имэйл хаяг", "Бүртгэгдсэн огноо", "Хянах"];

  return (
    <div className="rounded-[20px] shadow-sm overflow-hidden text-sm bg-gray-50 p-[10px] mt-6 ml-30 mr-16">
    <div className="grid grid-cols-[40px_1.5fr_2fr_2fr_50px] text-gray-400 font-normal px-4 py-3 border-b border-gray-100 rounded-[8px] bg-white">
      {columns.map((col, idx) => (
        <div key={idx}>{col}</div>
      ))}
    </div>

    <div className="bg-white w-auto h-auto rounded-lg mt-[10px]">
      {loading ? (
        <div className="text-center text-gray-400 py-6">Уншиж байна...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-6">Алдаа гарлаа. Сүлжээг шалгана уу.</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400 py-6">Хэрэглэгч олдсонгүй.</div>
      ) : (
        users.map((user, index) => (
          <div
            key={user._id}
            className="grid grid-cols-[40px_1.5fr_2fr_2fr_50px] px-4 py-3 border-t border-gray-100 text-gray-900 items-center"
          >
            <div>{index + 1}</div>

            <div className="flex items-center gap-2">
              <img src="/Thankly.png" className="w-[20px] h-[20px] rounded-full" />
              {user.name || "⏳"}
            </div>

            <div>{user.email || "—"}</div>

            <div>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("mn-MN")
                : "—"}
            </div>

            <button
              className="w-[20px] h-[20px] text-gray-500 hover:text-red-500"
              // onClick={() => handleDelete(user._id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);
  
}
