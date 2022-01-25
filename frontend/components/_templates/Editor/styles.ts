import EditorFormComponent from "@/components/Editor/EditorForm";
import EditorSidebarComponent from "@/components/Editor/EditorSidebar";
import ScreenComponent from "@/components/_layouts/Screen";
import BORDER from "@/constants/styles/border";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  display: flex;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

export const EditorForm = styled(EditorFormComponent)`
  @media (max-width: 780px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const EditorSidebar = styled(EditorSidebarComponent)`
  height: 46rem;
  ${BORDER.GRAY_150};
  ${BOX_SHADOW.DEFAULT}
  color: ${PALETTE.BLACK_900};
`;
