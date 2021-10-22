import { Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react'
//import {useStateValue} from "../StateProvider"
//import Total from "./Total"
import CheckoutCard from "./CheckoutCard"
import { makeStyles } from '@mui/styles';
import products from "./../product-data"
import Total from './Total';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem",
    },
}));


export default function CheckoutPage() {
    const classes = useStyles();
    //const [{basket}, dispatch] = useStateValue()

    function FormRow() {
        return (
            <Fragment>
                {products?.map((item) =>(
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <CheckoutCard key={ item.id } product={ item }/>
                    </Grid>
                ))}
            </Fragment>
        )
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant="h4">
                        Shopping Cart
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align='center' gutterBottom variant="h4">
                        <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
