import { ReactNode, useEffect, useState } from "react";
// import * as S from './styles';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

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
        <Button onClick={handleToClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default _CustomAlert;
