import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Button } from './ui/button'
import SignOutBtn from './auth/SignOutBtn'
import ResponsiveNavbar from './ResponsiveNavbar'
import ModeToggle from './ModeToggle'

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

export default async function Navbar() {
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className='backdrop-blur-xl fixed z-50 w-full'>
            <nav className='flex items-center py-2 max-w-[100vw] px-2.5 md:px-12 tracking-wider justify-between'>
                <Link href='/' passHref>
                    <div className='inline-flex items-center text-2xl md:text-5xl cursor-pointer font-base'>
                        EnigmaEscape
                    </div>
                </Link>

                <div className='hidden top-navbar lg:inline-flex lg:w-auto'>
                    {navbarMainLink.map((link, index) => (
                        <Link href={link.path} passHref key={index}>
                            <span className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded items-center justify-center hover:bg-primary hover:text-white cursor-pointer'>{link.name}</span>
                        </Link>
                    ))}
                    {user && (
                        <Link href='/profile' passHref>
                            <span className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded items-center justify-center hover:bg-primary hover:text-white cursor-pointer'>Profile</span>
                        </Link>
                    )}
                </div>

                <div className='top-navbar lg:inline-flex lg:w-auto' >
                    <div className='hidden lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center lg:h-auto space-x-2' >

                        {!user ? (
                            <div className='lg:inline-flex lg:w-auto w-full space-x-2 rounded items-center justify-center'>
                                {navbarAuthLink.map((link, index) => (
                                    <Link href={link.path} passHref key={index}>
                                        <Button>{link.name}</Button>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <SignOutBtn />
                            </div>
                        )}

                    </div>
                    <div className='flex space-x-2 justify-between items-center ml-2'>
                        <ModeToggle />
                        <ResponsiveNavbar isAuth={!!user} />
                    </div>
                </div>


            </nav>
        </div>
    )
}
