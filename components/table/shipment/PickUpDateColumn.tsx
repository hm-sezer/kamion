import React from 'react';

interface PickUpDateColumnProps {
  pickUpDate?: number;
}

export const PickUpDateColumn: React.FC<PickUpDateColumnProps> = ({ pickUpDate }) => {
  return (
    <span className="font-normal text-[#092256] text-[11px]">
      {pickUpDate ? new Date(pickUpDate * 1000).toLocaleDateString('tr-TR').replace(/\./g, '/') : ''}
    </span>
  );
}; 