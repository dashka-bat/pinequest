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

export const Card = forwardRef<HTMLDivElement, Props>(
  
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
        className="relative rounded bg-white shadow p-2"
      >
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
