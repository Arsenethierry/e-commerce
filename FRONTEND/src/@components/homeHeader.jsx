import { Button, makeStyles, Typography, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    sec1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: "linear-gradient(156.89deg, #322978 16.98%, #5648B8 108.35%)",
        minHeight: "530px",
        padding: "10px 8rem",
        [theme.breakpoints.down('sm')]: {
            padding: "5px 8rem",
        },
        [theme.breakpoints.down('xs')]: {
            padding: "5px 10px",
        }
    },
    description: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: "24px",
        textAlign: "center",
        color: "#F8F5F5",
        lineHeight: "37px",
        [theme.breakpoints.down('sm')]: {
            fontSize: "20px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "18px",
            lineHeight: "27px",
        }
    },
    sec1InnerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "860px", 
    },
    mainTitle: {
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: "48px",
        textAlign: "center",
        color: "#FDFDFD",
        "& span": {
            background: "linear-gradient(to right, #FF9F5A 30%, #E528F5 51%);",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "38px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "32px",
        }
    },
    button: {
        background: "linear-gradient(91.14deg, #FF9F5A 0.27%, #D83BE6 99.57%);",
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: "26px",
        color: "#ffff",
        borderRadius: "8px",
        marginTop: "20px",
        textTransform: "none",
        "&:hover": {
            background: "linear-gradient(91.14deg, #FF9F5A 0.27%, #D83BE6 99.57%);",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "22px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "20px",
            marginTop: "10px",
        }
    }
}));
function HomeHeader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.sec1}>
                <div className={classes.sec1InnerContainer}>
                    <Typography variant = "h1" className = {classes.mainTitle}>
                        Welcome to <br /> <span>myFavShop</span>, online
                    </Typography>
                    <Typography variant = "subtitle1" className = {classes.description}>
                        You are on the right placce <br />Your all favorites are available available here, happy shopping!!
                    </Typography>
                    <Button variant='contained' className={classes.button}>Add Product</Button>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;