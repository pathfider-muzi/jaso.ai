import { RootState } from "@/modules";
import { changeAlertState } from "@/modules/confirmSaveIntroduction/actions";
import { DialogActions, DialogContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";

interface Props {
  title: string;
  children?: ReactNode;
  isOpened: boolean;
}

const _CustomAlert = ({ title, children, isOpened }: Props) => {
  const [isCustomOpened, setOpen] = useState(false);

  const isAlertOpened = useSelector((state: RootState) => state.confirmSavingIntroductionReducer.isAlertOpened);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  const handleToClose = () => {
    if (isAlertOpened) {
      dispatch(changeAlertState(false));
    }
    setOpen(false);
  };

  return (
    <Dialog open={isCustomOpened} onClose={handleToClose}>
      <S.TitleFrame>
        <S.DialogTitle>{title}</S.DialogTitle>
      </S.TitleFrame>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <S.CloseIcon>
          <Image src="/free_icon_delete.png" width={30} height={30} alt="xicon" onClick={handleToClose}></Image>
        </S.CloseIcon>
      </DialogActions>
    </Dialog>
  );
};

export default _CustomAlert;
