import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default async function Page() {
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

    // if (!user) {
    //     redirect('/log-in');
    // }

    return (
        <MaxWidthWrapper>
            <div className='grid place-items-center'>
                <h1 className='text-2xl md:text-6xl text-center'>Escape Rooms</h1>
            </div>
            <p className='italic text-lg md:text-xl'>Choose escape room</p>

            <div className='flex flex-wrap justify-center w-full py-4 md:py-8'>
                <Card className='max-w-[20rem] m-4'>
                    <CardHeader>
                        <div className='p-2 grid place-items-center rounded'>
                            <Image src='/assets/escape-rooms/house-glb.png' width='200' height='200' alt='Room' />
                        </div>
                        <CardTitle className='pt-2'>Lake House</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-justify'>Embark on an adventure in the serene Lake House, where hidden clues and mind-bending puzzles await. Escape the tranquility of the lakeside setting by deciphering riddles and unlocking secrets.</p>
                        {!user ? (
                            <TooltipProvider>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger>
                                        <Button disabled className='text-white mt-4'>Enter Room</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <h1>Login to enter room</h1>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <div>
                                <Link href='/escape-rooms/lake-house'>
                                    <Button className='text-white mt-4'>Enter Room</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card className='max-w-[20rem] m-4'>
                    <CardHeader>
                        <div className='p-2 grid place-items-center rounded'>
                            <Image src='/assets/escape-rooms/isometric_office-glb.png' width='250' height='200' alt='Room' />
                        </div>
                        <CardTitle className='pt-2'>Office</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-justify'>Dive into the enigmatic world of corporate intrigue in the Office Escape Room. Unravel the mysteries hidden in office supplies and documents to break free from the monotony.</p>
                        {!user ? (
                            <TooltipProvider>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger>
                                        <Button disabled className='text-white mt-4'>Enter Room</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <h1>Login to enter room</h1>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <div>
                                <Link href='/escape-rooms/office'>
                                    <Button className='text-white mt-4'>Enter Room</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card className='max-w-[20rem] m-4'>
                    <CardHeader>
                        <div className='p-2 grid place-items-center rounded'>
                            <Image src='/assets/escape-rooms/sanzio_predio_humanizada-glb.png' width='300' height='200' alt='Room' />
                        </div>
                        <CardTitle className='pt-2'>Pent House</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-justify'>Ascend to new heights in the Penthouse Escape Room, a luxurious setting with puzzles that match the opulence. Can you crack the codes and outsmart the challenges?</p>
                        {!user ? (
                            <TooltipProvider>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger>
                                        <Button disabled className='text-white mt-4'>Enter Room</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <h1>Login to enter room</h1>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <div>
                                <Link href='/escape-rooms/pent-house'>
                                    <Button className='text-white mt-4'>Enter Room</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card className='max-w-[20rem] m-4'>
                    <CardHeader>
                        <div className='p-2 grid place-items-center rounded'>
                            <Image src='/assets/escape-rooms/small_modern_bedroom-glb.png' width='300' height='200' alt='Room' />
                        </div>
                        <CardTitle className='pt-2'>Small Bedroom</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-justify'>Discover the secrets concealed in a seemingly ordinary Small Bedroom. Every corner holds a clue; every item holds a key. Can you escape the cozy confinement?</p>
                        {!user ? (
                            <TooltipProvider>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger>
                                        <Button disabled className='text-white mt-4'>Enter Room</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <h1>Login to enter room</h1>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <div>
                                <Link href='/escape-rooms/small-bedroom'>
                                    <Button className='text-white mt-4'>Enter Room</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MaxWidthWrapper>
    )
}
