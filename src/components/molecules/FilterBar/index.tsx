import styled from "styled-components";
import { theme } from "../../../utils";

interface FilterBarProps {
  onSortByChange: (sortBy: "best" | "price_high" | "fastest") => void;
  sortBy: "best" | "price_high" | "fastest";
}

const FilterBar = ({ onSortByChange, sortBy }: FilterBarProps) => {
  return (
    <>
      {/* <Card className="styled-card">
        <div className="heading">
          <p>Kathmandu to London</p>
          <span>5 flights found</span>
        </div>
      </Card> */}

      <Card className="styled-card">
        <div className="filter-bar">
          <button
            onClick={() => onSortByChange("best")}
            className={sortBy === "best" ? "active" : ""}
          >
            Best
          </button>
          <button
            onClick={() => onSortByChange("price_high")}
            className={sortBy === "price_high" ? "active" : ""}
          >
            Cheapest
          </button>
          <button
            onClick={() => onSortByChange("fastest")}
            className={sortBy === "fastest" ? "active" : ""}
          >
            Fastest
          </button>
        </div>
      </Card>
    </>
  );
};

export { FilterBar };

const Card = styled.div`
  margin-bottom: 20px;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px 16px;

  .filter-bar {
    display: flex;
    gap: 0;
    align-items: center;

    button {
      background-color: transparent;
      cursor: pointer;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      transition: all 0.2s ease;
      color: #9ca3af;
      font-size: 14px;
      font-weight: 500;
      margin-right: 8px;

      &:hover {
        background-color: #374151;
        color: #ffffff;
      }

      &.active {
        background-color: #3b82f6;
        color: #ffffff;
      }
    }
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;

    span {
      color: #9ca3af;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    .filter-bar {
      flex-wrap: wrap;
      gap: 8px;

      button {
        margin-right: 0;
      }
    }
  }

  @media (max-width: 375px) {
    .filter-bar {
      flex-direction: column;

      button {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;
