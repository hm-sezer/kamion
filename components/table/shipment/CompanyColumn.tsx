import React from 'react';
import { BsBox } from "react-icons/bs"

interface CompanyColumnProps {
  shipper?: {
    name?: string;
  };
}

export const CompanyColumn: React.FC<CompanyColumnProps> = ({ shipper }) => {
  return (
    <div className="flex items-center gap-3 w-full h-[40px]">
      <span
        className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#EEEFFF]"
      >
        <BsBox className="w-4 h-4 text-[#5D5FEF]" />
      </span>
      <span
        className="font-medium text-[11px] text-[#092256] tracking-wide"
      >
        {shipper?.name || 'Firma'}
      </span>
    </div>
  );
}; 