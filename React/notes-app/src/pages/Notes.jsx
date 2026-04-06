import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteCard from '../components/noteCard';

const Notes = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const [notes, setNotes] = useState(() => {
        try {
            const savedNotes = JSON.parse(localStorage.getItem("notes"));
            return savedNotes || [];
        } catch {
            return [];
        }
    });

    const editNote = (id, newText) => {
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, text: newText } : note
            )
        );
    };

    const addNote = () => {
        if (!text.trim()) return;

        const newNote = {
            id: Date.now(),
            text: text
        };

        setNotes([...notes, newNote]);
        setText("");
    };

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <>
            <div className="bg-blue-300 flex justify-between items-center px-5 py-4">
                <div onClick={()=>navigate("/")} className='cursor-pointer'>
                    <h1 className="text-xl font-bold">Notes</h1>
                </div>
                <button className="bg-yellow-500 border-2 text-black border-black h-10 w-20 rounded-xl" onClick={() => navigate("/")}>Home</button>
            </div>

            <div className="px-5 pt-5 flex flex-col gap-3">
                <div className="relative w-full">
                    <div
                        className={`flex gap-2 w-full absolute transition-all duration-300 ${showSearch ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
                            }`}
                    >
                        <input
                            type="text"
                            placeholder="Enter note..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") addNote(); }}
                            className="border-2 border-black px-3 py-2 rounded-xl flex-1"
                        />
                        <button
                            className="bg-green-500 border-2 text-black border-black px-4 rounded-xl whitespace-nowrap"
                            onClick={addNote}
                        >
                            + Add
                        </button>
                    </div>

                    <div
                        className={`w-full absolute transition-all duration-300 ${showSearch ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                            }`}
                    >
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-2 border-black px-3 py-2 rounded-xl w-full"
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => {
                            setShowSearch(!showSearch);
                            if (showSearch) setSearch("");
                        }}
                        className="bg-gray-200 border-2 border-black rounded-xl px-3 py-2 hover:bg-gray-300 transition"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

            </div>

            <div className="px-5 pt-5">
                {filteredNotes.length === 0 && <p className="text-center text-gray-500 mt-5">No notes found</p>}
                {filteredNotes.map((note) => (
                    <NoteCard key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
                ))}
            </div>
        </>
    )
}

export default Notes