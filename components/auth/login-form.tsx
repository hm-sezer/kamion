import React, { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    setEmailError("");
    setPasswordError("");
    if (!email) {
      setEmailError("Email zorunlu");
      hasError = true;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Geçerli bir email girin");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Şifre zorunlu");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Şifre en az 8 karakter olmalı");
      hasError = true;
    }
    if (hasError) return;
    const resultAction = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    }
  };

  return (
    <form className={cn("space-y-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-start mb-10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-6">
          <Image src="/logo-signin.svg" alt="Kamion Logo" width={56} height={56}  />
        </div>
        <h1 className="text-3xl font-medium text-gray-800 leading-tight">
          Kamion<span className="text-sm align-top text-[24px]">®</span>
        </h1>
        <p className="text-3xl font-light text-gray-800 mt-2">Dashboard Log In</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            className={`h-16 pl-5 pr-12 text-base border rounded-sm w-full ${emailError ? 'border-red-500' : 'border-gray-200'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0F5FBD]" />
          {emailError && (
            <div className="absolute left-0 -bottom-6 text-xs text-red-500">{emailError}</div>
          )}
        </div>
        
        <div className="relative">
          <Input
            id="password"
            type="password"
            placeholder="Min 8 numeretic characters"
            className={`h-16 pl-5 pr-12 text-base border rounded-sm w-full  ${passwordError || error ? 'border-[#E9344C] text-[#E9344C] placeholder-[#E9344C]' : 'border-gray-200'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 ${passwordError || error ? 'text-[#E9344C]' : 'text-[#0F5FBD]'}`}>
            <Lock size={20} />
          </span>
          {passwordError && (
            <div className="absolute left-0 -bottom-6 text-xs text-[#E9344C]">{passwordError}</div>
          )}
        </div>
        {error && (
          <div className="w-full text-xs text-[#E9344C] text-right mb-2">{error}</div>
        )}
        
        <div className="flex justify-end pt-3">
          <Button 
            type="submit" 
            className="bg-[#0F5FBD] hover:bg-blue-400 text-white text-base font-medium rounded-lg flex items-center justify-center w-[162px] h-[62px] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#0F5FBD]" /> 
                Logging in...
              </>
            ) : (
              <>
                Login <ArrowRight className="ml-2 h-5 w-5 text-[#FFFFFF]" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
} 