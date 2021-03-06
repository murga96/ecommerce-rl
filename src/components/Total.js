import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Link } from 'react-router-dom';
import { actionTypes} from '../reducer';
import { useStateValue } from '../StateProvider';
import { commerce } from './lib/eCommerce.js/commerce';

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'flex-start',
        textAlign: "center",
        height: "20vh",
        margin: "2rem",
    },
    total_buttons: {
        display: "flex",
        justifyContent: "space-between",
    },
}))

const Total = () => {
    const classes = useStyles();
    const [{basket, user}, dispatch] = useStateValue()

    const emptyCart = async() => {
        await commerce.cart.empty()
        dispatch({
            type: actionTypes.SET_BASKET,
            basket: await commerce.cart.retrieve(),
        })
    }

    return (
        <div className={classes.root}>
            <h5>Total items: {basket?.total_items}</h5>
            <h5>{basket?.subtotal.formatted_with_symbol}</h5>
            <div className={classes.total_buttons}>
                <Button component={Link} to={user ? "/checkout" : "/signin"} sx={{marginTop: "2rem"}} variant="contained" color="error">Check out</Button>
                <Button 
                sx={{marginTop: "2rem", marginLeft: "2rem"}}
                variant="contained" 
                color="primary"
                onClick={ emptyCart }
                >
                Empty Cart
                </Button> 
            </div>          
        </div>
    )
}

export default Total
