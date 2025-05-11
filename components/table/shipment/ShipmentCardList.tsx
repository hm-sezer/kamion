import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CompanyColumn } from './CompanyColumn';
import { RouteColumn } from './RouteColumn';
import { VehicleColumn } from './VehicleColumn';
import { DriverColumn } from './DriverColumn';
import { PriceColumn } from './PriceColumn';
import { StatusColumn } from './StatusColumn';
import { PickUpDateColumn } from './PickUpDateColumn';

interface ShipmentCardListProps {
  shipments: any[];
}

export default function ShipmentCardList({ shipments }: ShipmentCardListProps) {
  return (
    <div className="w-full max-w-[1250px] mx-auto flex flex-col gap-1">
      <div className="flex flex-row items-center px-2 py-3 rounded-xl bg-[#F7F8FA] font-normal text-[#93979B] text-[11px] gap-6 tracking-wide">
        <div className="flex items-center justify-center min-w-[39px] w-[39px]">SEÇ</div>
        <div className="min-w-[39px] w-[39px]">ID</div>
        <div className="min-w-[150px] w-[150px]">FİRMA</div>
        <div className="min-w-[233px] w-[233px]">GÜZERGAH</div>
        <div className="pl-4 min-w-[154px] w-[154px]">ARAÇ</div>
        <div className="pl-2 min-w-[157px] w-[157px]">ŞOFÖR</div>
        <div className="min-w-[63px] w-[63px]">TARİH</div>
        <div className="pl-3 min-w-[76px] w-[76px]">FİYAT</div>
        <div className="pl-8 min-w-[122px] w-[122px]">DURUM</div>
      </div>

      {shipments.map((shipment) => (
        <Card key={shipment.id} className="flex flex-row items-center px-2 py-6 rounded-xl bg-white gap-6 shadow-none border-none text-[11px]">
          <div className="flex items-center justify-center min-w-[39px] w-[39px]"><Checkbox className="rounded-[2px] shadow-none border-[#BDC7D1] w-4 h-4" /></div>
          <div className="font-bold text-[#092256] text-[11px] flex items-center min-w-[39px] w-[39px]">{shipment.id}</div>
          <div className="min-w-[150px] w-[150px]"><CompanyColumn shipper={shipment.shipper} /></div>
          <div className="min-w-[233px] w-[233px]"><RouteColumn departureAddress={shipment.departure_address} deliveryAddress={shipment.delivery_address} /></div>
          <div className="min-w-[154px] w-[154px]"><VehicleColumn vehicle={shipment.vehicle} /></div>
          <div className="min-w-[157px] w-[157px]"><DriverColumn driver={shipment.driver} /></div>
          <div className="min-w-[63px] w-[63px]"><PickUpDateColumn pickUpDate={shipment.pick_up_date} /></div>
          <div className="min-w-[76px] w-[76px]"><PriceColumn price={shipment.price} /></div>
          <div className="min-w-[122px] w-[122px]"><StatusColumn latest_status={shipment.latest_status} /></div>
        </Card>
      ))}
    </div>
  );
} 