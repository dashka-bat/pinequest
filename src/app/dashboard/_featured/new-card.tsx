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
export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [emojiItems, setEmojiItems] = useState<EmojiType[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<UniqueIdentifier | null>(null);
  const [selectedEmojiId, setSelectedEmojiId] = useState<UniqueIdentifier | null>(null);

  const emojis = ['🎉', '💖', '🎂', '👏', '🌟', '😊', '🎁'];

  const canvasRef = useRef<HTMLDivElement | null>(null);

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

  const handleDelete = (id: UniqueIdentifier) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setEmojiItems((prev) => prev.filter((emoji) => emoji.id !== id));
  };

  useEffect(() => {
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCardId, selectedEmojiId]);

  return (
    <div className="flex h-screen relative">
      <Sidebar
        emojis={emojis}
        onAdd={handleAddCard}
        onEmojiDragStart={() => {}}
      />

      <div className="flex-1 p-6">
        <div
          ref={canvasRef}
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => {
            setSelectedCardId(null);
            setSelectedEmojiId(null);
          }}
          className="relative w-full h-[80vh] bg-center bg-[length:250%] bg-no-repeat border rounded p-4 overflow-hidden"
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
        </div>
      </div>
    </div>
  );
}

