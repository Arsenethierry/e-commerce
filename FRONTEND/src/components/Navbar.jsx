import { AppBar, Box, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => 
createStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    Toolbar: {
        display: 'flex',
        justifyContent:'space-between',
    }
}))

function Navbar(props) {

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar className={classes.Toolbar}>
                    <Box flexGrow={1}>
                        <Link to='/' style={{ color: "#fff", textDecoration: "none" }}>
                            <Typography variant='h6' className={classes.title}>
                                My Shop
                            </Typography>
                        </Link>
                    </Box>
                    <div>
                        <Link to='/cart' style={{ color: "#fff" }}>
                            <IconButton color='inherit'>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;