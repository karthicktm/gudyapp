import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white">
      <div className="max-w-sm w-full mx-auto px-6 py-12 flex flex-col items-center">
        {/* Logo Circle */}
        <div className="relative h-40 w-40 rounded-full bg-[#FFC0CB] flex items-center justify-center mb-8">
          <Image 
            src="/images/gudy-logo.svg" 
            alt="Gudy Logo" 
            width={110} 
            height={110}
            className="relative"
            priority
          />
        </div>
        
        {/* Title */}
        <h1 className="text-center font-paytone text-3xl font-bold text-black leading-tight mb-2">
          Gudy, your<br />cook buddy
        </h1>
        
        {/* Description */}
        <p className="text-center text-base text-gray-800 mb-10">
          Design your perfect dish in 3D<br />
          Sign in to start!
        </p>
        
        {/* Buttons Container */}
        <div className="w-full space-y-4">
          {/* Login Button */}
          <Link href="./login" className="block w-full">
            <Button variant="primary">
              LOG IN
            </Button>
          </Link>
          
          {/* Create Account Button */}
          <Link href="./signup" className="block w-full">
            <Button variant="outline">
              CREATE ACCOUNT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}