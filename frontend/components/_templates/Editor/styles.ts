import EditorFormComponent from "@/components/Editor/EditorForm";
import EditorSidebarComponent from "@/components/Editor/EditorSidebar";
import ScreenComponent from "@/components/_layouts/Screen";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 60rem;
  max-height: 90vh;
  overflow-y: scroll;
  overflow: hidden;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const EditorForm = styled(EditorFormComponent)`
  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const EditorSidebar = styled(EditorSidebarComponent)`
  color: ${PALETTE.BLACK_900};
`;
