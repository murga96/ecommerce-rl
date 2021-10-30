import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Product from "./Product";
import { commerce } from './lib/eCommerce.js/commerce';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Products() {
  const [products, setProducts] = React.useState([])
  const [{basket}, dispatch] = useStateValue();
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  const fetchProducts = async() => {
    try {
      const {data} = await commerce.products.list()
      setProducts(data)
    } catch (error) {
      setError(true)
    } 
  }

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
  const ConnectionErrorComponent = () => {
    return(
        <React.Fragment>
            <Typography align='center' variant="h6" sx={{mt:"10rem"}}>
              There appears to be trouble with your network connection.
            </Typography>
        </React.Fragment>
    )
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {
          (!error) ? (products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Product key={ product.id } product={ product }/>
            </Grid>
          ))
        ): (        
          <Grid item xs={12}>
            <ConnectionErrorComponent/> 
          </Grid>
        ) 
        }
      </Grid>
    </Box>
  );
}
