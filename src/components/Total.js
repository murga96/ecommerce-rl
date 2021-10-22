import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
import accounting from 'accounting';
import React from 'react'
import { Link } from 'react-router-dom';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        height: "20vh",
        marginTop: 20,
    },
}))

const Total = () => {
    const classes = useStyles();
    const [{basket}, dispatch] = useStateValue()

    return (
        <div className={classes.root}>
            <h5>Total items: {basket?.length}</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket))}</h5>
            <Link to="/checkout">
                <Button sx={{marginTop: "2rem"}} variant="contained" color="error">Check out</Button>
            </Link>            
        </div>
    )
}

export default Total
