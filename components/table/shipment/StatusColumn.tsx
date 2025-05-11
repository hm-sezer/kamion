import React from 'react';

const statusMap: Record<string, { color: string; bg: string; displayText: string }> = {
  'Taşıma Onay Bekliyor': { color: '#000000', bg: '#F2F3F4', displayText: 'Onay Bekliyor' },
  'Araç Teslim Alma Adresinde': { color: '#E08404', bg: '#FFF7E9', displayText: 'Tedarik Sürecinde' },
  'Teslimat Tamamlandı': { color: '#1FCB91', bg: '#DAF5EC', displayText: 'Tamamlandı' },
  'İptal Edildi.': { color: '#E9344C', bg: '#FFD9DE', displayText: 'İptal Edildi' }
};

interface StatusColumnProps {
  latest_status?: {
    type: number;
    type_value: string;
  };
}

export const StatusColumn: React.FC<StatusColumnProps> = ({ latest_status }) => {
  const status = statusMap[latest_status?.type_value || 'Taşıma Onay Bekliyor'] || statusMap['Taşıma Onay Bekliyor'];
  
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center h-[36px] min-w-[122px] rounded-[111px] font-medium text-[11px] tracking-wide py-3"
        style={{
          background: status.bg,
          color: status.color,
        }}
      >
        {status.displayText}
      </div>
    </div>
  );
}; 