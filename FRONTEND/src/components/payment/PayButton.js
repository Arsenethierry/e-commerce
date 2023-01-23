import React from 'react';
import axios from 'axios';
import { baseUrl } from '../../features/api';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Button, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
}));

const PayButton = ({ cartItems }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);

    const handleCheckOut = () => {
        if (user.id) {
            axios.post(`${baseUrl}/stripe/create-checkout-session`, {
                    cartItems,
                    userId: user.id,
                }).then((res) => {
                    if (res.data.url) {
                        window.location.href = res.data.url;
                    }
                }).catch((error) => console.log("error: ", error))
        } else navigate('/auth/login')
    }
    return (
        <>
            {user.id ?
                <Button endIcon={<AssignmentTurnedInIcon />} variant='contained' onClick={handleCheckOut} className={classes.checkoutButton}>Check out</Button> :
                <Button endIcon={<AssignmentTurnedInIcon />} variant='contained' onClick={handleCheckOut} className={classes.checkoutButton}>Log in To Pay</Button>
            }
        </>
    );
}

export default PayButton;