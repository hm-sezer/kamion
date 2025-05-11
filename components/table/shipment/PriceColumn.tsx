import React from 'react';

interface PriceColumnProps {
  price?: any;
}

const formatPrice = (price: number): string => {
  const wholeNumber = Math.floor(price).toString();
  return wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const PriceColumn: React.FC<PriceColumnProps> = ({ price }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="font-bold text-[#092256] bg-[#FAFAFA] rounded-[32px] py-4 px-6 text-[11px] min-w-[76px] h-[40px] flex items-center justify-center">
        {price ? `${formatPrice(price.carrier.carrier_price)}₺` : '12.500₺'}
      </div>
    </div>
  );
}; 