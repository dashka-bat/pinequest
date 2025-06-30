import { UniqueIdentifier } from "@dnd-kit/core";

export const StaticEmoji = ({ id, emoji, x, y, rotation, selected, onClick }: {
  id: UniqueIdentifier;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  selected: boolean;
  onClick: (id: UniqueIdentifier) => void;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        position: 'absolute',
        fontSize: 32,
        cursor: 'pointer',
        border: selected ? '2px solid #1692EA' : undefined,
        borderRadius: 8,
        userSelect: 'none',
        zIndex: 10,
      }}
    >
      {emoji}
    </div>
  );
};