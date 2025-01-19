import React, { useEffect, useState } from 'react';
import { Bars3Icon, ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid'

import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');


const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: null,
    },
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Director of Product',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
        lastSeen: null,
    },
]

export default function StackedList() {


    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Listen for real-time updates from the server
        socket.on('updateVotes', (data) => {
            const sorted = data.sort((a, b) => {
                console.log(a.votes_count, b.votes_count)
                return b.votes_count - a.votes_count
            })
            console.log(sorted)
            setMembers(sorted);
        });

        // Clean up the socket connection
        return () => {
            socket.disconnect();
        };
    }, []);

    return (<div className='w-full'>
        <div className='m-5'>
            <a href='/admin'>
                <button
                    type="button"
                    className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <Bars3Icon aria-hidden="true" className="size-5" />
                </button>
            </a>
        </div>


        <div className='w-full text-lg font-bold flex justify-center my-10'>
            <span>ຜົນການປ່ອນບັດເລືອກຕັ້ງຄະນະພັກກອງບັກຊາການທະຫານແຂວງບໍລິຄຳໄຊ ຊຸດທີ່ VII </span>
        </div>
        <div className='my-10 flex justify-center'>
            <ul
                role="list"
                className="w-4/12 divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
            >
                {members.map((person, idx) => (
                    <li key={person.email} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                        <div className="flex min-w-0 gap-x-6">
                            {/* <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}

                            <div className="size-10 flex justify-center items-center   rounded-full bg-rose-400" >
                                <p className='text-xl font-bold text-white'>{idx + 1}</p>
                            </div>
                            <div className="min-w-0 flex items-center">
                                <p className="text-xl font-semibold text-gray-900">
                                    <a href={person.href}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {person.fullname}
                                    </a>
                                </p>
                                {/* <p className="mt-1 flex text-xs/5 text-gray-500">
                  <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                    {person.email}
                  </a>
                </p> */}
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <p className="text-xl font-bold text-black">{person.votes_count}</p>
                                </div>
                                {/* <p className="text-sm/6 text-gray-900">{person.role}</p>
                {person.lastSeen ? (
                  <p className="mt-1 text-xs/5 text-gray-500">
                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs/5 text-gray-500">Online</p>
                  </div>
                )} */}
                            </div>
                            <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div >
    )
}
