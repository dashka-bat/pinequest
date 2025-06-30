import { CloudUpload, LayoutTemplate, Sticker } from "lucide-react";

export const Sidebar = ({ onAdd, emojis, onEmojiDragStart }: {
  onAdd: (id: string) => void;
  emojis: string[];
  onEmojiDragStart: (emoji: string) => void;
}) => (
  <div className="w-[395px] h-[950px] flex">
    <div className="w-[82px]">
      <div className="py-[20px] px-[10px]">
        <div className="w-[62px] h-[59px] flex flex-col items-center">
          <LayoutTemplate width={24} height={24} className="text-[#616161]" />
          <p className="text-[#616161] text-[12px]">Template</p>
        </div>
        <div className="w-[62px] h-[59px] flex flex-col items-center mt-[24px]">
          <div className="w-[24px] h-[24px]">
            <CloudUpload width={24} height={24} className="text-[#616161] " />
          </div>
          <p className="text-[#616161] text-[12px]">Upload</p>
        </div>
        <div className="w-[62px] h-[59px] flex flex-col items-center mt-[24px]">
          <div className="w-[24px] h-[24px]">
            <Sticker width={24} height={24} className="text-[#616161] " />
          </div>
          <p className="text-[#616161] text-[12px]">Sticker</p>
        </div>
      </div>

    </div>
    <div>
      <div className="w-72 p-4 border-r flex flex-col ">
        <h2 className="text-[14px] font-bold mb-[20px] text-[#0050A0]">Шинэ цаас</h2>
        <div className="flex justify-center items-center">
          <div
            onClick={() => onAdd(`card-${Date.now()}`)}
            className="cursor-pointer hover:bg-gray-100  rounded select-none w-[176px] h-[280px]  shadow   border"
          >



          </div>

        </div>

      </div>
    </div>

  </div>
);