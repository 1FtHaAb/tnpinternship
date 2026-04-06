import { useState } from "react";

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(note.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-baseline gap-2 mb-2">

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          className="border-2 border-black px-3 py-2 rounded-xl flex-1"
        />
      ) : (
        <div
          className="bg-white border-2 border-black rounded-xl p-3 flex-1 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {note.text}
        </div>
      )}

      {isEditing ? (
        <button
          className="bg-blue-500 text-white px-2 rounded-xl"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
                className="bg-red-500 border-2 border-black h-7 w-auto rounded-lg px-2 ml-2 font-bold text-white"
                onClick={() => onDelete(note.id)}
            >
                X
            </button>
      )}

    </div>
  );
};

export default NoteCard;