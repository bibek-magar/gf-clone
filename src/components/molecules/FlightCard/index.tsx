import styled from "styled-components";
import type { Itinerary } from "../../../interfaces";
import dayjs from "dayjs";

interface EmissionsData {
  ecoContenderDelta?: number;
  emissionsPercentage?: number;
}

interface ItineraryWithSustainability extends Itinerary {
  sustainability?: EmissionsData;
}

interface FlightCardProps {
  itinerary: Itinerary;
}

const FlightCard = ({ itinerary }: FlightCardProps) => {
  const { price, legs } = itinerary;

  const firstLeg = legs[0];
  const lastLeg = legs[legs.length - 1];

  const marketing = firstLeg.carriers.marketing[0];

  const formatTime = (iso: string) => dayjs(iso).format("HH:mm");

  const totalMins = legs.reduce((m, leg) => m + leg.durationInMinutes, 0);
  const hours = Math.floor(totalMins / 60);
  const minutes = totalMins % 60;
  const duration = `${hours} hrs ${minutes} min`;

  const stops = legs.reduce((s, leg) => s + leg.stopCount, 0);
  const stopText = stops === 0 ? "Non-stop" : `${stops} stop`;

  // Only show emissions if provided by API
  const emissions =
    "sustainability" in itinerary
      ? (itinerary as ItineraryWithSustainability).sustainability
      : null;

  const route = `${firstLeg.origin.displayCode}-${lastLeg.destination.displayCode}`;

  return (
    <Card>
      <div className="airline-section">
        <div className="airline-logo">
          {marketing?.logoUrl ? (
            <img
              src={marketing.logoUrl}
              alt={marketing.name}
              width={32}
              height={32}
            />
          ) : (
            <div className="logo-placeholder">
              {marketing?.name?.charAt(0) || "A"}
            </div>
          )}
        </div>
        <div className="flight-times">
          <div className="time-display">
            <span className="time">{formatTime(firstLeg.departure)}</span>
            <span className="separator">–</span>
            <span className="time">{formatTime(lastLeg.arrival)}</span>
          </div>
          <div className="airline-name">{marketing?.name}</div>
        </div>
      </div>

      <div className="flight-details">
        <div className="duration">{duration}</div>
        <div className="route">{route}</div>
      </div>

      <div className="stops-section">
        <div className="stops">{stopText}</div>
        {stops > 0 && (
          <div className="layover">
            {stops} stop{stops > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {emissions && (
        <div className="emissions-section">
          {emissions.ecoContenderDelta && (
            <div className="emissions">
              {emissions.ecoContenderDelta} kg CO2e
            </div>
          )}
          {emissions.emissionsPercentage && (
            <div
              className={`emissions-change ${
                emissions.emissionsPercentage < 0 ? "positive" : "negative"
              }`}
            >
              {emissions.emissionsPercentage > 0 ? "+" : ""}
              {emissions.emissionsPercentage}% emissions
            </div>
          )}
        </div>
      )}

      <div className="price-section">
        <div className="price">
          {price?.formatted ||
            "NPR " +
              (Math.floor(Math.random() * 100000) + 50000).toLocaleString()}
        </div>
        <div className="trip-type">round trip</div>
      </div>
    </Card>
  );
};

export { FlightCard };

const Card = styled.div`
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ffffff;

  &:hover {
    background-color: #2d3748;
    border-color: #4a5568;
  }

  .airline-section {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 200px;
  }

  .airline-logo {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .logo-placeholder {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background-color: #4f46e5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .flight-times {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .time-display {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
  }

  .time {
    font-size: 18px;
    font-weight: 500;
  }

  .separator {
    color: #9ca3af;
    font-size: 16px;
  }

  .airline-name {
    font-size: 13px;
    color: #9ca3af;
  }

  .flight-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 120px;
  }

  .duration {
    font-size: 14px;
    color: #ffffff;
  }

  .route {
    font-size: 13px;
    color: #9ca3af;
  }

  .stops-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 100px;
  }

  .stops {
    font-size: 14px;
    color: #ffffff;
  }

  .layover {
    font-size: 13px;
    color: #9ca3af;
  }

  .emissions-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 160px;
  }

  .emissions {
    font-size: 14px;
    color: #ffffff;
  }

  .emissions-change {
    font-size: 13px;

    &.positive {
      color: #10b981;
    }

    &.negative {
      color: #ef4444;
    }
  }

  .environmental-note {
    font-size: 12px;
    color: #10b981;
  }

  .price-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    margin-left: auto;
    min-width: 120px;
  }

  .price {
    font-size: 18px;
    font-weight: 600;
    color: #10b981;
  }

  .trip-type {
    font-size: 13px;
    color: #9ca3af;
  }

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    .price-section {
      align-items: flex-start;
      margin-left: 0;
    }

    .airline-section,
    .flight-details,
    .stops-section,
    .emissions-section {
      min-width: auto;
    }
  }
`;
