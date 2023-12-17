"use client"

import React, { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { BadgeInfo, User, Mail, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Page() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const logIn = async () => {
        try {
            setLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                // @ts-ignore
                setErrorMsg(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <MaxWidthWrapper>
            <div className='flex min-h-[85vh] items-center justify-center'>
                <Card className='animate-fade-in-down max-w-5xl' >
                    <div className='md:flex w-full'>
                        <div className='w-full md:w-1/2 px-4 md:p-10'>
                            <div className='my-4'>
                                <div className='flex flex-row items-center justify-start space-x-2'>
                                    <h1 className='font-bold text-3xl'>Log In</h1>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger><BadgeInfo size={24} /></TooltipTrigger>
                                            <TooltipContent>
                                                <h1>Use below credentials for login if you don&apos;t wish to create new account</h1>
                                                <p><b>Email:</b> harshalraikwar07@gmail.com</p>
                                                <p><b>Password:</b> harshal_1234</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className='mt-4'>
                                    Don&apos;t have an account? <span className='text-primary'><Link href='/sign-up' passHref> Sign Up here </Link></span>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <div className='flex -mx-3'>
                                    <div className='w-full px-3'>
                                        <Label htmlFor=''>Your Email</Label>
                                        <div className='flex pt-1'>
                                            <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'><Mail height={20} width={20} /></div>
                                            <Input id='email' name='email' type='email' value={formData.email} onChange={handleChange} className='w-full -ml-10 pl-10 pr-3 py-2' required placeholder='Email' />
                                        </div>
                                        <p className='text-[0.8rem] py-1 tracking-wide'>Use this if you don&apos;t wish to create new account<br /><b>Email:</b> harshalraikwar07@gmail.com</p>
                                        {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
                                    </div>
                                </div>
                                <div className='flex -mx-3'>
                                    <div className='w-full px-3'>
                                        <Label htmlFor=''>Your Password</Label>
                                        <div className='flex pt-1'>
                                            <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'><LockKeyhole height={20} width={20} /></div>
                                            <Input type='password' name='password' value={formData.password} onChange={handleChange} className='w-full -ml-10 pl-10 pr-3 py-2' required placeholder='Your Password' />
                                        </div>
                                        <p className='text-[0.8rem] py-1 tracking-wide'>Use this if you don&apos;t wish to create new account<br /><b>Password:</b> harshal_1234</p>
                                        {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
                                    </div>
                                </div>
                                <div className='flex -mx-3'>
                                    <div className='w-full px-3 mb-5'>
                                        <Button type='submit' onClick={logIn} disabled={loading} className='text-white w-full'>{loading ? 'Loading...' : 'Log In'}</Button>
                                    </div>
                                </div>
                                <Link href='/reset-password' className='w-full underline text-right' passHref>
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 p-4 md:p-10 flex flex-col items-center justify-center'>
                            <div className='hidden md:flex md:items-center'>
                                <Image src='/assets/auth/login.svg' width='400' height='400' alt='Contact Us' className='w-full' />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </MaxWidthWrapper>
    )
}
