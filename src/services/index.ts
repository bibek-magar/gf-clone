import type { FlightSearchParams } from "../interfaces";
import { apiClient } from "../utils";

export const searchAirports = (query: string) =>
  apiClient.get("/flights/searchAirport", { params: { query } });

export const searchFlights = (params: FlightSearchParams) =>
  apiClient.get("/flights/searchFlights", {
    params: { ...params },
  });
