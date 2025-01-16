import { Bars3Icon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const socket = io('http://localhost:3002');

const VoteList = ({ onEdit }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Listen for real-time updates from the server
        socket.on('updateVotes', (data) => {
            setMembers(data);
        });

        // Clean up the socket connection
        return () => {
            socket.disconnect();
        };
    }, []);

    const incrementVote = async (id, currentVotes) => {
        await fetch(`http://localhost:3002/votes/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ votes_count: currentVotes + 1 }),
        });
    };

    const decrementVote = async (id, currentVotes) => {
        if (currentVotes > 0) {
            await fetch(`http://localhost:3002/votes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ votes_count: currentVotes - 1 }),
            });
        }
    };

    const deleteMember = async (id) => {
        await fetch(`http://localhost:3002/votes/${id}`, {
            method: 'DELETE',
        });
    };

    return (
        <div className="mt-4">


            {members.map((member) => (
                <div
                    key={member.id}
                    className="flex py-5 justify-between items-center border-b p-2"
                >
                    <div className='grid grid-cols-2 gap-x-10'>
                        <div>
                            <span className='text-2xl'>{member.fullname}</span>
                        </div>
                        <div className='flex gap-x-2'>
                            <button
                                onClick={() => incrementVote(member.id, member.votes_count)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                +
                            </button>
                            <span>{member.votes_count}</span>
                            <button
                                onClick={() => decrementVote(member.id, member.votes_count)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                -
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={() => onEdit(member)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteMember(member.id)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VoteList;
