'use client';

import { useEffect, useRef, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Card } from '../_components/card';
import { StaticEmoji } from '../_components/staticEmoji';
import { Sidebar } from '../_components/side-bar';

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

type ImageItemType = {
  id: UniqueIdentifier;
  url: string;
  x: number;
  y: number;
  scale: number;
};

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [emojiItems, setEmojiItems] = useState<EmojiType[]>([]);
  const [imageItems, setImageItems] = useState<ImageItemType[]>([]);

  const [selectedCardId, setSelectedCardId] = useState<UniqueIdentifier | null>(null);
  const [selectedEmojiId, setSelectedEmojiId] = useState<UniqueIdentifier | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<UniqueIdentifier | null>(null);

  const emojis = ['🎉', '💖', '🎂', '👏', '🌟', '😊', '🎁'];
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Drag-д зориулсан ref
  const dragInfo = useRef<{
    draggingId: UniqueIdentifier | null;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    draggingId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  // MouseDown дээр drag эхлүүлэх
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: UniqueIdentifier) => {
    e.stopPropagation();
    const img = imageItems.find((img) => img.id === id);
    if (!img) return;

    dragInfo.current = {
      draggingId: id,
      startX: e.clientX,
      startY: e.clientY,
      originX: img.x,
      originY: img.y,
    };

    setSelectedImageId(id);
    setSelectedCardId(null);
    setSelectedEmojiId(null);
  };

  // MouseMove дээр байрлал update хийх
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current.draggingId) return;

    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;

    setImageItems((prev) =>
      prev.map((img) =>
        img.id === dragInfo.current.draggingId
          ? {
              ...img,
              x: dragInfo.current.originX + dx,
              y: dragInfo.current.originY + dy,
            }
          : img
      )
    );
  };

  // MouseUp дээр drag дуусгах
  const handleMouseUp = () => {
    dragInfo.current.draggingId = null;
  };

  // Скалингийн тохиргоо
  const handleScaleImage = (id: UniqueIdentifier, delta: number) => {
    setImageItems((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              scale: Math.min(Math.max(img.scale + delta, 0.1), 5),
            }
          : img
      )
    );
  };

  // Карт, эмоджи, зураг устгах
  const handleDelete = (id: UniqueIdentifier) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setEmojiItems((prev) => prev.filter((emoji) => emoji.id !== id));
    setImageItems((prev) => prev.filter((img) => img.id !== id));
  };

  useEffect(() => {
    // Delete болон Backspace товч дарах event
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedCardId) {
          handleDelete(selectedCardId);
          setSelectedCardId(null);
        }
        if (selectedEmojiId) {
          handleDelete(selectedEmojiId);
          setSelectedEmojiId(null);
        }
        if (selectedImageId) {
          handleDelete(selectedImageId);
          setSelectedImageId(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCardId, selectedEmojiId, selectedImageId]);

  // Global mouse event-уудыг add/remove хийнэ
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Карт нэмэх
  const handleAddCard = (id: string) => {
    let centerX = 300;
    let centerY = 300;
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      centerX = rect.width / 2 - 260;
      centerY = rect.height / 2 - 300;
    }
    setCards((prev) => [
      ...prev,
      {
        id,
        text: 'Төрсөн өдрийн мэнд хүргэе Хулан 💐 Чи үнэхээр хэрэгтэй шүү',
        x: centerX,
        y: centerY,
      },
    ]);
  };

  // Зураг upload хийх
  const handleImageUpload = (url: string) => {
    let centerX = 300;
    let centerY = 300;
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      centerX = rect.width / 2 - 100;
      centerY = rect.height / 2 - 100;
    }
    setImageItems((prev) => [
      ...prev,
      {
        id: `image-${Date.now()}`,
        url,
        x: centerX,
        y: centerY,
        scale: 1,
      },
    ]);
  };

  // Canvas дээр emoji drop хийх
  const handleCanvasDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const emoji = event.dataTransfer.getData('text/plain');
    if (emoji && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
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

  return (
    <div className="flex h-screen relative">
      <Sidebar
        emojis={emojis}
        onAdd={handleAddCard}
        onEmojiDragStart={() => {}}
        onImageUpload={handleImageUpload}
      />

      <div className="flex-1 p-6">
        <div
          ref={canvasRef}
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => {
            setSelectedCardId(null);
            setSelectedEmojiId(null);
            setSelectedImageId(null);
          }}
          className="relative w-full h-[80vh] bg-center bg-[length:250%] bg-no-repeat border rounded p-4 overflow-auto"
          style={{ backgroundImage: "url('/area.png')" }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              selected={selectedCardId === card.id}
              onClick={setSelectedCardId}
              onDelete={handleDelete}
            />
          ))}

          {emojiItems.map((item) => (
            <StaticEmoji
              key={item.id}
              {...item}
              selected={selectedEmojiId === item.id}
              onClick={setSelectedEmojiId}
            />
          ))}

          {imageItems.map((img) => {
  const width = 120 * img.scale;
  return (
    <div
      key={img.id}
      className={`absolute cursor-move rounded-md transition-shadow duration-150 ${
        selectedImageId === img.id
          ? 'outline outline-4 outline-[#FD6667]  '
          : 'hover:shadow-md'
      }`}
      style={{
        top: img.y,
        left: img.x,
        userSelect: 'none',
        width,
        padding: '8px', // Select талбайг томруулсан
        boxSizing: 'content-box',
        touchAction: 'none',
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        // Select хийх ба drag эхлүүлэх
        dragInfo.current = {
          draggingId: img.id,
          startX: e.clientX,
          startY: e.clientY,
          originX: img.x,
          originY: img.y,
        };
        setSelectedImageId(img.id);
        setSelectedCardId(null);
        setSelectedEmojiId(null);
      }}
      onClick={(e) => e.stopPropagation()} // Canvas-ийн click дамжуулахгүй
    >
      <img
        src={img.url}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          pointerEvents: 'none',
          userSelect: 'none',
          borderRadius: '6px',
        }}
        draggable={false}
      />
      {selectedImageId === img.id && (
        <div className="flex justify-center gap-2 mt-2 select-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleScaleImage(img.id, 0.1);
            }}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            type="button"
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleScaleImage(img.id, -0.1);
            }}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            type="button"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
})}


        </div>
      </div>
    </div>
  );
}
