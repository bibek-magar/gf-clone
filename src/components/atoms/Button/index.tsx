import { Button as MUIButton } from "@mui/material";
import styled from "styled-components";
import { currentTheme } from "../../../utils/theme";

interface IProps {
  children: React.ReactNode;
}

const Button = ({ children }: IProps) => {
  return (
    <ButtonWrapper className="shadow-md" type="submit" variant="contained">
      {children}
    </ButtonWrapper>
  );
};

export { Button };

const ButtonWrapper = styled(MUIButton)`
  background-color: ${currentTheme.primary} !important;
  color: ${currentTheme.surface} !important;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
  border-radius: 30px;

  &:hover {
    background-color: ${currentTheme.primary} !important;
    opacity: 0.9;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.2s;
    transform: scale(1.05);
  }
`;
