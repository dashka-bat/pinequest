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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/company/all-users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Хэрэглэгчид авахад алдаа гарлаа:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      const res = await fetch(`/api/company/user/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Устгах үед алдаа гарлаа");
      }
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Устгах үед алдаа:", err);
    }
  };

  if (loading) return <p>Уншиж байна...</p>;

  return (
    <>
      <div className="flex justify-between">
        <div className="text-[20px] text-black">Нийт ажилтан</div>
      </div>

      <div className="h-[604px] bg-[#ECECEC] rounded-[20px] mt-[16px]">
        <div className="px-[12px] py-[12px]">
          <div className="bg-white flex h-[46px] justify-between items-center rounded-[8px]">
            <div className="flex gap-3 ml-2">
              <div className="text-[16px]">№</div>
              <div className="text-[#606060] text-[16px]">Нэр</div>
            </div>
            <div className="text-[#606060] text-[16px]">Имэйл хаяг</div>
            <div className="text-[#606060] text-[16px]">Огноо</div>
            <div className="text-[#606060] text-[16px] mr-2">Хянах</div>
          </div>
        </div>

       {users.map((user, index) => (
  <div
    className={`ml-[10px] mr-[10px] ${
      index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'
    }`}
    key={user._id}
  >
    <div className="grid grid-cols-[40px_1fr_2fr_2fr_40px] items-center h-[42px] border-b border-[#ECECEC] border-[0.5px] px-3">

      <div className="text-center text-[14px] text-black">{index + 1}</div>


      <div className="flex items-center gap-2 text-[14px] text-black">
        <img src="/Thankly.png" className="w-[20px] h-[20px] rounded-full" />
        {user.name}
      </div>

      <div className="ml-[170px] text-[14px] text-black">{user.email}</div>


      <div className="ml-[100px] text-[14px] text-black">
        {new Date(user.createdAt).toLocaleDateString()}
      </div>


      <button
        className="w-[14px] h-[14px] justify-self-end"
        onClick={() => handleDelete(user._id)}
      >
        <Trash2 size={14} />
      </button>
    </div>
  </div>
))}

      </div>
    </>
  );
}
