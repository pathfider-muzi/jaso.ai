import AvatarDropDownComponent from "@/components/User/AvatarDropDown";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.header`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${BOX_SHADOW.HEADER}
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${PALETTE.WHITE};
  z-index: 1;
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

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
`;

export const NavButton = styled.button`
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1rem;
  height: 100%;
  line-height: 1rem;
`;

export const NavLink = styled(NavButton)``.withComponent("a");

export const AuthInfoWrapper = styled.div``;

export const AvatarDropDown = styled(AvatarDropDownComponent)`
  margin-right: 2rem;
`;
