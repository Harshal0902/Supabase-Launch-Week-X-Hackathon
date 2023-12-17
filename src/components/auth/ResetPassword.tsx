"use client"

import React, { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { User, Mail, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ResetPassword() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [formData, setFormData] = useState({ email: '' });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetPassword = async () => {
    setLoading(true);

    if (formData.email === 'harshalraikwar07@gmail.com') {
      // @ts-ignore
      setErrorMsg("Reset Password is disabled for this email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/api/auth/update-password`,
    });

    if (error) {
      // @ts-ignore
      setErrorMsg(error.message);
    } else {
      // @ts-ignore
      setSuccessMsg('Password reset instructions sent.');
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
                  <h1 className='font-bold text-3xl'>Forgot Password</h1>
                </div>
              </div>
              <div className='flex flex-col space-y-4'>
                <div className='flex -mx-3'>
                  <div className='w-full px-3'>
                    <Label htmlFor=''>Your Email</Label>
                    <div className='flex pt-1'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'><Mail height={20} width={20} /></div>
                      <Input type='email' name='email' value={formData.email} onChange={handleChange} className='w-full -ml-10 pl-10 pr-3 py-2' required placeholder='Your Email' />
                    </div>
                    {/* <p className='text-[0.8rem] py-1 tracking-wide'>Reset Password disabled for email: harshalraikwar07@gmail.com</p> */}
                    {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
                  </div>
                </div>
                <div className='flex -mx-3 flex-col'>
                  <div className='w-full px-3 mb-5'>
                    <Button type='submit' onClick={resetPassword} disabled={loading} className='text-white w-full'>{loading ? 'Loading...' : 'Send Instructions'}</Button>
                  </div>
                  {errorMsg && <div className='text-center text-red-600'>{errorMsg}</div>}
                  {successMsg && <div className='text-center text-green-500'>{successMsg}</div>}
                </div>
                <Link href='/log-in' className='w-full underline text-right' passHref>
                  Remember your password? Log In.
                </Link>
              </div>
            </div>
            <div className='w-full md:w-1/2 p-4 md:p-10 flex flex-col items-center justify-center'>
              <div className='hidden md:flex md:items-center'>
                <Image src='/assets/auth/forgot-password.svg' width='400' height='400' alt='Contact Us' className='w-full' />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MaxWidthWrapper>
  )
}
