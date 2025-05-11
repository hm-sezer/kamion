import React from 'react';
import Image from 'next/image';

interface DriverColumnProps {
  driver?: {
    avatar?: string;
    name?: string;
    surname?: string;
    phone?: string;
  };
}

const formatPhoneNumber = (phone: string): string => {
  const number = phone.startsWith('+90') ? phone.slice(3) : phone;
  
  const parts = [
    number.slice(0, 3), 
    number.slice(3, 6), 
    number.slice(6, 8), 
    number.slice(8)
  ];
  
  return `+90 ${parts.join(' ')}`;
};

export const DriverColumn: React.FC<DriverColumnProps> = ({ driver }) => {
  return (
    <div className="flex items-center gap-3 justify-center w-full h-[40px]">
      <Image src={driver?.avatar || '/avatar.jpeg'} alt={driver?.name || ''} width={40} height={40} className="rounded-full object-cover" />
      <div className="flex flex-col justify-center">
        <span className="font-bold text-[#0A2468] text-[11px]">{driver?.name ? driver?.name + " " + driver?.surname : 'Şoför Adı'}</span>
        <span className="text-[11px] text-[#092256]">{driver?.phone ? formatPhoneNumber(driver.phone) : '+90 534 867 42 97'}</span>
      </div>
    </div>
  );
}; 