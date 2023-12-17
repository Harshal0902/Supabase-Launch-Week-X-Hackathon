/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from 'react'
import { getUserProfileDetails, updateUserProfile } from '@/lib/supabaseRequests'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'
import { Pencil } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Profile({ userId }: { userId: string }) {
    const [profileDetails, setProfileDetails] = useState<any>(null);
    const [newUserName, setNewUserName] = useState('');
    const [editing, setEditing] = useState(false);
    const { toast } = useToast();

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
                        />
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
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
