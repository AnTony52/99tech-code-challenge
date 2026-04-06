import {useQuery} from '@tanstack/react-query';
import type { PriceEntry } from '../data/prices';

async function fetchPrices(): Promise<PriceEntry[]> {
    const res = await fetch('https://interview.switcheo.com/prices.json');
    if (!res.ok) throw new Error('Failed to fetch prices');
    return res.json();
}

export function usePricesQuery() {
    return useQuery({
        queryKey: ['prices'],
        queryFn: fetchPrices,
        staleTime: 30_000,
        refetchInterval: 30_000, // auto refresh
        retry: 2,
    })
}