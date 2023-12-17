/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState, useRef } from 'react'
import { getUserProfileDetails, updateUserProfile, updateUserScoreProfile, getScoreDetails } from '@/lib/supabaseRequests'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'
import { Pencil, X } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function Profile({ userId }: { userId: string }) {
    const [profileDetails, setProfileDetails] = useState<any>(null);
    const [newUserName, setNewUserName] = useState('');
    const [editing, setEditing] = useState(false);
    const [scores, setScores] = useState([]);

    const { toast } = useToast();
    const [showCode, setShowCode] = React.useState(false);
    const ref = useRef(null);

    const [message, setMessage] = useState("");
    const [valid, setValid] = useState(false);

    console.log('I hide in plain sight, a playful tease, A secret, a surprise, to bring you ease. In games and software, I\'m often found, A hidden gem when you look around. Tap on profile picture twice and tell me what am I?')

    const getInputValue = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // @ts-ignore
        const userValue = ref.current.value;

        if (userValue === "Easter egg") {
            setValid(true);
            setMessage("You won, here is your reward");

        }
        else if (userValue !== "Easter egg") {
            setValid(false);
            setMessage("Wrong code, keep trying");
        }
    }

    const fetchUserProfile = async () => {
        try {
            const data = await getUserProfileDetails({ user_auth_id: userId });
            setProfileDetails(data);
            // @ts-ignore
            setNewUserName(data?.[0]?.user_name || '');
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    useEffect(() => {
        const fetchAndSetScores = async () => {
            const scoresData = await getScoreDetails();
            // @ts-ignore
            scoresData.sort((a, b) => {
                if (a.score !== b.score) {
                    return b.score - a.score;
                } else {
                    return a.completed_in - b.completed_in;
                }
            });
            // @ts-ignore
            setScores(scoresData);
        };

        fetchAndSetScores();
    }, []);

    const renderUserName = () => {
        const userName = profileDetails?.[0]?.user_name;
        const userIdString = profileDetails?.[0]?.user_id;

        if (userName === null || userName === undefined) {
            return `user_${userIdString.slice(5, 8)}${userIdString.slice(-5)}`;
        }

        return userName;
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await updateUserProfile(userId, { user_name: newUserName });
            await updateUserScoreProfile(userId, { user_name: newUserName });
            setEditing(false);
            fetchUserProfile();
            toast({
                title: "User name updated successfully",
            })
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <div>
            {profileDetails ? (
                <div>
                    <div className='grid place-items-center'>
                        <Image
                            src={profileDetails[0]?.profile_img}
                            className='border-2 border-accent rounded-full p-0'
                            height={200}
                            width={200}
                            alt={profileDetails[0]?.profile_img}
                            onDoubleClick={() => setShowCode(true)}
                        />
                        {showCode ? (
                            <div>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative my-6  w-96">
                                        <div className="border-2 border-accent rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-solid rounded-t">
                                                <div className="text-2xl font-base tracking-wide cursor-pointer">
                                                    You found a secret!
                                                </div>

                                                <button className="absolute right-6" onClick={() => setShowCode(false)} aria-label="button">
                                                    <X className="h-7 w-7" aria-hidden="false" />
                                                </button>

                                            </div>

                                            <div className="grid place-items-center text-xl py-2 gap-2 w-full mb-4"
                                            >
                                                <p className='text-center'>You found a secret 🥳🥳!!</p>
                                                <p className='text-center'>Fill the code below and get a surprise!!</p>

                                                <div className="mt-4 outline-transparent outline grid place-items-center mx-12">
                                                    <Input placeholder="Type the code here" type="text" ref={ref} onChange={getInputValue} className="block w-full pb-2 text-lg text-gray-200 placeholder-gray-400 bg-transparent border-b-2 border-gray-400 appearance-none rounded-xl focus:border-green-400 focus:outline-none text-center" />
                                                    <div className='text-center'>
                                                        {message && <div>
                                                            <p className={valid ? "text-green-500 " : "text-red-400"} >{message}</p>
                                                            <a href="https://c.tenor.com/rtnshG9YFykAAAAM/rick-astley-rick-roll.gif" target="_blank" className={valid ? "block" : "hidden"} >
                                                                <button className='bg-blue-600 my-2 text-white py-2 px-8 rounded-md ml-2'>
                                                                    Claim reward
                                                                </button>
                                                            </a>
                                                        </div>}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="opacity-25 fixed inset-0 z-40 h-screen bg-black"></div>
                            </div>
                        ) : null}

                    </div>
                    <div className='md:px-16 text-xl flex flex-col space-y-3'>
                        <p>User email: {profileDetails[0]?.email}</p>
                        {editing ? (
                            <div className='flex flex-row items-center space-x-2'>
                                <p>User name: </p>
                                <Input
                                    type='text'
                                    id='newUserName'
                                    value={newUserName}
                                    className='max-w-xs'
                                    onChange={(e) => setNewUserName(e.target.value)}
                                />
                                <Button onClick={handleSaveClick}>Save</Button>
                                <Button className='bg-destructive hover:bg-red-800' onClick={() => setEditing(false)}>Cancle</Button>
                            </div>
                        ) : (
                            <div className='flex flex-row space-x-2'>
                                <p>User name: {renderUserName()}</p>
                                <button className='text-lg' onClick={handleEditClick}><Pencil /></button>
                            </div>
                        )}
                    </div>
                    <div className='py-8'>

                        <Table className='overflow-hidden border-2 border-accent p-2'>
                            <TableCaption>A list of your recent scores.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User Name</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Completed In</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='h-full'>
                                {scores
                                    // @ts-ignore
                                    .filter((score) => userId === score.user_id)
                                    .map((score) => (
                                        // @ts-ignore
                                        <TableRow key={score.id}>
                                            {/* @ts-ignore */}
                                            <TableCell>{score.user_name || `user_${userId.slice(5, 8)}${userId.slice(-5)}`}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell>{score.score}</TableCell>
                                            {/* @ts-ignore */}
                                            <TableCell>{score.completed_in} sec</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
