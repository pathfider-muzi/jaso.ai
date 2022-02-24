import { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules";
import { changeAlertState } from "@/modules/confirmSaveIntroduction/actions";

interface Props {
  title: string;
  contentNode: ReactNode;
  isOpened: boolean;
}

const _CustomAlert = ({ title, contentNode, isOpened }: Props) => {
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
        <DialogTitle>{title}</DialogTitle>
      </S.TitleFrame>
      <DialogContent>{contentNode}</DialogContent>
      <DialogActions>
        <S.CloseIcon>
          <Image src="/free_icon_delete.png" width={30} height={30} alt="xicon" onClick={handleToClose}></Image>
        </S.CloseIcon>
      </DialogActions>
    </Dialog>
  );
};

export default _CustomAlert;
