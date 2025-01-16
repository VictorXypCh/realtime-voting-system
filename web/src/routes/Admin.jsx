import React, { useState } from 'react';
import Register from '../components/Register';
import VoteList from '../components/VoteList';
import { Bars3Icon } from '@heroicons/react/20/solid';

const App = () => {
    const [refresh, setRefresh] = useState(false);
    const [editMember, setEditMember] = useState(null);

    const handleRegister = () => {
        //setRefresh((prev) => !prev);
    };

    const handleEdit = (member) => {
        setEditMember(member);
    };

    const handleEditComplete = () => {
        setEditMember(null);
        //setRefresh((prev) => !prev);
    };

    return (
        <div className="p-4">
            <div  className='mb-4'>
                <a href='/'>
                    <button
                        type="button"
                        className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <Bars3Icon aria-hidden="true" className="size-5" />
                    </button>
                </a>
            </div>
            <h1 className="text-2xl font-bold mb-4">Vote System</h1>
            <Register
                onRegister={handleRegister}
                editMember={editMember}
                onEditComplete={handleEditComplete}
            />
            <VoteList onEdit={handleEdit} />
        </div>
    );
};



export default App;
