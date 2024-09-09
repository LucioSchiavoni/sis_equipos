'use client';
 

import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
 
export default function Search({placeholder}: {placeholder: string}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
    
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, );


return(
        
        <Input
        className='w-full rounded-lg text-xl bg-background pl-8 text-black  lg:w-[336px]'
        placeholder={placeholder} onChange={(e) => {
            handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
        />
    )
}


