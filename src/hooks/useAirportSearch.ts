import { useQuery } from "@tanstack/react-query";
import { searchAirports } from "../services";
import { QUERY_KEYS } from "../constants";

export const useAirportSearch = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AIRPORTS, query],
    queryFn: () =>
      query.length < 2 ? [] : searchAirports(query).then((r) => r.data),
    enabled: !!query,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
