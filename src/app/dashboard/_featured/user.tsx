'use client';

import Image from 'next/image';
import { useState ,useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';


type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
  }
  

const User = ({id}:any) => {
  const [isPublic, setIsPublic] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company/users/${id}`,);
        const data = await res.json();
        if (data.success) {
          console.log('User data:', data.user);
        } else {
          console.error('Error fetching user:', data.message);
        }
      } catch (error) { 
        console.error('Error fetching user:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-10">
      <section className="bg-blue-50 p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/profile.jpg"
            alt="User"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">Тэнгис</h2>
            <p className="text-sm text-gray-500">Tengis@gmail.com</p>
          </div>
        </div>
        <button className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md text-sm">
          Зураг солих
        </button>
      </section>

      <section className="space-y-6">
        <div>
          <label className="text-sm font-medium block mb-2">Утас</label>
          <div className="flex items-center gap-2">
            <Image src="/mn-flag.png" alt="Mongolia" width={24} height={24} />
            <Input type="tel" defaultValue="99112875" className="w-full" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Компани</label>
          <Input type="text" defaultValue="Moncarret" />
        </div>

        <div className="p-4 rounded-md border text-sm flex items-center justify-between">
          <div>
            <p className="font-medium">Нууцлалын бодлогын тухай</p>
            <p className="text-gray-500">
              Таны нэр,наци,холбоо зэрэг зарим профайлын мэдээлэл хүн бүрт харагдаж,зөвшөөрч байна
              уу?
            </p>
          </div>
          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Миний талархалууд</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg shadow-md overflow-hidden">
            <img
              src="party.png"
              alt="Birthday"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 text-sm">
              <div className='bg-[#F5F5F5] p-2 rounded-lg mt-2'>
              <p className="font-medium">Төрсөн өдрийн мэнд хүргэе</p>
              <p>Хулан “Чи үнэхээр хэрэгтэй шүү 🥳”</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-md p-4 text-sm">
          <div className='text-[16px] text-[#616161]'>Талархал бичих</div>
          <div className='bg-[#F5F5F5] p-2 rounded-lg mt-2'>
              <p className="font-medium">Төрсөн өдрийн мэнд хүргэе</p>
              <p>Хулан “Чи үнэхээр хэрэгтэй шүү 🥳”</p>
              </div>
          </div>

          <div className="rounded-lg shadow-md p-4 text-sm">
          <div className='text-[16px] text-[#616161]'>Талархал бичих</div>
            <div className='bg-[#F5F5F5] p-2 rounded-lg mt-2'>
              <p className="font-medium">Чамд ажлын амжилт Хичээгээрэй чи чаднаааа мундан шүүү</p>
              
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default User;
