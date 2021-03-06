import { Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import CheckoutCard from "./CheckoutCard"
import { makeStyles } from '@mui/styles';
import Total from './Total';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import { ConnectionErrorComponent } from './ConnectionErrorComponent';
import { Box } from '@mui/system';
import { commerce } from './lib/eCommerce.js/commerce';
import { actionTypes } from '../reducer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem",
    },
    link: {
        textDecoration: 'none',
    },
}));


export default function CheckoutPage() {
    const classes = useStyles();
    const [error, setError] = React.useState(false)
    const [{basket}, dispatch] = useStateValue()

    React.useEffect(() => {
        fetchCart()
      }, [])

    const fetchCart = async() => {
        try {
          const cart = await commerce.cart.retrieve()
          dispatch({
            type: actionTypes.SET_BASKET,
            basket: cart,
          })
        } catch (error) {
          setError(true)
        } 
    }

    function FormRow() {
        return (
            <Fragment>
                {basket?.line_items?.map((item) =>(
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <CheckoutCard key={ item.id } product={ item }/>
                    </Grid>
                ))}
            </Fragment>
        )
    };

    const EmptyCart = () => {
        return(
            <Fragment>
                <Typography align='center' variant="subtitle1">
                    You have nothing in your shopping cart,
                    <Link to="/" className={classes.link}> start to adding something!</Link>
                </Typography>
            </Fragment>
        )
    }

    return (
        <>
        {
        (error) ? (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <ConnectionErrorComponent/> 
                    </Grid>
                </Grid>
            </Box>     
        ):(
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant="h4">
                        Shopping Cart
                    </Typography>
                </Grid>
                {
                 !(basket?.line_items?.length) ? (
                    <Grid item xs={12}>
                        <EmptyCart/>
                    </Grid>    
                 ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8} md={9} container spacing={2}>
                            <FormRow/>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Typography align='center' gutterBottom variant="h4">
                                <Total/>
                            </Typography>
                        </Grid>
                    </Grid>
                )
                }
                
            </Grid>
        </div>
        )
       }
      </>  
    )
}

