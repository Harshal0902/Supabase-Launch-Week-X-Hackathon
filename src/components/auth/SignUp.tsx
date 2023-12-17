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

export default function SignUp() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async () => {
    setLoading(true);

    const { password, confirmPassword, ...restFormData } = formData;

    if (password !== confirmPassword) {
      // @ts-ignore
      setErrorMsg('Passwords do not match.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      ...restFormData,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth-callback?origin=escape-rooms`,
      },
    });

    if (error) {
      // @ts-ignore
      setErrorMsg(error.message);
    } else {
      // @ts-ignore
      setSuccessMsg('Success! Please check your email for further instructions.');
    }

    setLoading(false);
  };

  return (
    <MaxWidthWrapper>
      <div className='flex min-h-[85vh] items-center justify-center'>
        <Card className='animate-fade-in-down max-w-5xl' >
          <div className='md:flex w-full'>
            <div className='w-full md:w-1/2 px-4 md:p-10'>
              <div className='my-4'>
                <div className='flex flex-row items-center justify-start space-x-2'>
                  <h1 className='font-bold text-3xl'>Sign Up</h1>
                </div>
                <div className='mt-4'>
                  Already have an account? <span className='text-primary'><Link href='/log-in' passHref> Log In </Link></span>
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
                    {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
                  </div>
                </div>
                <div className='flex -mx-3'>
                  <div className='w-full px-3'>
                    <Label htmlFor=''>Conform Password</Label>
                    <div className='flex pt-1'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'><LockKeyhole height={20} width={20} /></div>
                      <Input id='confirmPassword' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} required placeholder='Conform Password' className='w-full -ml-10 pl-10 pr-3 py-2' />
                    </div>
                    {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
                  </div>
                </div>
                <div className='flex -mx-3'>
                  <div className='w-full px-3 mb-5'>
                    <Button type='submit' onClick={signUp} disabled={loading} className='text-white w-full'>{loading ? 'Signing Up...' : 'Sign Up'}</Button>
                  </div>
                </div>
                {successMsg && <div className='text-green-500'>{successMsg}</div>}
              </div>
            </div>
            <div className='w-full md:w-1/2 p-4 md:p-10 flex flex-col items-center justify-center'>
              <div className='hidden md:flex md:items-center'>
                <Image src='/assets/auth/sign-up.svg' width='400' height='400' alt='Contact Us' className='w-full' />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MaxWidthWrapper>
  )
}
