"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getScoreDetails } from '@/lib/supabaseRequests'

export default function Leaderboard({ userId }: { userId: any }) {
    const [scores, setScores] = useState([]);

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

    return (
        <div className='pb-8'>
            <h1 className='text-3xl md:text-5xl text-center'>Leaderboard</h1>

            <Table className='overflow-hidden border-2 border-accent p-2'>
                <TableCaption>A list of recent scores.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Completed In</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='h-full'>
                    {scores.map((score) => (
                        // @ts-ignore
                        <TableRow key={score.id} className={userId === score.user_id ? 'bg-accent' : ''}>
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
    )
}
