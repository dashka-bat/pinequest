"use client";
import { useEffect, useState } from "react";

export default function Posts() {
  const [receivedPosts, setReceivedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`/api/received-posts/6863920e85fd11185f58e549`);
      const data = await res.json();
      setReceivedPosts(data.receivedPosts || []);
    };

    fetchUserData();
  }, []);

  return (
   <div className="grid grid-cols-2 gap-6 p-6 ml-[250px]">
  {receivedPosts.map((post, ) =>
    post.cards?.map((card: any) => {
      const cardStickers = post.imageItems?.filter(
        (img: any) =>
          img.type === "sticker" &&
          img.x >= card.x &&
          img.x <= card.x + 500 &&
          img.y >= card.y &&
          img.y <= card.y + 500
      );

      return (
        <div
          key={card.id}
          className="relative w-[500px] h-[500px] bg-white border rounded shadow p-4"
        >
          <p className="text-sm">{card.text}</p>

          {cardStickers?.map((sticker: any) => (
            <img
              key={sticker.id}
              src={sticker.url}
              alt=""
              style={{
                position: "absolute",
                top: sticker.y - card.y,
                left: sticker.x - card.x,
                width: `${sticker.scale * 60}px`,
                pointerEvents: "none",
              }}
              className="pointer-events-none"
            />
          ))}
        </div>
      );
    })
  )}
</div>

  );
}
