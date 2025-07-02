import { useEffect, useState } from "react";
import { CloudUpload, LayoutTemplate, Sticker } from "lucide-react";

export const Sidebar = ({
  onAdd,
  onAddTheme,
   onImageUpload,
   onStickerSelect,
}: {
  onAdd: (id: string) => void;
  emojis: string[];
  onEmojiDragStart: (emoji: string) => void;
  onImageUpload: (url: string) => void;
  onStickerSelect: (url: string) => void; 
  onAddTheme :(id:string) => void
}) => {
  const [activeTab, setActiveTab] = useState<"template" | "upload" | "sticker">("template");
  const [uploadSubTab, setUploadSubTab] = useState<"image" | "video">("image");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); 
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
const GIPHY_KEY = "zjV2rSPyUdk6R5cEeozDDWDLZk3rbUUI";

  const [stickers, setStickers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`https://api.giphy.com/v1/stickers/trending?api_key=${GIPHY_KEY}&limit=20`)
      .then((res) => res.json())
      .then((json) =>
        setStickers(json.data.map((item: any) => item.images.fixed_width.url))
      )
      .catch(console.error);
  }, []);
  console.log(stickers)


const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const url = await uploadImageToCloudinary(file);
    if (url) {
      setUploadedImages((prev) => [...prev, url]);
      onImageUpload(url); 
    }
  }
};




  return (
    <div className="w-[395px] h-full flex">
      <div className="w-[82px] border-l-0 border-[#EFEFEF] border-solid border-r-2">
        <div className="py-[20px] px-[10px]">
          <div
            onClick={() => setActiveTab("template")}
            className="w-[62px] h-[59px] flex flex-col items-center cursor-pointer"
          >
            <LayoutTemplate
              width={24}
              height={24}
              className={activeTab === "template" ? "text-[#FF5252]" : "text-[#616161]"}
            />
            <p
              className={`text-[12px] ${
                activeTab === "template" ? "text-[#FF5252]" : "text-[#616161]"
              }`}
            >
              Template
            </p>
          </div>

         
          <div
            onClick={() => setActiveTab("upload")}
            className="w-[62px] h-[59px] flex flex-col items-center mt-[24px] cursor-pointer"
          >
            <CloudUpload
              width={24}
              height={24}
              className={activeTab === "upload" ? "text-[#FF5252]" : "text-[#616161]"}
            />
            <p
              className={`text-[12px] ${
                activeTab === "upload" ? "text-[#FF5252]" : "text-[#616161]"
              }`}
            >
              Upload
            </p>
          </div>

       
          <div
            onClick={() => setActiveTab("sticker")}
            className="w-[62px] h-[59px] flex flex-col items-center mt-[24px] cursor-pointer"
          >
            <Sticker
              width={24}
              height={24}
              className={activeTab === "sticker" ? "text-[#FF5252]" : "text-[#616161]"}
            />
            <p
              className={`text-[12px] ${
                activeTab === "sticker" ? "text-[#FF5252]" : "text-[#616161]"
              }`}
            >
              Sticker
            </p>
          </div>
        </div>
      </div>

 
      <div className="w-72 p-4 border-r flex flex-col">

        {activeTab === "template" && (
          <>
            <h2 className="text-[14px] font-bold mb-[20px] text-[#FF5252]">Шинэ цаас</h2>
            <div className="flex justify-center items-center">
             <div>
               <div
                onClick={() => onAdd(`card-${Date.now()}`)}
                className="cursor-pointer rounded select-none w-[176px] h-[280px] shadow border 
                           bg-white transition-all duration-300 ease-in-out 
                           hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02] transform"
              ></div>
               <div
                onClick={() => onAddTheme(`card-${Date.now()}`)}
                className="cursor-pointer rounded select-none w-[176px] h-[280px] shadow border 
                           bg-[#EEF7FD] transition-all duration-300 ease-in-out 
                           hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02] transform"
                           style={{
  position: 'absolute',
  width: 176,
  height: 280,
           
}}

              > <div
  style={{ backgroundImage: 'url("lady.png")' }}
  className="w-[156px] h-[200px] mx-[10px] my-[10px] bg-cover bg-center"
>

</div>
</div>
             
             </div>
            </div>
          </>
        )}


        {activeTab === "upload" && (
          <div>
         
            <div className="flex mb-4 border-b border-gray-300">
              <div
                onClick={() => setUploadSubTab("image")}
                className={`font-semibold text-[16px] w-[120px] h-[40px] flex justify-center items-center cursor-pointer border-b-3
                  ${
                    uploadSubTab === "image"
                      ? "border-[#FF5252] text-[#FF5252]"
                      : "border-transparent text-gray-600"
                  }
                `}
              >
                Зураг
              </div>
              <div
                onClick={() => setUploadSubTab("video")}
                className={`font-semibold text-[16px] w-[120px] h-[40px] flex justify-center items-center cursor-pointer border-b-3
                  ${
                    uploadSubTab === "video"
                      ? "border-[#FF5252] text-[#FF5252]"
                      : "border-transparent text-gray-600"
                  }
                `}
              >
                Бичлэг
              </div>
            </div>

     
            {uploadSubTab === "image" && (
  <div>
    <label
      htmlFor="image-upload"
      className="border-dashed border-[1px] border-[#CCD1D7] w-[227px] h-[120px] flex justify-center items-center rounded-[8px] ml-[20px]"
    >
     <div>
      <div className="flex justify-center items-center text-[14px] text-[#616161] font-semibold">+</div>
      <div className="font-semibold text-[16px] text-[#616161]"> Зураг оруулах</div>
      </div>
    </label>
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange}
    />
  </div>
)}


            {uploadSubTab === "video" && (
             < div>
    <label
      htmlFor="image-upload"
      className="border-dashed border-[1px] border-[#CCD1D7] w-[227px] h-[120px] flex justify-center items-center rounded-[8px] ml-[20px]"
    >
     <div>
      <div className="flex justify-center items-center text-[14px] text-[#616161] font-semibold">+</div>
      <div className="font-semibold text-[16px] text-[#616161]"> Бичлэг оруулах</div>
      </div>
    </label>
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          console.log("Сонгосон зураг:", file);
        }
      }}
    />
  </div>
            )}
          </div>
        )}

     
        {activeTab === "sticker" && (
          <div>
            <h2 className="text-[14px] font-bold mb-[20px] text-[#0050A0]">Стикерүүд</h2>
            <div className="flex flex-wrap gap-[40px] ml-8">
            
      {stickers.map((url) => (
  <img
    key={url}
    src={url}
    draggable={false}
    onClick={() => onStickerSelect(url)} 
    className="w-16 h-16 object-contain cursor-pointer hover:scale-110 transition-transform"
  />
))}

  
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
