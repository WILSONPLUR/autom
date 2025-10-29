import { useQuery } from "@tanstack/react-query";
import {customer} from "@/lib/auth-client";

export const useSubscription = () => {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            const {data} = await customer.state();
            return data;
        }
    })
}

export const useHasActiveSubscriptions = () => {
    const {data: customerState, isLoading, ...rest} = useSubscription();
    const hasActiveSubs =
        (customerState?.activeSubscriptions?.length ?? 0) > 0;

    return {
        hasActiveSubs,
        subscription: customerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest,
    };
}