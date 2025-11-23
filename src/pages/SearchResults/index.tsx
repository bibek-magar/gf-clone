import { useSearchParams } from "react-router-dom";
import type { FlightSearchParams, Itinerary } from "../../interfaces";
import { useMemo, useState } from "react";
import { useFlightSearch } from "../../hooks";
import styled from "styled-components";
import { FilterBar, FlightCard } from "../../components";
import { Skeleton } from "@mui/material";

function parseSearchParams(search: URLSearchParams): FlightSearchParams | null {
  const originSkyId = search.get("originSkyId");
  const destinationSkyId = search.get("destinationSkyId");
  const departureDate = search.get("departureDate");
  const originEntityId = search.get("originEntityId");
  const destinationEntityId = search.get("destinationEntityId");

  if (
    !originSkyId ||
    !destinationSkyId ||
    !departureDate ||
    !originEntityId ||
    !destinationEntityId
  )
    return null;

  return {
    originSkyId,
    destinationSkyId,
    date: departureDate,
    returnDate: search.get("returnDate") || undefined,
    currency: "USD",
    adults: Number(search.get("adults")) || 1,
    originEntityId,
    destinationEntityId,
  } as FlightSearchParams;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const queryParams = parseSearchParams(searchParams);

  const [sortBy, setSortBy] = useState<"best" | "price_high" | "fastest">(
    "best"
  );
  const { data, isLoading, isFetching } = useFlightSearch(
    queryParams ? { ...queryParams, sortBy } : null
  );

  const itineraries = useMemo(
    () => data?.data?.itineraries || [],
    [data?.data?.itineraries]
  );

  return (
    <Wrapper>
      {isLoading || isFetching ? (
        <div className="skeleton">
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton variant="rectangular" width={"100%"} height={100} />
        </div>
      ) : (
        <>
          <FilterBar sortBy={sortBy} onSortByChange={setSortBy} />

          {itineraries?.length > 0 ? (
            itineraries.map((it: Itinerary) => (
              <FlightCard key={it.id} itinerary={it} />
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default SearchResults;

const Wrapper = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;

  & .skeleton {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & .MuiSkeleton-pulse {
      border-radius: 10px;
    }
  }

  & .no-results {
    text-align: center;
    font-size: 15px;
    color: #6b7280;
  }
`;
