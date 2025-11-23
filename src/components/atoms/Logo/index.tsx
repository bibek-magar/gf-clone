import { Link } from "react-router-dom";
import styled from "styled-components";
import { PlaneIcon } from "lucide-react";
import { theme } from "../../../utils";

const Logo = () => {
  return (
    <LogoWrapper to={"/"}>
      <div className="logo shadow-lg">
        <PlaneIcon />
      </div>
      <p>
        Book <span>Flights</span>
      </p>
    </LogoWrapper>
  );
};

export { Logo };

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  & p {
    font-size: 1.1rem;
    color: ${theme.text};
    & span {
      color: ${theme.primary};
    }
  }

  & .logo {
    background-color: ${theme.primary};
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
