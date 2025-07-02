'use client';

import { useEffect, useRef, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Card } from '../_components/card';
import { StaticEmoji } from '../_components/staticEmoji';
import { Sidebar } from '../_components/side-bar';
import { ChevronRight } from 'lucide-react';
// import { StickerType } from '../_components/card';
import { Theme } from '../_components/theme';
// import { _uuidv4 } from 'zod/v4/core';

type CardType = {
  id: UniqueIdentifier;
  text: string;
  x: number;
  y: number;
};

type ThemeType = {
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
  type: 'image' | 'sticker';
  cardId?: UniqueIdentifier;
};

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [theme, setTheme] = useState<ThemeType[]>([]);
  const [emojiItems, setEmojiItems] = useState<EmojiType[]>([]);
  const [imageItems, setImageItems] = useState<ImageItemType[]>([]);

  const [selectedCardId, setSelectedCardId] = useState<UniqueIdentifier | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<UniqueIdentifier | null>(null);
  const [selectedEmojiId, setSelectedEmojiId] = useState<UniqueIdentifier | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<UniqueIdentifier | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<{ _id: string; name: string; email: string }[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const dragInfo = useRef({
    draggingId: null as UniqueIdentifier | null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  useEffect(() => {
  const stickerItems = imageItems.filter(img => img.type === 'sticker');
  console.log('Current stickers:', stickerItems);
}, [imageItems]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/company/all-users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Хэрэглэгч татахад алдаа:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
        setSelectedRecipient('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = (id: UniqueIdentifier) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setTheme((prev) => prev.filter((t) => t.id !== id));
    setEmojiItems((prev) => prev.filter((e) => e.id !== id));
    setImageItems((prev) => prev.filter((i) => i.id !== id));
  };

 useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const active = document.activeElement;
    const isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || (active as HTMLElement).isContentEditable);

    if (isTyping) return;

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedCardId) handleDelete(selectedCardId);
      if (selectedThemeId) handleDelete(selectedThemeId);
      if (selectedEmojiId) handleDelete(selectedEmojiId);
      if (selectedImageId) handleDelete(selectedImageId);

      setSelectedCardId(null);
      setSelectedThemeId(null);
      setSelectedEmojiId(null);
      setSelectedImageId(null);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedCardId, selectedThemeId, selectedEmojiId, selectedImageId]);


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: UniqueIdentifier) => {
    e.stopPropagation();
    const img = imageItems.find((i) => i.id === id);
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
    setSelectedThemeId(null);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current.draggingId) return;
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    setImageItems((prev) =>
      prev.map((img) =>
        img.id === dragInfo.current.draggingId
          ? { ...img, x: dragInfo.current.originX + dx, y: dragInfo.current.originY + dy }
          : img
      )
    );
  };

  const handleMouseUp = () => {
    dragInfo.current.draggingId = null;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleScaleImage = (id: UniqueIdentifier, delta: number) => {
    setImageItems((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, scale: Math.min(Math.max(img.scale + delta, 0.1), 5) } : img
      )
    );
  };

  const handleUpdateCardText = (id: UniqueIdentifier, newText: string) => {
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, text: newText } : card)));
    setTheme((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData('text/plain');
    if (!emoji || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
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
  };

  const handleImageUpload = (url: string) => {
    const centerX = canvasRef.current?.offsetWidth ? canvasRef.current.offsetWidth / 2 - 100 : 300;
    const centerY = canvasRef.current?.offsetHeight ? canvasRef.current.offsetHeight / 2 - 100 : 300;
    setImageItems((prev) => [
      ...prev,
      {
        id: `image-${Date.now()}`,
        url,
        x: centerX,
        y: centerY,
        scale: 1,
        type: 'image',
      },
    ]);
  };

const handleStickerClick = (url: string) => {
  const selectedId = selectedCardId || selectedThemeId;
  if (!selectedId) return;

  const box = cards.concat(theme).find((c) => c.id === selectedId);
  if (!box) return;

  // Давхардсан sticker байгаа эсэхийг шалгах
  const alreadyExists = imageItems.some(
    (img) => img.type === 'sticker' && img.cardId === selectedId && img.url === url
  );

  if (alreadyExists) {
    console.log('Sticker already exists on this card/theme:', url);
    return; // Давхарлаж нэмэхгүй
  }

  setImageItems((prev) => [
    ...prev,
    {
      id: `sticker-${Date.now()}`,
      url,
      x: box.x + 250 - 30,
      y: box.y + 250 - 30,
      scale: 1,
      type: 'sticker',
      cardId: box.id,
    },
  ]);
};



  const handleAddCard = (id: string) => {
    const x = 300;
    const y = 300;
    setCards((prev) => [...prev, { id, text: '', x, y }]);
  };

  const handleAddTheme = (id: string) => {
    const x = 300;
    const y = 300;
    setTheme((prev) => [...prev, { id, text: '', x, y }]);
  };

  const renderImage = (img: ImageItemType) => {
    const width = 120 * img.scale;
    return (
      <div
        key={img.id}
        onMouseDown={(e) => handleMouseDown(e, img.id)}
        onClick={(e) => e.stopPropagation()}
        className={`absolute cursor-move rounded-md transition-shadow duration-150 ${
          selectedImageId === img.id
            ? 'outline outline-4 outline-[#FD6667]'
            : 'hover:shadow-md'
        }`}
        style={{
          top: img.y,
          left: img.x,
          width,
          padding: '8px',
          zIndex: img.type === 'sticker' ? 20 : 10,
        }}
      >
        <img src={img.url} alt="" style={{ width: '100%', borderRadius: 6 }} draggable={false} />
        {selectedImageId === img.id && (
          <div className="flex justify-center gap-2 mt-2">
            <button onClick={() => handleScaleImage(img.id, 0.1)}>+</button>
            <button onClick={() => handleScaleImage(img.id, -0.1)}>-</button>
          </div>
        )}
      </div>
    );
  };

  const handleSend = async (recipientId: string) => {
    const payload = { cards, theme, emojiItems, imageItems };
    await fetch('/api/send-canva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toUserId: recipientId, postData: payload }),
    });
    alert('Амжилттай илгээгдлээ!');
    setIsModalOpen(false);
    setSelectedRecipient('');
  };

  const emojis = ['🎉', '💖', '🎂', '👏', '🌟', '😊', '🎁'];

  return (
    <div className="flex pl-[20px] h-screen relative ml-20 border-2 rounded-lg">
      <Sidebar
        emojis={emojis}
        onAdd={handleAddCard}
        onAddTheme={handleAddTheme}
        onEmojiDragStart={() => {}}
        onImageUpload={handleImageUpload}
        onStickerSelect={handleStickerClick}
      />
      <div className="flex-1 p-6">
        <div
          ref={canvasRef}
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => {
            setSelectedCardId(null);
            setSelectedThemeId(null);
            setSelectedEmojiId(null);
            setSelectedImageId(null);
          }}
          className="relative w-full h-[80vh] border rounded p-4 overflow-auto bg-center bg-[length:250%] bg-no-repeat"
          style={{ backgroundImage: "url('/area.png')" }}
        >
          {cards.map((card) => (
  <Card
    key={card.id}
    {...card}
    selected={selectedCardId === card.id}
    onClick={setSelectedCardId}
    onUpdateText={handleUpdateCardText}
 
  />
))}

{theme.map((theme) => (
  <Theme
    key={theme.id}
    {...theme}
    selected={selectedThemeId === theme.id}
    onClick={setSelectedThemeId}
    onUpdateText={handleUpdateCardText}
  
  />
))}
          
          {emojiItems.map((e) => (
            <StaticEmoji
              key={e.id}
              {...e}
              selected={selectedEmojiId === e.id}
              onClick={setSelectedEmojiId}
            />
          ))}
          {imageItems.filter((img) => img.type === 'image').map(renderImage)}
          {imageItems.filter((img) => img.type === 'sticker').map(renderImage)}

          {/* Илгээх товч ба Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-4 right-4 bg-[#FF5252] text-white w-[42px] h-[42px] rounded-full flex justify-center items-center"
          >
            <ChevronRight />
          </button>

          {isModalOpen && (
            <div
              ref={popupRef}
              className="absolute bottom-20 right-6 w-[460px] h-[556px] bg-[#F5F5F5] rounded-[12px] shadow-lg z-50"
            >
              <p className="text-[16px] text-[#000000] py-[24px] px-[24px] font-medium">Ажилтан сонгох</p>
              <input
                placeholder="       Бүртгэлийн дугаараар хайх"
                className="w-[412px] h-[55px] bg-[#ffffff] rounded-[8px] my-[12px] mx-[24px] text-[14px] border border-gray-300"
              />
              <div className="overflow-y-auto max-h-[340px]">
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user._id}
                    onClick={() => setSelectedRecipient(user._id)}
                    className={`cursor-pointer bg-white mx-[24px] border-b border-[#DADCE0] h-[63px] flex items-center px-[12px] rounded-[8px] ${
                      selectedRecipient === user._id ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <img src="Thankly.png" className="w-[36px] h-[36px] rounded-full" />
                    <div className="pl-[12px]">
                      <div className={`text-[12px] ml-[8px] font-medium ${selectedRecipient === user._id ? 'text-blue-600' : 'text-black'}`}>{user.name}</div>
                      <div className="text-[#888888] text-[10px] ml-[8px]">{user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSend(selectedRecipient)}
                disabled={!selectedRecipient}
                className="bg-[#FF5252] text-white flex justify-center items-center mx-[24px] my-[24px] h-[51px] rounded disabled:bg-gray-400 w-[412px]"
              >
                Илгээх
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


