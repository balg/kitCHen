import React from "react";
import styled from "styled-components";

const UnstyledButton = (props: any) => {
  return <Button {...props} />;
};

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:disabled {
    cursor: default;
    pointer-events: none;
  }
`;

export default UnstyledButton;
