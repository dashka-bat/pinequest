import { UniqueIdentifier } from "@dnd-kit/core";
import { forwardRef, useState } from "react";

 export type StickerType = {
  id: UniqueIdentifier;
  url: string;
  x: number;
  y: number;
  scale: number;
  type: 'sticker'; // заавал 'sticker'
};


type Props = {
  id: UniqueIdentifier;
  text: string;
  x: number;
  y: number;
  selected: boolean;
  onClick: (id: UniqueIdentifier) => void;
  // onDelete: (id: UniqueIdentifier) => void;
  onUpdateText?: (id: UniqueIdentifier, newText: string) => void;
  stickers?: StickerType[];
};

export const Theme = forwardRef<HTMLDivElement, Props>(
  
  ({ id, text, x, y, selected, onClick,  onUpdateText, stickers = [] }, ref) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(text);

    const handleDoubleClick = () => {
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      if (onUpdateText) {
        onUpdateText(id, inputText);
      }
    };

    return (
      <div
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick(id);
        }}
        onDoubleClick={handleDoubleClick}
       style={{
  position: 'absolute',
  width: 500,
  height: 500,
  left: x,
  top: y,
  border: selected ? '2px solid #1692EA' : '1px solid #ccc',
        
}}

        className="relative  rounded bg-[#EEF7FD] shadow p-2"
        
      >
        <div className="flex justify-center items-center"><div  style={{
    backgroundImage: 'url("lady.png")',
    backgroundSize: 'cover',         // зураг div-д багтахгүй бол зүсээд ч хамаагүй багтаана
    backgroundPosition: 'top',    // төвд байрлуулна
    backgroundRepeat: 'no-repeat',   // дахин давтахгүй
  }} className="w-[400px] h-[350px] bg-amber-400"></div></div>
        {isEditing ? (
          <textarea
            className="w-full h-full outline-none resize-none text-sm"
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap break-words">{text}</p>
        )}

        {stickers.map((sticker) => (
          <img
            key={sticker.id.toString()}
            src={sticker.url}
            alt="sticker"
            className="absolute pointer-events-none"
            style={{
              top: sticker.y,
              left: sticker.x,
              width: `${sticker.scale * 60}px`,
            }}
          />
        ))}
      </div>
    );
  }
);
