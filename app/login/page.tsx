"use client";

import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 flex items-center justify-center p-4">
        <div className="relative h-full w-full rounded-4xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F5FBD] from-20% to-transparent" />
          <Image
            src="/kamion-signin.svg"
            alt="Kamion Logistics Platform"
            fill
            className="rounded-4xl z-0 object-cover"
            priority
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-white px-8 pb-12">
            <div className="text-[14px] font-normal tracking-widest mb-4 text-center">ONE PLATFORM FOR ALL ROAD FREIGHT</div>
            <div className="text-[48px] font-normal mb-4 text-center leading-tight">Visibility, Efficiency, Sustainability</div>
            <div className="text-[18px] mb-8 font-light text-center"><span className="font-bold text-[#7BB9FA]">MENA's</span> Most Efficient Digital Freight Network</div>
            <button className="bg-[#7EAFE8] text-white rounded-full px-18 py-6 text-base mb-2 flex items-center justify-center gap-2">
              <span className="font-light">Join the Kamion Logistics Network</span> <span className="underline ml-1 cursor-pointer">Sign Up</span> <span>→</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-between h-screen py-10 px-16">
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-lg">
            <LoginForm />
          </div>
        </div>
        <div className="w-full max-w-lg text-xs font-light text-[#092256] text-center">
          © Copyright 2024, <span className="font-medium">Kamion Logistics</span> - All rights reserved.
        </div>
      </div>
    </div>
  );
} 