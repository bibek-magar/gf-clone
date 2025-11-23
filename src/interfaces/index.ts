export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  date: string;
  returnDate?: string;
  currency?: string;
  adults?: number;
  originEntityId: string;
  destinationEntityId: string;
  sortBy?: string;
}

interface CarrierLogo {
  id: number;
  name: string;
  logoUrl: string;
}

interface Leg {
  id: string;
  origin: { id: string; name: string; displayCode: string; city: string };
  destination: { id: string; name: string; displayCode: string; city: string };
  departure: string; // ISO
  arrival: string; // ISO
  stopCount: number;
  durationInMinutes: number;
  carriers: { marketing: CarrierLogo[] };
}

export interface Itinerary {
  id: string;
  price: { raw: number; formatted: string };
  legs: Leg[];
}

export interface Airport {
  entityId: string;
  presentation: {
    suggestionTitle: string;
  };
  skyId: string;
}
