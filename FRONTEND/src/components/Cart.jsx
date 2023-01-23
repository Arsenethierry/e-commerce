import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, decreaseQuantity, getTotals, removeFromCart } from '../features/cartSlice';
import { useEffect } from 'react';
import PayButton from './payment/PayButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '70%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: "20px",
    },
    itemDiv: {
        minHeight: '90px',
        backgroundColor: "#FDE8E7",
        borderRadius: "7px",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
    },
    flexDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    addRemove: {
        border: "1px solid #827a74",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "7px",
        padding: "0 20px",
        gap: "10px",
        margin: "0 auto",
    },
    btn: {
        textTransform: "none",
        backgroundColor: "#5196D4",
        paddingRight: "30px",
        margin: "2rem auto 0 0",
        fontSize: "16px",
        boxShadow: "none",
        color: "white",
        "&:hover": {
            backgroundColor: "#5196D4",
        }
    },
    checkoutButton: {
        textTransform: "none",
        backgroundColor: "#41D3BD",
        paddingRight: "30px",
        margin: "2rem 3rem 0 auto",
        fontSize: "16px",
        boxShadow: "none",
        color: "white",
        "&:hover": {
            backgroundColor: "#41D3BD",
        }
    },
    startshopingbutton: {
        background: "linear-gradient(91.14deg, #FF9F5A 0.27%, #D83BE6 99.57%);",
        fontFamily: 'Poppins',
        fontWeight: 700,
        paddingLeft: "30px",
        paddingRight: "30px",
        fontSize: "22px",
        color: "#ffff",
        borderRadius: "10px",
        marginTop: "20px",
        textTransform: "none",
        "&:hover": {
            background: "linear-gradient(91.14deg, #FF9F5A 0.27%, #D83BE6 99.57%);",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "20px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "18px",
            marginTop: "10px",
        }
    }
}));

function Cart() {
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotals())
    }, [dispatch, cart])

    const navigate = useNavigate()
    const classes = useStyles();

    const handleIncreaseProductToCart = (item) => {
        dispatch(addToCart(item))
    }
    const handleRemoveFromCart = (item) => dispatch(removeFromCart(item))
    const decreaseProductQuantity = (item) => dispatch(decreaseQuantity(item))

    return (
        <div className={classes.root}>
            <Typography variant='h4'>My Cart</Typography>
            {cart.cartItems.length > 0 ? cart.cartItems.map((item) => (
                <>
                    <div className={classes.flexDiv}>
                        <div className={classes.itemDiv}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Avatar src={item?.images[0]} alt={item?.title} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item?.title} secondary={item?.price + '$'} />
                            </ListItem>
                            <ListItem>
                                <div className={classes.addRemove}>
                                    <IconButton disabled={item?.cartQuantity <= 1} onClick={() => decreaseProductQuantity(item)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{item?.cartQuantity}</Typography>
                                    <IconButton onClick={() => handleIncreaseProductToCart(item)}>
                                        <AddIcon />
                                    </IconButton>
                                </div>
                            </ListItem>
                            <ListItem>
                                <Typography variant='h5' style={{ marginLeft: "auto" }}>{item?.price * item?.cartQuantity}$</Typography>
                            </ListItem>
                        </div>
                        <IconButton onClick={() => handleRemoveFromCart(item)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </div>
                </>)) : (
                <div>
                    <Typography variant='h6'>No Items in The Cart</Typography>
                    <Button onClick={() => navigate('/')} variant='contained' className={classes.startshopingbutton}>Start Shopping</Button>
                </div>
            )}
            {cart.cartItems.length > 0 && (
                <div className={classes.flexDiv}>
                    <Button onClick={() => navigate('/')} startIcon={<KeyboardBackspaceIcon />} variant='contained' className={classes.btn}>Back To Shop</Button>
                    <div>
                        <Typography variant='h6'>TotalQuantity: {cart.cartTotalQuantity}</Typography>
                        <Typography variant='h6'>Subtotal: {cart.cartTotalAmount}</Typography>
                        <PayButton cartItems={cart.cartItems} />
                    </div>
                </div>
            )}

        </div>
    );
}

export default Cart;