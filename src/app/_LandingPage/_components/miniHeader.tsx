import Image from "next/image";

export default function MiniHeader() {
  return (
    <div className="flex items-center justify-between h-[66px] bg-white text-white">
        <div className="p-2">  
      <Image src={"/miniLogo.png"} width={68} height={48}  alt="logo"/>
   </div>
    </div>
  );
}