import { makeStyles, Snackbar } from '@material-ui/core';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
root: {
    width: '100%',
    '& > * + *': {
    marginTop: theme.spacing(2),
    },
},
}));

function SnackBarMessage({ message, setOpenSnackBar, open }) {
    const classes = useStyles();
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackBar(false);
    };
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    "esss"
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackBarMessage;