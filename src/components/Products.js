import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Product from "./Product";
import { commerce } from './lib/eCommerce.js/commerce';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Products() {
  const [products, setProducts] = React.useState([])


  React.useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async() => {
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {
          products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Product key={ product.id } product={ product }/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}
