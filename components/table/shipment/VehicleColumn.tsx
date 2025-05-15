import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';

interface VehicleColumnProps {
  vehicle?: {
    plate?: string;
    info?: string;
  };
}

const formatPlate = (plate: string): string => {
  const cleanPlate = plate.replace(/[\s.]/g, '');
  
  if (plate.match(/^\d{2}\s[A-Z]{1,3}\s\d{2,3}$/)) {
    return plate;
  }
  
  const parts = [
    cleanPlate.slice(0, 2),  
    cleanPlate.slice(2, -3),
    cleanPlate.slice(-3)     
  ];
  
  return parts.join(' ');
};

export const VehicleColumn: React.FC<VehicleColumnProps> = ({ vehicle }) => {
  return (
    <div className="flex items-center gap-3 justify-center w-full h-[40px]">
      <span
        className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#ECF5FF]"
      >
        <CiDeliveryTruck className="w-5 h-5 text-[#0F5FBD]" />
      </span>
      <span className="flex flex-col justify-center">
        <span className="font-semibold text-[#0A2468] text-[11px]">{vehicle?.plate ? formatPlate(vehicle.plate) : '13 AS 199'}</span>
        <span className="text-[11px] font-normal text-[#092256]">{vehicle?.type_value}</span>
      </span>
    </div>
  );
}; 