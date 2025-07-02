'use client';

import { useEffect, useRef, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Card } from '../_components/card';
import { StaticEmoji } from '../_components/staticEmoji';
import { Sidebar } from '../_components/side-bar';
import { ChevronRight } from 'lucide-react';
import { StickerType } from '../_components/card';

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
  type: 'image' | 'sticker';
  cardId?: UniqueIdentifier;
};


export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [emojiItems, setEmojiItems] = useState<EmojiType[]>([]);
  const [imageItems, setImageItems] = useState<ImageItemType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState<UniqueIdentifier | null>(null);
  const [selectedEmojiId, setSelectedEmojiId] = useState<UniqueIdentifier | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<UniqueIdentifier | null>(null);
  const [users, setUsers] = useState<{ _id: string; name: string ;email:string }[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/company/all-users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Хэрэглэгчид татахад алдаа:', err);
      }
    };
    fetchUsers();
  }, []);

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
        setSelectedRecipient('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const emojis = ['🎉', '💖', '🎂', '👏', '🌟', '😊', '🎁'];
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragInfo = useRef({
    draggingId: null as UniqueIdentifier | null,
    startX: 300,
    startY: 300,
    originX: 300,
    originY: 300,
  });

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

  const handleScaleImage = (id: UniqueIdentifier, delta: number) => {
    setImageItems((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, scale: Math.min(Math.max(img.scale + delta, 0.1), 5) }
          : img
      )
    );
  };

  const handleDelete = (id: UniqueIdentifier) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setEmojiItems((prev) => prev.filter((emoji) => emoji.id !== id));
    setImageItems((prev) => prev.filter((img) => img.id !== id));
  };
  const handleUpdateCardText = (id: UniqueIdentifier, newText: string) => {
  setCards((prev) =>
    prev.map((card) =>
      card.id === id ? { ...card, text: newText } : card
    )
  );
};


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedCardId) handleDelete(selectedCardId);
        if (selectedEmojiId) handleDelete(selectedEmojiId);
        if (selectedImageId) handleDelete(selectedImageId);
        setSelectedCardId(null);
        setSelectedEmojiId(null);
        setSelectedImageId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCardId, selectedEmojiId, selectedImageId]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
        text: '',
        x: centerX,
        y: centerY,
      },
    ]);
  };

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
        type: 'image',
      },
    ]);
  };

  const handleStickerClick = (url: string) => {
    if (!selectedCardId) return;
    const card = cards.find((c) => c.id === selectedCardId);
    if (!card) return;

    const centerX = card.x + 250 - 30;
    const centerY = card.y + 250 - 30;

    setImageItems((prev) => [
      ...prev,
      {
        id: `sticker-${Date.now()}`,
        url,
        x: centerX,
        y: centerY,
        scale: 1,
        type: 'sticker',
        cardId: card.id,
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

  const renderImage = (img: ImageItemType) => {
    const width = 120 * img.scale;
    return (
      <div
        key={img.id}
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
          boxSizing: 'content-box',
          touchAction: 'none',
          zIndex: img.type === 'sticker' ? 20 : 10,
        }}
        onMouseDown={(e) => handleMouseDown(e, img.id)}
        onClick={(e) => e.stopPropagation()}
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
  };
  const handleSend = async (recipientId: string) => {
    setIsModalOpen(true)
  const payload = {
    cards,
    emojiItems,
    imageItems,
  };

  try {
    const res = await fetch('/api/send-canva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toUserId: recipientId,
        postData: payload,
      }),
    });

    if (res.ok) {
      alert('Амжилттай илгээгдлээ!');
    } else {
      console.error('Илгээхэд алдаа гарлаа');
    }
  } catch (err) {
    console.error('Fetch алдаа:', err);
  }
};


  return (

    <div className="flex pl-[20px] h-screen relative ml-20 border-2 rounded-lg ">

      <Sidebar
        emojis={emojis}
        onAdd={handleAddCard}
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
            setSelectedEmojiId(null);
            setSelectedImageId(null);
          }}
          className=" relative w-full h-[80vh] bg-center bg-[length:250%] bg-no-repeat border rounded p-4 overflow-auto"
          style={{ backgroundImage: "url('/area.png')" }}
        >
          {cards.map((card) => (
           <Card
  key={card.id}
  {...card}
  selected={selectedCardId === card.id}
  onClick={setSelectedCardId}
  // onDelete={handleDelete}
  onUpdateText={handleUpdateCardText}
 stickers={imageItems.filter(
  (img): img is StickerType =>
    img.type === "sticker" &&
    img.x >= card.x &&
    img.x <= card.x + 500 &&
    img.y >= card.y &&
    img.y <= card.y + 500
)}

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
          {imageItems.filter((img) => img.type === 'image').map(renderImage)}
          {imageItems.filter((img) => img.type === 'sticker').map(renderImage)}
          <div className="flex gap-4 items-center mb-4">
{isModalOpen && (
  <div
    ref={popupRef}
    className="absolute bottom-20 right-6 w-[460px] h-[556px] bg-[#F5F5F5] rounded-[12px] shadow-lg z-50"
  >
    <p className="text-[16px] text-[#000000] py-[24px] px-[24px] font-medium">Ажилтан сонгох</p>

    <input
      placeholder="       Бүртгэлийн дугаараар хайх"
      className="w-[412px] h-[55px] bg-[#ffffff] rounded-[8px] my-[12px] mx-[24px] text-[14px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <div className="overflow-y-auto max-h-[340px]">
      {users.slice(2,7).map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedRecipient(user._id)}
          className={`cursor-pointer bg-white mx-[24px] border-b border-[#DADCE0] h-[63px] flex items-center px-[12px] transition-colors rounded-[8px] ${
            selectedRecipient === user._id ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
        >
          <img
            className="w-[36px] h-[36px] rounded-full"
            src="Thankly.png"
            alt={user.name}
          />
          <div className="pl-[12px]">
            <div
              className={`text-[12px] ml-[8px] font-medium ${
                selectedRecipient === user._id ? 'text-blue-600' : 'text-black'
              }`}
            >
              {user.name}
            </div>
            <div className="text-[#888888] text-[10px] ml-[8px]">{user.email}</div>
          </div>
        </div>
      ))}
    </div>

    
      <button
        onClick={() => {
          handleSend(selectedRecipient);
          setIsModalOpen(false);
          setSelectedRecipient('')
        }}
        disabled={!selectedRecipient}
        className="bg-[#FF5252] text-white flex justify-center items-center mx-[24px] my-[24px] h-[51px] rounded  disabled:bg-gray-400 w-[412px]"
      >
        Илгээх
      </button>
  
  </div>
)}

 <button
  onClick={() => setIsModalOpen(true)}
  
  className="absolute bottom-4 right-4 bg-[#FF5252] text-white w-[42px] h-[42px] rounded-full flex justify-center items-center "
>
  <ChevronRight/>

</button>

</div>

        </div>
      </div>
    </div>
  );
}

