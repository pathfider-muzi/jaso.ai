import styled from "@emotion/styled";
import { DialogTitle as DialogTitleComponent } from "@material-ui/core";

export const TitleFrame = styled.span`
  margin-top: 1rem;
`;

export const DialogTitle = styled(DialogTitleComponent)`
  font-weight: 700;
`;

export const CloseIcon = styled.div`
  position: absolute;
  left: 93%;
  top: 2%;
  &:hover {
    cursor: pointer;
  }
`;
