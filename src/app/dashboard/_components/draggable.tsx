'use client';

import { DndContext, useDraggable } from '@dnd-kit/core';

function Draggable() {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    padding: '20px',
    background: 'skyblue',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Drag me!
    </div>
  );
}

export default function DragAndDrop() {
  return (
    <DndContext>
      <Draggable />
    </DndContext>
  );
}
