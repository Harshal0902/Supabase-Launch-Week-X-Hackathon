"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UpdatePassword() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function updatePassword() {
    if (!password) {
      // @ts-ignore
      setErrorMsg('Password is required');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      // @ts-ignore
      setErrorMsg(error.message);
    } else {
      router.replace('/escape-rooms');
    }
  }

  return (
    <MaxWidthWrapper>
      <div className='flex min-h-[85vh] items-center justify-center'>
        <Card className='animate-fade-in-down max-w-5xl' >
          <div className='md:flex w-full'>
            <div className='w-full md:w-1/2 px-4 md:p-10'>
              <div className='my-4'>
                <div className='flex flex-row items-center justify-start space-x-2'>
                  <h1 className='font-bold text-3xl'>Update Password</h1>
                </div>
              </div>
              <div className='flex flex-col space-y-4'>
                <div className='flex -mx-3'>
                  <div className='w-full px-3'>
                    <Label htmlFor=''>New Password</Label>
                    <div className='flex pt-1'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'><LockKeyhole height={20} width={20} /></div>
                      <Input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='New Password' className='w-full -ml-10 pl-10 pr-3 py-2' />
                    </div>
                    {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
                  </div>
                </div>

                <div className='flex -mx-3'>
                  <div className='w-full px-3 mb-5'>
                    <Button type='submit' onClick={updatePassword} disabled={loading} className='text-white w-full'>{loading ? 'Updating...' : 'Update Password'}</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 p-4 md:p-10 flex flex-col items-center justify-center'>
              <div className='hidden md:flex md:items-center'>
                <Image src='/assets/auth/update-password.svg' width='100' height='100' alt='Contact Us' className='w-full' />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MaxWidthWrapper>
  )
}
