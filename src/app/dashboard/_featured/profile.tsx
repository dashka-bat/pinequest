
// app/profile/page.tsx

'use client';

import useSWR from 'swr';
import axios from 'axios';
import { User } from '../../../../mongodb/models/user'; 
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function HomePage() {
  const { data, isLoading } = useSWR('/api/auth', fetcher);
  const [imageUrl, setImageUrl] = useState('/pro1.png');
  const [showModal, setShowModal] = useState(false);




  const user: User | undefined = data?.success ? data.data.user : undefined;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploadedUrl = await uploadImageToCloudinary(file);
    if (uploadedUrl) {
      setImageUrl(uploadedUrl); 
      setShowModal(false); 
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const url = "https://api.cloudinary.com/v1_1/df88yvhqr/image/upload";
    const preset = "Thankly";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
  
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data.secure_url)
      return data.secure_url; 
      
    } catch (error) {
      console.error("Upload failed", error);
      return null;
    }
  };


  if (isLoading) return <p>Түр хүлээнэ үү...</p>;

  if (!user) return <p>Та нэвтрээгүй байна.</p>;


  return (
    <div className="w-[662px] mx-auto h-[600px] bg-[#fafafa]  p-6 rounded-lg shadow space-y-6 ">
        <div className="flex items-center justify-between bg-[#ffffff] rounded-lg p-4">
    <div className="flex items-center gap-4">
    <img
  src={imageUrl} 
  alt="Avatar"
  className="w-12 h-12 rounded-full object-cover"
/>
      <div>
        <div className="font-semibold">{user.name}</div>
        <div className="text-gray-600 text-sm">{user.email}</div>
      </div>
    </div>
    <button className="bg-[#FF8585] text-white text-sm px-4 py-1 rounded" onClick={() => setShowModal(true)}>
      Зураг солих
    </button>
  </div>
  {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white w-[320px] sm:w-[380px] p-6 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Зураг сонгох</h2>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FD6667]"
      />

      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(false)}
          className="text-sm text-red-500 hover:underline"
        >
          Болих
        </button>
      </div>
    </div>
  </div>
)}

  <div>
    <label className="block text-[#000000] text-sm mb-1">Утас</label>
    <div className="flex items-center rounded px-3 py-2 gap-2">
      <div className='flex items-center  mr-2 gap-2'>
      <img src="/tug.png" alt="Flag" className="w-6 h-4 mr-2 " />
      <ChevronDown />
      </div>
      <input
        type="text"
        value="99112875"
        className="flex-1 h-[55px] rounded-[8px] outline-none text-gray-800 bg-[#ffffff] pl-4"
        readOnly
      />
    </div>
  </div>

  <div className='flex flex-col gap-4'>
    <label className="block text-[#000000] font-semibold text-sm mb-1">Компани (id)</label>
    <input
      type="text"
      value={user.company || ''}
      className="w-full rounded-[8px] px-3 py-2 bg-white text-gray-800 outline-none h-[55px] "
      readOnly
    />
  </div>

  <div className="flex justify-between px-3 py-2 bg-white h-[81px] rounded-[8px] flex-col">
    <span className="text-[16px] text-[#000000] font-medium ">
      Нууцлалын бодлого
    </span>
    <div className='flex items-center gap-2 justify-center'>
        <span className="text-[12px] text-[#969696] ">
      Таны нэр,намайг, холбоос зэрэг зарим профайлын мэдээлэл хүн бүрт харагдах зөвшөөрөл байна уу?
    </span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer mb-4 peer-checked:bg-black after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
    </label>
    </div>
  </div>

    </div>
  );
}

