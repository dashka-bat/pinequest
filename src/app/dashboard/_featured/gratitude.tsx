'use client';

import { Stage, Layer, Rect, Text } from 'react-konva';
import { useRef, useState } from 'react';

const GratitudeTab = () => {
  const width = 300;
  const height = 300;

  const [text, setText] = useState('Type anything, @mention\nanyone');
  const [isEditing, setIsEditing] = useState(false);

  const textRef = useRef<any>(null);
  const stageRef = useRef<any>(null);

  const handleDblClick = () => {
    const textNode = textRef.current;
    // const stage = stageRef.current;
    const { x, y } = textNode.absolutePosition();
    const { width, height } = textNode.getClientRect();

    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Style the textarea
    Object.assign(textarea.style, {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`,
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#6B7280',
      padding: '4px',
      border: 'none',
      background: '#ffffffcc',
      outline: 'none',
      resize: 'none',
      lineHeight: '1.4',
      whiteSpace: 'pre-wrap',
      zIndex: '1000',
      boxShadow: '0 0 2px rgba(0,0,0,0.2)',
    });

    document.body.appendChild(textarea);
    textarea.focus();

    const removeTextarea = () => {
      setText(textarea.value);
      setIsEditing(false);
      document.body.removeChild(textarea);
    };

    textarea.addEventListener('blur', removeTextarea);
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        textarea.blur();
      }
    });

    setIsEditing(true);
  };

  return (
    <Stage width={width} height={height} className="shadow-lg" ref={stageRef}>
      <Layer>
        {/* Sticky note background */}
        <Rect x={0} y={0} width={width} height={height} fill="#B9FBC0" cornerRadius={10} />

        {/* Editable message */}
        <Text
          ref={textRef}
          text={text}
          x={20}
          y={20}
          fontSize={18}
          fontFamily="Arial"
          fill="#6B7280"
          onDblClick={handleDblClick}
          visible={!isEditing}
        />

        {/* Author */}
        <Text
          text="CAFUNE"
          x={20}
          y={height - 40}
          fontSize={14}
          fontFamily="Arial"
          fontStyle="bold"
          fill="#374151"
        />
      </Layer>
    </Stage>
  );
};

export default GratitudeTab;
