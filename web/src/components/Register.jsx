import React, { useState, useEffect } from 'react';

const Register = ({ onRegister, editMember, onEditComplete }) => {
    const [fullname, setFullname] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editMember) {
            setFullname(editMember.fullname);
            setEditing(true);
        }
    }, [editMember]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullname) return;

        if (editing) {
            // Update existing member
            await fetch(`http://localhost:3002/votes/${editMember.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname }),
            });
            onEditComplete();
        } else {
            // Add new member
            const newMember = { fullname, votes_count: 0 };
            await fetch('http://localhost:3002/votes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember),
            });
        }

        onRegister(); // Refresh the list
        setFullname('');
        setEditing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-4">
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="border border-gray-300 p-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {editing ? 'Update' : 'Register'}
            </button>
            {editing && (
                <button
                    type="button"
                    onClick={() => {
                        setFullname('');
                        setEditing(false);
                        onEditComplete();
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default Register;
