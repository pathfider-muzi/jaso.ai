import AvatarDropDownComponent from "@/components/User/AvatarDropDown";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.header`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${BOX_SHADOW.HEADER}
`;

export const BrandInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const BrandName = styled.h1`
  font-weight: 900;
  font-size: 20px;
  line-height: 1;
  margin: 6px 0 6px 10px;
  display: inline-block;
  vertical-align: top;
`;

export const AvatarDropDown = styled(AvatarDropDownComponent)`
  margin-right: 2rem;
`;
