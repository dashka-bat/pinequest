'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';

type CardType = {
  id: UniqueIdentifier;
  text: string;
  x: number;
  y: number;
};

type EmojiType = {
  id: UniqueIdentifier;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
};

const DraggableCard = ({
  id,
  text,
  x,
  y,
  onUpdate,
}: {
  id: UniqueIdentifier;
  text: string;
  x: number;
  y: number;
  onUpdate: (id: UniqueIdentifier, newText: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, inputValue]);

  const style = {
    transform: `translate(${x + (transform?.x || 0)}px, ${y + (transform?.y || 0)}px)`,
    width: 240,
    position: 'absolute' as const,
    touchAction: 'none',
    zIndex: 10,
  };

  const handleSave = () => {
    onUpdate(id, inputValue);
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className="bg-white shadow rounded p-3 border select-none relative group"
        onClick={() => !isEditing && setIsEditing(true)}
      >
        <div
          className="absolute top-1 right-1 cursor-move text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition"
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
        >
          ☰
        </div>

        <h3 className="font-semibold mb-1">Талархал бичих</h3>

        {isEditing ? (
          <>
            <textarea
              ref={textareaRef}
              className="w-full border rounded p-1 text-sm resize-none overflow-hidden"
              value={inputValue}
              rows={1}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex justify-end gap-2 text-sm mt-1">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
              >
                Хадгалах
              </button>
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  setInputValue(text);
                }}
              >
                Болих
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm whitespace-pre-wrap break-words">{text || ' '}</p>
        )}
      </div>
    </div>
  );
};

const DraggableEmoji = ({
  id,
  emoji,
  x,
  y,
  rotation,
  onRotate,
}: {
  id: UniqueIdentifier;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  onRotate: (id: UniqueIdentifier) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

const style: React.CSSProperties = {
  transform: `translate(${x + (transform?.x || 0)}px, ${y + (transform?.y || 0)}px) rotate(${rotation}deg)`,
  position: 'absolute',
  fontSize: '32px',
  touchAction: 'none' as const,
  cursor: 'move',
  userSelect: 'none' as const,
  transition: 'transform 0.1s ease',
  zIndex: 10,
};


  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="relative group">
        <span>{emoji}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRotate(id);
          }}
          className="absolute -top-4 -right-4 bg-white border rounded-full text-xs px-1 shadow hidden group-hover:block"
        >
          ⟳
        </button>
      </div>
    </div>
  );
};

const Canvas = ({
  children,
  onDrop,
  onDragOver,
}: {
  children: React.ReactNode;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
}) => {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  return (
    <div
      ref={setNodeRef}
      className="relative w-full h-[80vh] bg-gray-50 border rounded p-4 overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {children}
    </div>
  );
};

const DeleteZone = () => {
  const { setNodeRef, isOver } = useDroppable({ id: 'delete-zone' });

  return (
    <div
      ref={setNodeRef}
      className={`absolute bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center border-2 transition 
        ${isOver ? 'bg-red-500 border-red-600' : 'bg-gray-100 border-gray-300'}`}
    >
      🗑️
    </div>
  );
};

const Sidebar = ({
  onAdd,
  emojis,
  onEmojiDragStart,
}: {
  onAdd: (id: string) => void;
  emojis: string[];
  onEmojiDragStart: (emoji: string) => void;
}) => (
  <div className="w-72 p-4 border-r flex flex-col gap-6">
    <h2 className="text-lg font-bold mb-4">Картуудаас сонгох</h2>
    <div
      onClick={() => onAdd(`card-${Date.now()}`)}
      className="cursor-pointer hover:bg-gray-100 p-2 rounded select-none"
    >
      <div className="bg-white shadow rounded p-3 w-60 border">
        <h3 className="font-semibold mb-1">Талархал бичих</h3>
        <p className="text-sm whitespace-pre-wrap">
          Төрсөн өдрийн мэнд хүргэе Хулан 💐 Чи үнэхээр хэрэгтэй шүү
        </p>
      </div>
    </div>

    <h2 className="text-lg font-bold mb-2">Emoji жагсаалт</h2>
    <div className="flex flex-wrap gap-2 max-h-40 overflow-auto border rounded p-2 bg-white shadow">
      {emojis.map((emoji) => (
        <div
          key={emoji}
          className="text-3xl cursor-pointer select-none hover:scale-125 transition"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', emoji);
            onEmojiDragStart(emoji);
          }}
          title={`Emoji: ${emoji}`}
        >
          {emoji}
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [emojiItems, setEmojiItems] = useState<EmojiType[]>([]);

  const emojis = ['🎉', '💖', '🎂', '👏', '🌟', '😊', '🎁'];

  const handleAddCard = (id: string) => {
    setCards((prev) => [
      ...prev,
      {
        id,
        text: 'Төрсөн өдрийн мэнд хүргэе Хулан 💐 Чи үнэхээр хэрэгтэй шүү',
        x: 50,
        y: 50,
      },
    ]);
  };

  const handleUpdate = (id: UniqueIdentifier, newText: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, text: newText } : card))
    );
  };

  const handleRotateEmoji = (id: UniqueIdentifier) => {
    setEmojiItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rotation: (item.rotation + 45) % 360 } : item
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active, over } = event;

    if (over?.id === 'delete-zone') {
      setCards((prev) => prev.filter((card) => card.id !== active.id));
      setEmojiItems((prev) => prev.filter((item) => item.id !== active.id));
    } else {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === active.id
            ? { ...card, x: card.x + delta.x, y: card.y + delta.y }
            : card
        )
      );
      setEmojiItems((prevEmojis) =>
        prevEmojis.map((item) =>
          item.id === active.id
            ? { ...item, x: item.x + delta.x, y: item.y + delta.y }
            : item
        )
      );
    }
  };

  const handleCanvasDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const emoji = event.dataTransfer.getData('text/plain');
    if (emoji) {
      const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setEmojiItems((prev) => [
        ...prev,
        {
          id: `emoji-${Date.now()}`,
          emoji,
          x,
          y,
          rotation: 0,
        },
      ]);
    }
  };

  const handleCanvasDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleEmojiDragStart = (emoji: string) => {};

  return (
    <div className="flex h-screen relative">
      <Sidebar emojis={emojis} onAdd={handleAddCard} onEmojiDragStart={handleEmojiDragStart} />

      <div className="flex-1 p-6">
        <DndContext onDragEnd={handleDragEnd}>
          <Canvas onDrop={handleCanvasDrop} onDragOver={handleCanvasDragOver}>
            {/* Cards */}
            {cards.map((card) => (
              <DraggableCard key={card.id} {...card} onUpdate={handleUpdate} />
            ))}

            {/* Emojis */}
            {emojiItems.map((item) => (
              <DraggableEmoji key={item.id} {...item} onRotate={handleRotateEmoji} />
            ))}

            <DeleteZone />
          </Canvas>
        </DndContext>
      </div>
    </div>
  );
}



