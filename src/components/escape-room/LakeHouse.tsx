/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { insertScore } from '@/lib/supabaseRequests'

export default function LakeHouse({ userId }: { userId: string }) {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isRiddleOpen, setRiddleOpen] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const [riddles, setRiddles] = useState<string[]>([])
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [points, setPoints] = useState<number>(0)
    const [score, setScore] = useState<number | null>(null)
    const [completedIn, setCompletedIn] = useState<number | null>(null)

    const toggleOpen = () => setOpen((prev) => !prev)
    const toggleRiddleOpen = () => setRiddleOpen((prev) => !prev)

    const user_id = userId
    const room_id = 'Lake House'

    useEffect(() => {
        if (isRiddleOpen) {
            const interval = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 10)
            const newRiddles = [
                "Wooden and still, yet provides a soft glow, By the bedside, I'm a friend you may know. What am I?",
                "I come in various sizes, a cozy embrace, Pillows and cushions enhance my grace. What am I?",
                "I have pages and stories, a literary delight. Curl up with me on a tranquil night. What am I?",
                "With a door and some shelves, I hold treasures dear. From novels to trinkets, it's all stored here. What am I?",
                "I stand tall and bright, a source of light. Twist my switch, and banish the night. What am I?",
                "I keep you warm on a chilly night. Crackling and cozy, a flickering light. What am I?",
                "With a view to the outdoors, I frame the scene. I'm more than a window; I'm a tranquil dream. What am I?",
                "I'm where meals are prepared with love and care. Pots, pans, and flavors fill the air. What am I?",
                "Soft underfoot, I cover the floor. Step on me gently; I'm part of the decor. What am I?",
                "On the wall, I hang with memories grand. A moment frozen, captured in the sand. What am I?"
            ];
            setRiddles(newRiddles);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isRiddleOpen]);

    const handleAnswerSubmit = () => {
        const correctAnswers = [
            "Nightstand",
            "Sofa",
            "Book",
            "Cabinet",
            "Lamp",
            "Fireplace",
            "Window",
            "Kitchen",
            "Rug",
            "Picture"
        ];
        // const earnedPoints = userAnswers.reduce((total, answer, index) => {
        //     // @ts-ignore
        //     return total + (answer.toLowerCase().change() === correctAnswers[index].toLowerCase().change() ? 10 : 0);
        // }, 0);
        const earnedPoints = userAnswers.reduce((total, answer, index) => {
            if (answer && correctAnswers[index]) {
                return total + (answer.toLowerCase() === correctAnswers[index].toLowerCase() ? 10 : 0);
            } else {
                return total;
            }
        }, 0);

        const complete_time = timer / 100;
        const room_score = earnedPoints;
        const createdAt = new Date();

        setPoints((prevPoints) => prevPoints + earnedPoints);
        insertScore(user_id, complete_time, room_id, room_score, createdAt);

        setTimer(0);
        setUserAnswers([]);
        setRiddleOpen(false);

        setScore(earnedPoints);
        setCompletedIn(timer / 100);
    };

    return (
        <div>
            <script type='module' src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js' async />

            <div className='absolute'>
                <Link href="/escape-rooms">
                    Go back
                </Link>
            </div>

            <h1 className='text-3xl md:text-5xl text-center'>Lake House</h1>

            <div className='w-full px-2 flex flex-col md:flex-row items-center justify-between gap-2'>
                <Button variant={'outline'} onClick={toggleOpen}>Instructions</Button>
                {isOpen ? (
                    <div>
                        <div className='animate-fade-in-down flex overflow-x-hidden mx-2 -mt-2 h-screen overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                            <div className='relative m-4 md:m-12 w-screen'>
                                <div className='border-2 border-accent rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none'>
                                    <div className='flex items-start justify-between p-5 border-solid rounded-t'>
                                        <div className='inline-flex items-center text-2xl pt-8 md:pt-0 font-base tracking-wide cursor-pointer'>
                                            Escape Challenge Game Instructions:
                                        </div>

                                        <button className='absolute right-6' onClick={toggleOpen} aria-hidden='false' aria-label='button'>
                                            <X className='h-7 w-7' aria-hidden='false' />
                                        </button>
                                    </div>

                                    <div className='grid justify-center'>
                                        <div className='inline-flex w-64 h-1 bg-primary rounded-full'></div>
                                    </div>

                                    <p className='px-4'>Embark on an exhilarating adventure where your wits and speed will be put to the test. Follow these instructions to maximize your gaming experience:</p>

                                    <div className='grid place-items-center text-base md:text-xl py-2 gap-2 w-full mb-4'>
                                        <div className="grid gap-4 px-2 py-4">
                                            <ol>
                                                <li className=''>1. Start the Game</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Click on the &apos;Start Game&apos; button to initiate the challenge.</li>
                                                    <li className='list-disc ml-8'>Once started, the timer will begin counting down, and there&apos;s no turning back!</li>
                                                </ul>
                                                <li className=''>2. Game Objective</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Solve as many riddles as you can within the given time.</li>
                                                    <li className='list-disc ml-8'>Each correct answer takes you one step closer to victory.</li>
                                                </ul>
                                                <li className=''>3. 3D Model Hints</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>You will be presented with 3D models that contain hidden clues.</li>
                                                    <li className='list-disc ml-8'>Examine the models closely; they hold the key to solving the riddles.</li>
                                                    <li className='list-disc ml-8'>Objects in the model are essential for answering questions correctly.</li>
                                                </ul>
                                                <li className=''>4. Find and Identify</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Locate objects related to the 3D models within the game environment.</li>
                                                    <li className='list-disc ml-8'>Each identified object brings you closer to unveiling the solution.</li>
                                                </ul>
                                                <li className=''>5. Answer Questions</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>As you find objects, riddles related to them will be presented.</li>
                                                    <li className='list-disc ml-8'>Input your answers swiftly and accurately to earn points.</li>
                                                </ul>
                                                <li className=''>6. No Turning Back</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>The timer cannot be stopped once started, adding an extra layer of challenge.</li>
                                                    <li className='list-disc ml-8'>Your goal is to answer as many questions as possible within the given time.</li>
                                                </ul>
                                                <li className=''>7. Hints and Strategies</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Use the 3D model hints wisely; they are your lifeline in the game.</li>
                                                    <li className='list-disc ml-8'>Employ strategic thinking to prioritize which questions to answer first.</li>
                                                </ul>
                                                <li className=''>8. Leaderboard</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Your final score and time will be recorded on the leaderboard.</li>
                                                    <li className='list-disc ml-8'>Compete with others to secure the top spot.</li>
                                                </ul>
                                                <li className=''>9. Enjoy the Adventure</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Immerse yourself in the interactive environment and enjoy the thrill of the escape challenge.</li>
                                                </ul>
                                                <li className=''>10. Share Your Success</li>
                                                <ul>
                                                    <li className='list-disc ml-8'>Once you complete the challenge, share your success on social media.</li>
                                                    <li className='list-disc ml-8'>Challenge friends and family to beat your score.</li>
                                                </ul>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='opacity-25 fixed inset-0 z-40 h-screen bg-black hidden'></div>
                    </div>
                ) : null}

                <Button onClick={toggleRiddleOpen}>Start Game</Button>
                {isRiddleOpen ? (
                    <div>
                        <div className='animate-fade-in-down flex overflow-x-hidden mx-2 -mt-2 h-screen overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                            <div className='relative m-4 md:m-12 w-screen'>
                                <div className='border-2 border-accent rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none'>
                                    <div className='flex items-start justify-between p-5 border-solid rounded-t'>
                                        <div className='inline-flex items-center text-2xl font-base tracking-wide cursor-pointer'>
                                            Answer the Riddles
                                        </div>

                                        <button className='absolute right-6' onClick={toggleRiddleOpen} aria-hidden='false' aria-label='button'>
                                            <X className='h-7 w-7' aria-hidden='false' />
                                        </button>
                                    </div>

                                    <div className='grid justify-center'>
                                        <div className='inline-flex w-64 h-1 bg-primary rounded-full'></div>
                                    </div>

                                    <p className='px-4'>Answer the riddles and climb the leaderboard</p>

                                    <div className='grid place-items-center text-xl py-2 gap-2 w-full mb-4'>
                                        <div className="grid gap-4 p-4">
                                            {riddles.map((riddle, index) => (
                                                <div key={index} className='flex flex-col items-center justify-center md:flex-row space-y-2 md:space-x-4'>
                                                    <p>{riddle}</p>
                                                    <Input
                                                        className='border-t-transparent border-x-transparent outline-none'
                                                        placeholder='Answer'
                                                        value={userAnswers[index] || ''}
                                                        onChange={(e) => {
                                                            const newAnswers = [...userAnswers]
                                                            newAnswers[index] = e.target.value
                                                            setUserAnswers(newAnswers)
                                                        }}
                                                    />
                                                </div>
                                            ))}

                                            <Button type="submit" onClick={handleAnswerSubmit}>Submit Answers</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='opacity-25 fixed inset-0 z-40 h-screen bg-black hidden'></div>
                    </div>
                ) : null}
            </div>

            {score !== null && completedIn !== null && !isRiddleOpen && (
                <div className="text-center mt-4">
                    <p>Score: {score}</p>
                    <p>Completed In: {completedIn} seconds</p>
                </div>
            )}

            <div className='bg-[#020817] p-2 border-2 border-accent rounded-md mx-4 md:mx-36 my-4'>
                {/* @ts-ignore */}
                <model-viewer src="https://edroxdhjlwdlgziukadr.supabase.co/storage/v1/object/sign/models/house.glb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2RlbHMvaG91c2UuZ2xiIiwiaWF0IjoxNzAyODc4ODgyLCJleHAiOjE3MzQ0MTQ4ODJ9.t-eW7h_RUP9elUIrVe_NErsUBql4pQ_6ss7Vh4frjNk&t=2023-12-18T05%3A54%3A42.508Z"
                    quick-look-browsers='safari chrome'
                    camera-controls ar ar-modes='webxr scene-viewer quick-look'
                    shadow-intensity='1' shadowSoftness='1' exposure='1' ar-placement='floor'
                    ar-scale='auto' min-camera-orbit='auto auto auto' max-camera-orbit='auto auto auto'
                    alt='A 3D model'
                    xr-environment
                    style={{ width: '100%', height: '420px' }}
                >
                    <button slot='ar-button' className='absolute top-2 right-2 text-black flex items-center bg-gray-100 border border-1 border-gray-300 py-1 px-2 rounded'>
                        View in AR
                    </button>

                    {/* @ts-ignore */}
                </model-viewer>
            </div>
        </div>
    )
}
