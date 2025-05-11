import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchShipments } from '@/redux/features/shipment/shipmentSlice';
import debounce from 'lodash/debounce';

export default function SearchInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const debouncedSearch = useRef(
    debounce((searchValue: string) => {
      setError(null);
      
      if (searchValue) {
        if (!/^\d+$/.test(searchValue)) {
          setError('Lütfen geçerli bir yük ID\'si giriniz');
          return;
        }
        
        // @ts-ignore
        dispatch(fetchShipments({ id: searchValue }))
          .unwrap()
          .catch((err: any) => {
            setError('Aramanıza uygun bir sonuç bulunamadı');
          });
      } else {
        // @ts-ignore
        dispatch(fetchShipments({}));
      }
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Arayın.."
        className={`pl-5 pr-10 h-11 rounded-full bg-white text-[#092256] placeholder:font-light placeholder:text-[#092256] border-none focus:ring-0 shadow-none`}
        value={value}
        onChange={handleSearch}
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F5FBD] pointer-events-none" />
      {error && (
        <div className="absolute left-0 -bottom-6 text-red-500 text-xs">
          {error}
        </div>
      )}
    </div>
  );
} 