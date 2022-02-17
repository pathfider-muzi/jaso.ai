import { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Image from "next/image";

interface Props {
  title: string;
  contentNode: ReactNode;
  isOpened: boolean;
}

const _CustomAlert = ({ title, contentNode, isOpened }: Props) => {
  const [isCustomOpened, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  const handleToClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={isCustomOpened} onClose={handleToClose}>
      <DialogTitle>{title}</DialogTitle>
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
