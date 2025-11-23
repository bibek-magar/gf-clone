import styled from "styled-components";
import type { Itinerary } from "../../../interfaces";
import { Divider } from "@mui/material";
import { Button } from "../../atoms";
import dayjs from "dayjs";

interface FlightCardProps {
  itinerary: Itinerary;
}

const FlightCard = ({ itinerary }: FlightCardProps) => {
  const { price, legs } = itinerary;

  const firstLeg = legs[0];
  const lastLeg = legs[legs.length - 1];

  const marketing = firstLeg.carriers.marketing[0];

  const fmtTime = (iso: string) => dayjs(iso).format("h:mm A");

  const totalMins = legs.reduce((m, leg) => m + leg.durationInMinutes, 0);
  const duration = Math.floor(totalMins / 60) + "h " + (totalMins % 60) + "m";

  const stops = legs.reduce((s, leg) => s + leg.stopCount, 0);

  return (
    <Card>
      <div className="left">
        <div className="title">
          <div className="logo-wrapper">
            <img
              src={marketing?.logoUrl}
              alt={marketing?.name}
              width={30}
              height={30}
            />
          </div>
          <p className="airline-name">{marketing?.name}</p>
        </div>

        <div className="row">
          <div className="item">
            <div className="time">{fmtTime(firstLeg.departure)}</div>
            <div className="place">
              {firstLeg.origin.city} ({firstLeg.origin.displayCode})
            </div>
          </div>

          <Divider>
            <div className="duration">
              <p>{duration}</p>
              <span>{stops === 0 ? "Non‑stop" : `${stops} stop`}</span>
            </div>
          </Divider>

          <div className="item">
            <div className="time">{fmtTime(lastLeg.arrival)}</div>

            <div className="place">
              {lastLeg.destination.city} ({lastLeg.destination.displayCode})
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="price">{price.formatted}</div>
        <Button>Select</Button>
      </div>
    </Card>
  );
};

export { FlightCard };

const Card = styled.div`
  margin-bottom: 2rem;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  background-color: #ffffffe6;
  padding: 2rem;
  cursor: pointer;
  display: flex;
  gap: 3rem;

  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    border: 1px solid #cfd8f7;
  }

  & .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & .price {
      font-size: 24px;
    }

    & button {
      text-transform: none;
      min-width: 110px;
    }
  }
  & .left {
    flex: 1;
  }

  & .MuiDivider-root {
    flex: 1;
  }
  & .duration {
    background: #eef2ff;
    padding: 10px 15px;
    border-radius: 12px;
    border: 1px solid #cfd8f7;

    & p {
      font-weight: 600;
      font-size: 13px;
      color: #545454;
    }

    & span {
      font-weight: 600;
      color: green;
      font-size: 15px;
    }
  }

  & .row {
    display: flex;
    gap: 14px;
  }

  & .time {
    margin-top: 10px;
    font-size: 24px;
    color: #111827;
  }

  & .title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  & .logo-wrapper {
    background-color: #f0f1f3;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      object-fit: contain;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    overflow: auto;
  }

  @media (max-width: 575px) {
    & .row {
      flex-direction: column;
    }
  }
`;
