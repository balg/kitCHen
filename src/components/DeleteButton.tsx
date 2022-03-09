import React from "react";
import styled from "styled-components";
import UnstyledButton from "./UnstyledButton";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const [askConfirm, setAstConfirm] = React.useState(false);

  if (askConfirm) {
    return (
      <>
        <ConfirmButton onClick={() => props.onDelete()}>biztos?</ConfirmButton>
        {" | "}
        <ActionButton onClick={() => setAstConfirm(false)}>mégse</ActionButton>
      </>
    );
  }

  return (
    <ActionButton onClick={() => setAstConfirm(true)}>
      {props.children}
    </ActionButton>
  );
};

const ActionButton = styled(UnstyledButton)`
  text-decoration: underline;
`;

const ConfirmButton = styled(ActionButton)`
  color: red;
`;

export default DeleteButton;
