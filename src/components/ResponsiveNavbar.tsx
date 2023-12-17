"use client"

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from './ui/button'

interface NavLink {
    name: string;
    path: string;
}

const navbarMainLink: NavLink[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Escape Rooms',
        path: '/escape-rooms'
    },
    {
        name: 'Leaderboard',
        path: '/leaderboard'
    }
]

const navbarAuthLink: NavLink[] = [
    {
        name: 'Log In',
        path: '/log-in'
    },
    {
        name: 'Sign Up',
        path: '/sign-up'
    }
]

export default function ResponsiveNavbar({ isAuth }: { isAuth: boolean }) {

    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleOpen = () => setOpen((prev) => !prev)

    const pathname = usePathname()

    useEffect(() => {
        if (isOpen) toggleOpen()
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pathname])

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('ERROR:', error);
        }
    }

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            toggleOpen()
        }
    }

    return (
        <div className='lg:hidden'>

            <button type='button' onClick={toggleOpen} aria-hidden='false' aria-label='button' className='pt-1'>
                <Menu className='h-7 w-7' aria-hidden='false' />
            </button>

            {isOpen ? (
                <div>
                    <div className='animate-fade-in-down flex overflow-x-hidden mx-2 -mt-2 h-screen overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none lg:hidden'>
                        <div className='relative my-4 mx-auto w-screen'>
                            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none'>
                                <div className='flex items-start justify-between p-5 border-solid rounded-t'>
                                    <Link href='/' passHref>
                                        <div className='inline-flex items-center text-2xl font-base tracking-wide cursor-pointer'>
                                            EnigmaEscape
                                        </div>
                                    </Link>

                                    <button className='absolute right-6' onClick={toggleOpen} aria-hidden='false' aria-label='button'>
                                        <X className='h-7 w-7' aria-hidden='false' />
                                    </button>
                                </div>

                                <div className='grid justify-center'>
                                    <div className='inline-flex w-64 h-1 bg-primary rounded-full'></div>
                                </div>

                                <div className='grid place-items-center text-xl py-2 gap-2 w-full mb-4'>
                                    {navbarMainLink.map((link, index) => (
                                        <Link onClick={() => closeOnCurrent(link.path)} href={link.path} className='inline-flex w-auto px-3 py-2 rounded items-center justify-center hover:bg-primary hover:text-white transition cursor-pointer' passHref key={index}>
                                            {link.name}
                                        </Link>
                                    ))}

                                    {!isAuth ? (
                                        <div className='grid place-items-center gap-2'>
                                            {navbarAuthLink.map((link, index) => (
                                                <Link onClick={() => closeOnCurrent(link.path)} href={link.path} passHref key={index}>
                                                    <Button>
                                                        {link.name}
                                                    </Button>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='grid'>
                                            <Link onClick={() => closeOnCurrent('/profile')} href={'/profile'} className='inline-flex w-auto px-3 py-2 rounded items-center justify-center hover:bg-primary hover:text-white transition cursor-pointer' passHref>
                                                Profile
                                            </Link>
                                            <Button className='bg-red-500 hover:bg-red-600 cursor-pointer' onClick={handleSignOut}>
                                                Log Out
                                            </Button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='opacity-25 fixed inset-0 z-40 h-screen bg-black md:hidden'></div>
                </div>
            ) : null}

        </div>
    )
}
