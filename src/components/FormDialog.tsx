import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog =({setInputProp}) => {
  
    console.log('*** FormDialog() ***');

    const [open, setOpen] = React.useState(false);
    const [formValue, setFormValue] = React.useState("")

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleOk = () => {
      console.log(formValue)
      if(formValue != ""){
        console.log("input OK")
        setInputProp(formValue)
        setOpen(false);
      }else{
        console.log("empty!")
      }
    };

    const handleCancel = () => {
        setOpen(false);
      };

    const handleClose = () => {
        if(formValue != ""){
          setOpen(false);
        }
    };

      // 最初の一回だけ実行する処理
      React.useEffect(() => {
        //setOpen(true);
      }, []);
        
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Visualize your network</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Enter your Symbol blockchain wallet address or NFT mosaic ID.
            </DialogContentText>
            <TextField
              autoFocus
              required
              id="outlined-required"
              label="Required"
              margin="dense"
              fullWidth
              value={formValue}
              onChange={e => {
                setFormValue(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default FormDialog;