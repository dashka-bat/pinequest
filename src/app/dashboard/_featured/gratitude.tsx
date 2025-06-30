'use client';

import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { FaStamp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const STICKY_WIDTH = 200;
const STICKY_HEIGHT = 200;
const STAGE_WIDTH = 1760;
const STAGE_HEIGHT = 720;

type Note = {
  id: string;
  x: number;
  y: number;
  text: string;
  username: string;
  color?: string;
  stamp?: string;
};

type FlyingStamp = {
  id: string;
  stamp: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
};

const GratitudeBoard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#B9FBC0');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showStampPicker, setShowStampPicker] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

  const [flyingStamps, setFlyingStamps] = useState<FlyingStamp[]>([]);

  const stageRef = useRef<any>(null);
  const textRefs = useRef<Record<string, any>>({});

  const initialText = 'Type anything, @mention\nanyone';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/gratitude-panel');
        if (res.data.success) {
          const loadedNotes = res.data.data.notes.map((note: any) => ({
            id: note._id,
            x: note.positionX, 
            y: note.positionY,
            text: note.text || initialText,
            username: note.user.name,
            color: note.color || '#B9FBC0',
            stamp: note.stamp || null,
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

  const addNoteWithColor = async (color: string) => {
    const x = 120 + Math.random() * 300;
    const y = 120 + Math.random() * 200;

    try {
      const res = await axios.post('/api/gratitude-panel', { x, y, text: initialText, color }); // Анхны утга очиж байна
      if (res.data.success) {
        const n = res.data.data.newNote;
        setNotes((prev) => [
          ...prev,
          {
            id: n._id,
            x: n.positionX,
            y: n.positionY,
            text: n.text || initialText,
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

  const handleAddStampToNote = (noteId: string) => {
    if (!selectedStamp) return;

    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setNotes((prev) => prev.map((n) => (n.id === noteId ? { ...n, stamp: selectedStamp } : n)));

    const containerRect = stageRef.current.container().getBoundingClientRect();

    const newFlyingStamps: FlyingStamp[] = Array.from({ length: 3000 }).map((_, i) => {
      const startX = note.x + containerRect.left + STICKY_WIDTH / 2;
      const startY = note.y + containerRect.top + STICKY_HEIGHT / 2;

      const endX = Math.random() * window.innerWidth;
      const endY = Math.random() * window.innerHeight;

      const delay = i * 0.001;

      return {
        id: `${Date.now()}_${i}`,
        stamp: selectedStamp,
        startX,
        startY,
        endX,
        endY,
        delay,
      };
    });

    setFlyingStamps((prev) => [...prev, ...newFlyingStamps]);

    setTimeout(() => {
      setFlyingStamps((prev) => prev.filter((f) => !newFlyingStamps.some((n) => n.id === f.id)));
    }, 5000);

    axios
      .patch(`/api/gratitude-panel?id=${noteId}`, { stamp: selectedStamp })
      .catch((err) => console.error('Failed to add stamp:', err));
  };

  return (
    <div className="w-full h-[1000px] border-8 border-[#FFEBEB] bg-[#FFEBEB] flex flex-col items-center justify-center p-8 relative">
      <AnimatePresence>
        {flyingStamps.slice(-1000).map(({ id, stamp, startX, startY, endX, endY, delay }) => (
          <motion.div
            key={id}
            initial={{ opacity: 1, x: startX, y: startY, scale: 1 }}
            animate={{ opacity: 0, x: endX, y: endY, scale: 0.5 }}
            transition={{ delay, duration: 4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              fontSize: '2rem',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            {stamp}
          </motion.div>
        ))}
      </AnimatePresence>

      <div
        className="bg-[url('/bg.png')] bg-cover rounded-3xl shadow-lg border border-gray-200 p-6 flex flex-col items-center gap-4"
        style={{ width: STAGE_WIDTH + 120, height: STAGE_HEIGHT + 220 }}
      >
        <h2 className="text-xl font-semibold">Нэгэндээ урам өгөөрэй</h2>

        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          ref={stageRef}
          className="rounded-xl"
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
                  onClick={() => handleAddStampToNote(note.id)}
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
                    text={note.text || initialText} // Хоосон байвал анхны утга харуулна
                    x={20}
                    y={20}
                    width={STICKY_WIDTH - 40}
                    height={STICKY_HEIGHT - 80}
                    fontSize={15}
                    fontFamily="Arial"
                    fill="#6B7280"
                    onDblClick={() => handleDblClick(note)}
                    visible={editingId !== note.id}
                    lineHeight={1.4}
                    wrap="word"
                    // ellipsis-г түр устгав (урт текст таслахгүй)
                    // ellipsis
                  />
                  <Text
                    text={`Бичсэн: ${note.username}`}
                    x={20}
                    y={STICKY_HEIGHT - 40}
                    fontSize={13}
                    fontFamily="Arial"
                    fill="#374151"
                    width={STICKY_WIDTH - 40}
                    wrap="word"
                  />
                  {note.stamp && (
                    <Text
                      text={note.stamp}
                      x={STICKY_WIDTH - 40}
                      y={10}
                      fontSize={24}
                      fontFamily="Arial"
                      fill="#000"
                    />
                  )}
                </Group>
              ))}
          </Layer>
        </Stage>

        <div className="w-[280px] h-[150px] flex gap-3 justify-center ml-[1600px] bg-[#FFEBEB] absolute bottom-8  items-center rounded-tl-2xl">
          <Button className="w-[80px] h-[80px] bg-white" onClick={() => setShowColorPicker(true)}>
            <img
              width={60}
              height={60}
              alt="note"
              src="https://res.cloudinary.com/dxkgrtted/image/upload/v1751173566/Stickernote_bsguwj.png"
            />
          </Button>
          <Button
            className="w-[80px] h-[80px] bg-white"
            onClick={() => setShowStampPicker((prev) => !prev)}
          >
            <FaStamp className="text-black" width={50} height={50} />
          </Button>
        </div>
      </div>

      {showColorPicker && (
        <div className="flex flex-col items-center gap-4 bg-white border p-4 rounded-xl shadow-md mt-4">
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
                onClick={async () => {
                  setSelectedColor(color);
                  setShowColorPicker(false);
                  await addNoteWithColor(color);
                }}
                style={{
                  backgroundColor: color,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid #444',
                }}
                title={`Өнгө: ${color}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
              title="Өөрийн өнгө сонгох"
            />
            <span className="text-sm text-gray-600">{selectedColor}</span>
            <Button
              onClick={async () => {
                setShowColorPicker(false);
                await addNoteWithColor(selectedColor);
              }}
              className="text-sm"
            >
              Нэмэх
            </Button>
          </div>
        </div>
      )}

      {showStampPicker && (
        <div className="absolute top-[650px] right-[40px] bg-white p-4 rounded shadow-lg flex gap-3 z-50">
          {['✔️', '🔥', '⭐', '😭', '❤️', '🎉'].map((stamp) => (
            <button
              key={stamp}
              onClick={() => {
                setSelectedStamp(stamp);
                setShowStampPicker(false);
              }}
              className="text-3xl"
              title={`Тамга: ${stamp}`}
            >
              {stamp}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GratitudeBoard;
