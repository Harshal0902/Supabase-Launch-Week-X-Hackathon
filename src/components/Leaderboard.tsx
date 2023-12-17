"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getScoreDetails } from '@/lib/supabaseRequests'

export default function Leaderboard({ userId }: { userId: any }) {
    const [scores, setScores] = useState([]);

    // Effect to fetch scores when the component mounts
    useEffect(() => {
        const fetchAndSetScores = async () => {
            const scoresData = await getScoreDetails();

            scoresData.sort((a, b) => {
                if (a.score !== b.score) {
                    return b.score - a.score;
                } else {
                    return a.completed_in - b.completed_in;
                }
            });

            setScores(scoresData);
        };

        fetchAndSetScores();
    }, []);

    return (
        <div className='pb-8'>
            <h1 className='text-3xl md:text-5xl text-center'>Leaderboard</h1>

            <Table className='overflo'>
                <TableCaption>A list of your recent scores.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Completed In</TableHead>
                        {/* <TableHead>Room or Easter Egg ID</TableHead> */}
                        <TableHead>Score</TableHead>
                        {/* <TableHead>Completed At</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody className='h-full'>
                    {scores.map((score) => (
                        <TableRow key={score.id} className={userId === score.user_id ? 'bg-accent' : ''}>
                            <TableCell>{score.id}</TableCell>
                            <TableCell>{score.user_id}</TableCell>
                            <TableCell>{score.completed_in}</TableCell>
                            {/* <TableCell>{score.room_or_easter_egg_id}</TableCell> */}
                            <TableCell>{score.score}</TableCell>
                            {/* <TableCell>{score.created_at}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
