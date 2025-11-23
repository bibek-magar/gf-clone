import { useQuery } from "@tanstack/react-query";
import type { FlightSearchParams } from "../interfaces";
import { searchFlights } from "../services";
import { QUERY_KEYS } from "../constants";

export const useFlightSearch = (params: FlightSearchParams | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FLIGHTS, params],
    queryFn: () => (params ? searchFlights(params).then((r) => r.data) : []),
    enabled: !!params,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
