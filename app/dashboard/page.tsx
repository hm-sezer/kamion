'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchShipments } from '@/redux/features/shipment/shipmentSlice';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import SearchInput from '@/components/search/SearchInput';
import ShipmentTable from '@/components/table/shipment/ShipmentTable';
import { PiConfetti } from 'react-icons/pi';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const {shipments, error} = useAppSelector((state) => state.shipment);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const loadShipments = async () => {
      
      await dispatch(fetchShipments({}));
      setIsInitialLoading(false);
    };
    loadShipments();
  }, [dispatch]);


  if (isInitialLoading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2">Yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">Hata: {error}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <header className="w-full flex justify-center items-center bg-white min-h-[90px]">
        <div className="flex flex-row items-center justify-center w-full max-w-[520px] py-6 px-[14px]">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Kamion Logo" width={40} height={40} />
          </div>
          <div className="flex flex-col justify-center ml-4">
            <span className="text-[14px] font-semibold text-[#0F5FBD] flex items-center gap-1">
              Kamion®
            </span>
            <span className="text-[14px] font-normal text-[#93979B]">Yükveren Paneli</span>
          </div>
        </div>
      </header>

      {showBanner && (
        <div className="flex justify-center w-full mt-8">
          <div
            className="flex items-center justify-between bg-[#E3E4FF] text-[#6C63FF] shadow-none tracking-wide px-6 py-4 w-[1250px] h-[53px] rounded-[1111px]"
          >
            <div className="flex items-center gap-1">
              <PiConfetti className="w-5 h-5 mr-2" />
              <span className="text-[13px] text-[#5D5FEF]">Kamion Duyuru</span> <span className="text-[13px] font-light text-[#3E578A]">Güncellendi. Hemen indirerek, fırsatları yakalayabilirsiniz.</span>
            </div>
            <button
              className="text-[#3E578A] cursor-pointer rounded-full p-1 transition"
              onClick={() => setShowBanner(false)}
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-between w-full max-w-[1250px] mx-auto mt-12 mb-6">
        <h2 className="text-[22px] font-normal text-[#223354]">Taşımalarım</h2>
        <div className="w-[320px]">
          <SearchInput />
        </div>
      </div>

      <div className="w-full max-w-[1250px] mx-auto">
        <ShipmentTable shipments={shipments} />
      </div>
    </div>
  );
} 