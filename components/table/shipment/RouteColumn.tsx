import React from 'react';

interface RouteColumnProps {
  departureAddress: {
    type_value: string;
    district: {
      name: string;
    };
    name: string;
    city: {
      name: string;
    };
  };
  deliveryAddress: {
    type_value: string;
    name: string;
    city: {
      name: string;
    };
    district: {
        name: string;
      };
  };
}

export const RouteColumn: React.FC<RouteColumnProps> = ({ departureAddress, deliveryAddress }) => {
  return (
    <div className="flex flex-col gap-1 justify-center w-full h-[40px]">
      <span className="flex items-center gap-1 text-[#092256] font-bold text-[11px]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#0F5FBD] inline-block" />
          <span className="font-semibold">{departureAddress?.type_value}, </span><span className="font-light">{departureAddress?.city?.name}, {departureAddress?.district?.name}</span>
      </span>
      <span className="flex items-center gap-1 text-[#092256] font-normal text-[11px]">
        <span className="w-[10px] h-[10px] rounded-full bg-transparent border border-[#0085FF] inline-block" />
        <span>
          <span className="font-semibold">{deliveryAddress?.type_value}, </span><span className="font-light">{deliveryAddress?.city?.name}, {deliveryAddress?.district?.name}</span>
        </span>
      </span>
    </div>
  );
}; 