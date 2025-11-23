import { useSearchParams } from "react-router-dom";
import type { FlightSearchParams, Itinerary } from "../../interfaces";
import { useMemo } from "react";
import { useFlightSearch } from "../../hooks";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { FlightCard } from "../../components";

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

  const { data, isLoading, isFetching } = useFlightSearch(
    queryParams ? { ...queryParams } : null
  );

  const itineraries = useMemo(
    () => data?.data?.itineraries || [],
    [data?.data?.itineraries]
  );

  const origin = queryParams?.originSkyId || "Origin";
  const destination = queryParams?.destinationSkyId || "Destination";
  const departureDate = queryParams?.date
    ? dayjs(queryParams.date).format("MMM DD")
    : "";

  return (
    <Wrapper>
      {isLoading || isFetching ? (
        <div className="skeleton">
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
          <Skeleton variant="rectangular" width={"100%"} height={80} />
        </div>
      ) : (
        <>
          <div className="results-header">
            <h2>
              {origin} → {destination}
            </h2>
            {departureDate && (
              <div className="results-count">
                {itineraries?.length || 0} flights • {departureDate}
              </div>
            )}
          </div>

          {itineraries?.length > 0 ? (
            itineraries.map((it: Itinerary) => (
              <FlightCard key={it.id} itinerary={it} />
            ))
          ) : (
            <div className="no-results">
              No flights found for your search criteria.
              <br />
              Try adjusting your dates or destinations.
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default SearchResults;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
  background-color: #111827;
  min-height: 100vh;
  color: #ffffff;

  .skeleton {
    display: flex;
    flex-direction: column;
    gap: 1px;

    .MuiSkeleton-root {
      background-color: #374151;
      border-radius: 8px;
      height: 80px;
    }
  }

  .no-results {
    text-align: center;
    font-size: 16px;
    color: #9ca3af;
    padding: 60px 20px;
    background-color: #1f2937;
    border-radius: 8px;
    margin-top: 20px;
  }

  .results-header {
    margin-bottom: 20px;
    color: #ffffff;

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .results-count {
      font-size: 14px;
      color: #9ca3af;
    }
  }
`;
