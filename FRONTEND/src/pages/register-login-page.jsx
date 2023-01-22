import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputAdornment, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from './../features/authSlice';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: "2rem 0",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "600px",
    },
    orDiv: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginBottom: "10px",
    },
    line: {
        width: "100%",
        borderBottom: "1px solid #C3D0E1",
    },
    or: {
        fontSize: "20px",
        fontWeight: 400,
        marginBottom: "-1rem",
        margin: "0 5px"
    }
}));

const ifError = (key, errors) => {
    if (errors[key] && errors[key].message) {
        return {
            error: true,
            helperText: errors[key].message
        }
    }
    return {}
}

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = yup.object().shape({
    name: yup.string().required().label("Enter full name"),
    email: yup.string().required().label("Enter email").email().matches(emailRegex),
    password: yup.string().required().label("Enter password")
})

const loginSchema = yup.object().shape({
    email: yup.string().required().label("Enter email").email().matches(emailRegex),
    password: yup.string().required().label("Enter password")
})

function AuthPage({ isNewUser }) {

    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.id) {
            navigate('/cart')
        }
    }, [auth.id])

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: isNewUser ? yupResolver(registerSchema) : yupResolver(loginSchema)
    });
    const onSubmit = (data) => {
        isNewUser ? dispatch(registerUser(data)) : dispatch(loginUser(data))
    }
    const handleNavigateAuth = () => isNewUser ? navigate('/auth/login') : navigate('/auth/register');
    return (
        <div className={classes.root}>
            <h1>{isNewUser ? "Register" : "Login"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Grid container spacing={3}>
                    {isNewUser && (
                        <Grid item xs={12}>
                            <Controller
                                name='name'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (

                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        {...field}
                                        {...ifError('name', formState.errors)}
                                        placeholder="Enter your name"
                                    />
                                )
                                }
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (

                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    {...field}
                                    {...ifError('email', formState.errors)}
                                    placeholder="Enter your email"
                                />
                            )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (

                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type="password"
                                    {...field}
                                    startAdornment={<InputAdornment position="start"><LockIcon /></InputAdornment>}
                                    {...ifError('password', formState.errors)}
                                    placeholder="Enter password..."
                                />
                            )
                            }
                        />
                    </Grid>
                </Grid>
                <Button fullWidth type={'submit'} variant='contained' color="primary">submit</Button>
                <div className={classes.orDiv}>
                    <div className={classes.line}></div>
                    <Typography varinat="body2" className={classes.or}>OR</Typography>
                    <div className={classes.line}></div>
                </div>
                <Button onClick={() => handleNavigateAuth()} fullWidth variant='outlined' color="primary">{isNewUser ? "Login" : "Register"}</Button>
                {auth.registerStatus == 'rejected' ?
                    <Alert severity="error">{auth.registerError}</Alert> : null}
            </form>
        </div>
    );
}

export default AuthPage;