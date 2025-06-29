'use client';

import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { FaStamp } from "react-icons/fa";

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
  stamp?: string; // Тамга нэмэгдсэн талбар
};

const GratitudeBoard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#B9FBC0');
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Шинэ нэмэгдсэн state-үүд:
  const [showStampPicker, setShowStampPicker] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

  const stageRef = useRef<any>(null);
  const textRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/gratitude-panel');
        if (res.data.success) {
          const loadedNotes = res.data.data.notes.map((note: any) => ({
            id: note._id,
            x: note.positionX,
            y: note.positionY,
            text: note.text,
            username: note.user.name,
            color: note.color || '#B9FBC0',
            stamp: note.stamp || null, // API-аас авсан байж магадгүй
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
    const text = 'Type anything, @mention\nanyone';
  

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
            stamp: null,
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

  // Шинээр нэмсэн: note дээр дарж тамга нэмэх функц
  const handleAddStampToNote = (noteId: string) => {
    if (!selectedStamp) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, stamp: selectedStamp } : note
      )
    );

    // API-д хадгалах хэсэг
    axios
      .patch(`/api/gratitude-panel?id=${noteId}`, { stamp: selectedStamp })
      .catch((err) => console.error('Failed to add stamp:', err));
  };

  return (
    <div className="w-full h-[1000px] bg-[#EEF7FB] flex flex-col items-center justify-center p-8">
      <div
        className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 flex flex-col items-center gap-4"
        style={{ width: STAGE_WIDTH + 120, height: STAGE_HEIGHT + 220 }}
      >
        <h2 className="text-xl font-semibold">Нэгэндээ урам өгөөрэй</h2>

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
                  onClick={() => handleAddStampToNote(note.id)} // note дээр дарж тамга нэмнэ
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
                    fontSize={15}
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
                    fontSize={13}
                    fontFamily="Arial"
                    fill="#374151"
                    width={STICKY_WIDTH - 40}
                    wrap="word"
                  />

                  {/* Тамга-г note дээр харуулах */}
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

        {/* Өнгө сонгох товчлуур */}
        <div className="w-[200px] h-[100px] flex gap-3 justify-center ml-[1600px] bg-[#EEF7FB] items-center">
          <Button
            className="w-[80px] h-[80px] bg-white"
            onClick={() => setShowColorPicker(true)}
          >
            <img
              width={60}
              height={60}
              alt="note"
              src="https://res.cloudinary.com/dxkgrtted/image/upload/v1751173566/Stickernote_bsguwj.png"
            />
          </Button>

          {/* Тамга товчлуур */}
          <Button
            className="w-[80px] h-[80px] bg-white"
            onClick={() => setShowStampPicker((prev) => !prev)}
          >
            <FaStamp className="text-black" width={50} height={50} />
          </Button>
        </div>
      </div>

      {/* Өнгө сонгох хэсэг */}
      {showColorPicker && (
        <div className="flex flex-col items-center gap-4 bg-white border p-4 rounded-xl shadow-md mt-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              '#B9FBC0', '#A0C4FF', '#FFD6A5', '#FFADAD',
              '#D0F4DE', '#E4C1F9', '#FBE7C6', '#CDE7B0',
              '#B5EAEA', '#FFDAC1', '#C9BBCF', '#F1F0C0',
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

      {/* Тамга сонгох popup */}
      {showStampPicker && (
        <div className="absolute top-[650px] right-[40px] bg-white p-4 rounded shadow-lg flex gap-3 z-50">
          {['✔️', '🔥', '⭐', '🚀', '💡', '🎉'].map((stamp) => (
            <button
              key={stamp}
              onClick={() => {
                setSelectedStamp(stamp);
                setShowStampPicker(false);
              }}
              className="text-3xl"
              title={`Tamga: ${stamp}`}
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
