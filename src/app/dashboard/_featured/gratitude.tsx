'use client';

import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const STICKY_WIDTH = 300;
const STICKY_HEIGHT = 300;
const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 720;

type Note = {
  id: string;
  x: number;
  y: number;
  text: string;
  username: string;
  color?: string;
};

const GratitudeBoard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#B9FBC0');
  const stageRef = useRef<any>(null);
  const textRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/gratitude-panel');
        console.log('Fetched notes:', res);
        if (res.data.success) {
          const loadedNotes = res.data.data.notes.map((note: any) => ({
            id: note._id,
            x: note.positionX,
            y: note.positionY,
            text: note.text,
            username: note.user.name,
            color: note.color || '#B9FBC0',
          }));
          setNotes(loadedNotes);
        }
      } catch (err) {
        console.error('Failed to load notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    const x = 120 + Math.random() * 300;
    const y = 120 + Math.random() * 200;
    const text = 'Type anything, @mention\nanyone';
    const color = selectedColor;

    try {
      const res = await axios.post('/api/gratitude-panel', { x, y, text, color });
      if (res.data.success) {
        const n = res.data.data.newNote;
        setNotes((prev) => [
          ...prev,
          {
            id: n._id,
            x: n.positionX,
            y: n.positionY,
            text: n.text,
            username: n.user.name,
            color: n.color || color,
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const handleDblClick = (note: Note) => {
    const textNode = textRefs.current[note.id];
    const stage = stageRef.current;
    const container = stage.container();
    const { x, y } = textNode.absolutePosition();
    const stageBox = container.getBoundingClientRect();
    const { width, height } = textNode.getClientRect();

    const textarea = document.createElement('textarea');
    textarea.value = note.text;
    Object.assign(textarea.style, {
      position: 'absolute',
      top: `${stageBox.top + y}px`,
      left: `${stageBox.left + x}px`,
      width: `${width}px`,
      height: `${height}px`,
      fontSize: '12px',
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
    setEditingId(note.id);

    const removeTextarea = async () => {
      const updatedText = textarea.value;
      setEditingId(null);
      document.body.removeChild(textarea);
      setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, text: updatedText } : n)));

      try {
        await axios.put(`/api/gratitude-panel?id=${note.id}`, { text: updatedText });
      } catch (err) {
        console.error('Failed to update note text:', err);
      }
    };

    textarea.addEventListener('blur', removeTextarea);
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        textarea.blur();
      }
    });
  };

  const handleDragEnd = (note: Note, x: number, y: number) => {
    setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, x, y } : n)));

    axios
      .patch(`/api/gratitude-panel?id=${note.id}`, { x, y })
      .catch((err) => console.error('Failed to move note:', err));
  };

  return (
    <div className="w-full h-screen bg-[#EEF7FB] flex flex-col items-center justify-center gap-6 p-8">
      <div
        className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 flex flex-col items-center gap-4"
        style={{ width: STAGE_WIDTH + 120, height: STAGE_HEIGHT + 220 }}
      >
        <h2 className="text-xl font-semibold">Нэгэндээ урам өгөөрэй</h2>

        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              '#B9FBC0',
              '#A0C4FF',
              '#FFD6A5',
              '#FFADAD',
              '#D0F4DE',
              '#E4C1F9',
              '#FBE7C6',
              '#CDE7B0',
              '#B5EAEA',
              '#FFDAC1',
              '#C9BBCF',
              '#F1F0C0',
            ].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: selectedColor === color ? '2px solid #333' : '1px solid #ccc',
                }}
                title={`Choose ${color}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-600">Сонгосон өнгө:</span>
            <div
              style={{
                backgroundColor: selectedColor,
                width: 30,
                height: 30,
                borderRadius: 6,
                border: '1px solid #888',
              }}
            />
          </div>
        </div>

        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          ref={stageRef}
          className="border border-gray-100 rounded-xl"
        >
          <Layer>
            {!loading &&
              notes.map((note) => (
                <Group
                  key={note.id}
                  x={note.x}
                  y={note.y}
                  draggable
                  onDragEnd={(e) => handleDragEnd(note, e.target.x(), e.target.y())}
                >
                  <Rect
                    width={STICKY_WIDTH}
                    height={STICKY_HEIGHT}
                    fill={note.color || '#B9FBC0'}
                    cornerRadius={10}
                  />
                  <Text
                    ref={(ref) => {
                      textRefs.current[note.id] = ref;
                    }}
                    text={note.text}
                    x={20}
                    y={20}
                    width={STICKY_WIDTH - 40}
                    height={STICKY_HEIGHT - 80}
                    fontSize={12}
                    fontFamily="Arial"
                    fill="#6B7280"
                    onDblClick={() => handleDblClick(note)}
                    visible={editingId !== note.id}
                    lineHeight={1.4}
                    wrap="word"
                    ellipsis
                  />
                  <Text
                    text={`Бичсэн: ${note.username}`}
                    x={20}
                    y={STICKY_HEIGHT - 40}
                    fontSize={10}
                    fontFamily="Arial"
                    fill="#374151"
                    width={STICKY_WIDTH - 40}
                    wrap="word"
                  />
                </Group>
              ))}
          </Layer>
        </Stage>
      </div>

      <Button onClick={addNote}>➕ Шинэ стикер</Button>
    </div>
  );
};

export default GratitudeBoard;
