import { AppBar, Badge, Box, createStyles, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            top: 0,
            left: 0,
            marginBottom: "60px",
        },
        title: {
            flexGrow: 1,
        },
        Toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        }
    }))

function Navbar(props) {

    const { cartTotalQuantity } = useSelector((state) => state.cart)

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position='fixed'>
                <Toolbar className={classes.Toolbar}>
                    <Box flexGrow={1}>
                        <Link to='/' style={{ color: "#fff", textDecoration: "none" }}>
                            <Typography variant='h6' className={classes.title}>
                                My Shop
                            </Typography>
                        </Link>
                    </Box>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <Link to='/auth/register' style={{ color: "#fff", textDecoration: "none" }}>
                            <Typography variant='h6' className={classes.title}>Register</Typography>
                        </Link>
                        <Link to='/auth/login' style={{ color: "#fff", textDecoration: "none" }}>
                            <Typography variant='h6' className={classes.title}>Login</Typography>
                        </Link>
                        <Link to='/cart' style={{ color: "#fff", textDecoration: "none" }}>
                            <Badge badgeContent={cartTotalQuantity} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;