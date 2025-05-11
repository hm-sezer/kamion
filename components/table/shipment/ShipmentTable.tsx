import ShipmentCardList from './ShipmentCardList';

interface ShipmentTableProps {
  shipments: any[];
}

export default function ShipmentTable({ shipments }: ShipmentTableProps) {
  if (shipments.length === 0) {
    return (
      <div className="w-full max-w-[1250px] mx-auto flex flex-col items-center justify-center py-8">
        <div className="text-[#092256] text-lg font-medium">Aramanıza uygun bir yük bulunamadı</div>
        <div className="text-[#93979B] text-sm mt-2">Lütfen farklı bir yük ID'si ile arama yapın</div>
      </div>
    );
  }

  return <ShipmentCardList shipments={shipments} />;
} 