import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export { Layout };

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #111827;
  color: #ffffff;
`;
