import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Page() {
  return (
    <MaxWidthWrapper>
      <div className='flex flex-wrap-reverse items-center justify-center md:grid md:grid-cols-2 pb-8'>

        <div className='lg:p-10 flex justify-center w-full'>
          <Image src='/assets/home/undraw_treasure_of-9-i.svg' height={400} width={400} quality={100} alt='img' />
        </div>

        <div className='md:flex md:flex-col md:justify-center bg-primary p-4 rounded-b-2xl rounded-tl-2xl md:rounded-b-[2rem] md:rounded-tl-[2rem]'>
          <p className='self-center text-xl tracking-wide text-left py-2 text-white'>
            Embark on an immersive adventure with EnigmaEscape, where decoding riddles, discovering secrets, and conquering the 3D Escape Rooms realm await. Engage your mind as you navigate through intricate challenges, unlocking hidden features and striving to conquer the virtual world. EnigmaEscape promises a thrilling experience, inviting you to unravel mysteries, test your wits, and emerge victorious in a captivating journey of discovery and triumph within the realms of 3D Escape Rooms. Get ready to embark on a unique escapade where every twist and turn brings you closer to the excitement of solving puzzles and mastering the art of the EnigmaEscape.
          </p>
        </div>

      </div>

      <div className='flex flex-wrap-reverse items-center justify-center md:grid md:grid-cols-2 pb-8'>

        <div className='md:flex md:flex-col md:justify-center bg-primary p-4 rounded-b-2xl rounded-tr-2xl md:rounded-b-[2rem] md:rounded-tr-[2rem]'>
          <div className='text-xl tracking-wide text-left py-2 text-white'>
            <h1 className='text-2xl'>How it works:</h1>
            <p className='my-2'>EnigmaEscape is filled with numerous hidden surprises and entertaining elements. Explore the game&apos;s concealed sections by deciphering riddles, locating exits, and aiming for the leaderboard&apos;s summit.</p>
            <p className='my-2'>The game&apos;s objective is to solve the riddles and escape the room within the shortest time possible. The faster you solve the riddles, the higher your score will be. The game&apos;s difficulty level increases as you progress through the levels, with each level presenting a new set of challenges.</p>
            <p className='my-2'>A unique easter egg is reserved specifically for web developer enthusiasts, adding an extra layer of excitement for those passionate about web development.</p>
          </div>
        </div>

        <div className='lg:p-10 flex justify-center w-full'>
          <Image src='/assets/home/undraw_to_do_list_re_9nt7.svg' height={400} width={400} quality={100} alt='img' />
        </div>

      </div>
    </MaxWidthWrapper>
  )
}
