import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const boxLoaderStyles = makeStyles(theme =>
  createStyles({
    box: {
      width: '100%',
      minHeight: '60px',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    progress: {
      color: '#b0bec5'
    }
  })
);

const BoxLoader = ({ width, minHeight }) => {
  const classes = boxLoaderStyles();
  return (
    <Box
      component={'div'}
      className={classes.box}
      style={{ width: width ?? '100%', minHeight: minHeight ?? '100px' }}
    >
      <CircularProgress className={classes.progress} />
    </Box>
  );
};

export default BoxLoader;
