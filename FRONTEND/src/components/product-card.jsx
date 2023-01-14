import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontWeight: 600,
        fontSize: "42px",
        fontFamily: "Poppins",
        color: "#323335",
    },
    card: {
        borderRadius: "15px",
    },
    media: {
        height: "290px"
    },
    cardTitle: {
        fontWeight: 600,
        fontSize: "24px",
        fontFamily: "Poppins",
        color: "#000000",
        marginBottom: "10px",
    },
    desc: {
        fontWeight: 500,
        fontSize: "16px",
        fontFamily: "Poppins",
        color: "#777C85", 
    },
    coinsDiv: {
        display: "flex",
        borderRadius: "4px",
        minWidth: "14px",
        width: "max-content",
        padding: "5px 10px",
        gap: "10px",
        alignItems: "center",
        backgroundColor: "#D8DEFF",
        marginBottom: "10px"
    },
    btn: {
        display: "flex",
        fontFamily: "Poppins",
        fontSize: "18px",
        fontWeight: 600,
        borderRadius: "7px",
        background: "#5972F8",
        color: "#fff",
        textTransform: "none",
        margin: "auto",
        marginTop: "15px",
        padding: "5px 25px",
        "&:hover": {
            background: "#5972F8", 
        }
    },
    coinCount: {
        fontWeight: 500,
        fontSize: "18px",
        fontFamily: "Poppins",
        color: "#2444F3" 
    },
    cardHeader: {
        marginBottom: "-80px",
    }
}));

function ProductCard({ data }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate('/cart')
    }    
    const classes = useStyles()

    return (
        <>
           <Card variant="outlined" className={classes.card}>
            <CardActionArea>
                <CardHeader 
                    className={classes.cardHeader}
                    action={
                        <Tooltip title="Delete this product">
                            <IconButton aria-label="delete">
                                <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.425 10.2497L14.9925 21.4997M9.0075 21.4997L8.575 10.2497M21.035 6.23717C21.4625 6.30217 21.8875 6.37092 22.3125 6.44467M21.035 6.23842L19.7 23.5909C19.6455 24.2975 19.3263 24.9574 18.8063 25.4387C18.2862 25.9201 17.6036 26.1874 16.895 26.1872H7.105C6.39637 26.1874 5.71378 25.9201 5.19372 25.4387C4.67367 24.9574 4.35449 24.2975 4.3 23.5909L2.965 6.23717M21.035 6.23717C19.5923 6.01907 18.1422 5.85355 16.6875 5.74093M1.6875 6.44342C2.1125 6.36967 2.5375 6.30092 2.965 6.23717M2.965 6.23717C4.40767 6.01907 5.85779 5.85355 7.3125 5.74093M16.6875 5.74093V4.59593C16.6875 3.12093 15.55 1.89093 14.075 1.84468C12.692 1.80047 11.308 1.80047 9.925 1.84468C8.45 1.89093 7.3125 3.12218 7.3125 4.59593V5.74093M16.6875 5.74093C13.5672 5.49977 10.4328 5.49977 7.3125 5.74093" stroke="#FF1D1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardMedia
                    className={classes.media}
                    image={data.images[0]}
                    title={data.title}
                    />
                <CardContent>
                    <Typography gutterBottom className={classes.cardTitle}>{data.title}</Typography>
                    <div className={classes.coinsDiv}>
                        <Typography className={classes.coinCount}>{data.price}&nbsp;INR</Typography>
                    </div>
                    <Typography variant="body2" component="p" className={classes.desc}>{data.description}</Typography>
                        <Button onClick={() =>handleAddToCart(data)} className={classes.btn}>Add to Cart</Button>
                </CardContent>
            </CardActionArea>
        </Card>
        </>
    );
}

export default ProductCard;