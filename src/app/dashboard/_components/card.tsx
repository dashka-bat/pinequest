import { UniqueIdentifier } from "@dnd-kit/core";

export const Card = ({ id, text, x, y, selected, onClick, onDelete }: {
  id: UniqueIdentifier;
  text: string;
  x: number;
  y: number;
  selected: boolean;
  onClick: (id: UniqueIdentifier) => void;
  onDelete: (id: UniqueIdentifier) => void;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      style={{
        position: 'absolute',
        width: 500,
        height:500,
        left: x,
        top: y,
        userSelect: 'none',
        cursor: 'pointer',
        border: selected ? '2px solid #1692EA' : '1px solid #ccc',
        borderRadius: 8,
        background: 'white',
        padding: 12,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        
      }}
       className="cursor-pointer hover:bg-gray-100 p-2 rounded select-none w-[176px] h-[280px]  shadow   border"
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute top-0 right-0 m-1 px-2 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 hidden group-hover:block"
          style={{ display: selected ? 'block' : 'none' }}
        >
          ❌
        </button>
      </div>
    
    </div>
  );
};
