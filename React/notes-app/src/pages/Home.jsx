import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-blue-300 flex justify-between items-center px-5 py-4">
                <h1 className='text-xl font-bold'>NoteeFy</h1>
                <button className="bg-violet-500 border-2 text-black border-black h-10 w-20 rounded-xl"
                    onClick={() => navigate("/notes")}>
                    Notes
                </button>
            </div>
        </>
    )
}

export default Home